import { NextResponse } from "next/server";

import type { ChatReply } from "@/lib/chatbot";
import { localEngine } from "@/lib/chatbot";

const HF_API_URL = process.env.HUGGINGFACE_API_URL ?? "https://router.huggingface.co/v1/chat/completions";
const HF_MODEL = process.env.HUGGINGFACE_MODEL ?? "meta-llama/Llama-3.1-8B-Instruct";
const HF_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

const REPHRASE_CONFIDENCE_THRESHOLD = 0.6;
const HF_TIMEOUT_MS = 15_000;

export async function POST(request: Request) {
	const body: unknown = await request.json().catch(() => undefined);
	const question = readQuestion(body);

	if (question === undefined) {
		return NextResponse.json({ error: "question is required" }, { status: 400 });
	}

	const grounded = await localEngine(question, []);

	if (HF_TOKEN === undefined || grounded.confidence < REPHRASE_CONFIDENCE_THRESHOLD) {
		return NextResponse.json(grounded);
	}

	const rephrased = await rephraseWithHuggingFace(question, grounded.text);
	const reply: ChatReply = rephrased === undefined ? grounded : { ...grounded, text: rephrased };

	return NextResponse.json(reply);
}

async function rephraseWithHuggingFace(question: string, groundedAnswer: string): Promise<string | undefined> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), HF_TIMEOUT_MS);

	try {
		const response = await fetch(HF_API_URL, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${HF_TOKEN}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				model: HF_MODEL,
				messages: buildMessages(question, groundedAnswer),
				max_tokens: 220,
				temperature: 0.3,
			}),
			signal: controller.signal,
		});

		if (!response.ok) {
			return undefined;
		}

		const data: unknown = await response.json();
		return extractMessageContent(data);
	} catch {
		return undefined;
	} finally {
		clearTimeout(timeout);
	}
}

function buildMessages(question: string, groundedAnswer: string): readonly { readonly role: string; readonly content: string }[] {
	return [
		{
			role: "system",
			content:
				"You rephrase a reference answer from Luciano's portfolio assistant so it directly addresses the visitor's " +
				"question, in a natural, conversational tone. Use only facts already present in the reference answer — " +
				"never add names, dates, numbers or claims that are not already there. Two or three sentences, no preamble.",
		},
		{
			role: "user",
			content: `Visitor's question: ${question}\nReference answer: ${groundedAnswer}`,
		},
	];
}

function extractMessageContent(data: unknown): string | undefined {
	if (typeof data !== "object" || data === null || !("choices" in data)) {
		return undefined;
	}

	const choices = (data as { choices: unknown }).choices;
	const first = Array.isArray(choices) ? choices[0] : undefined;
	const message = typeof first === "object" && first !== null ? (first as { message?: unknown }).message : undefined;
	const content = typeof message === "object" && message !== null ? (message as { content?: unknown }).content : undefined;

	return typeof content === "string" && content.trim().length > 0 ? content.trim() : undefined;
}

function readQuestion(body: unknown): string | undefined {
	if (typeof body !== "object" || body === null || !("question" in body)) {
		return undefined;
	}

	const value = (body as { question: unknown }).question;
	const trimmed = typeof value === "string" ? value.trim() : "";
	return trimmed.length > 0 ? trimmed : undefined;
}
