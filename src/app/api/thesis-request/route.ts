import { NextResponse } from "next/server";

import { profile } from "@/data/profile";
import type { ThesisRequestResult } from "@/types";

const RESEND_API_URL = "https://api.resend.com/emails";
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const REQUEST_TO = process.env.THESIS_REQUEST_TO ?? profile.email;
const REQUEST_FROM = process.env.THESIS_REQUEST_FROM ?? "Portfolio <onboarding@resend.dev>";
const SEND_TIMEOUT_MS = 10_000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ThesisRequest {
	readonly name: string;
	readonly email: string;
	readonly affiliation: string | undefined;
	readonly message: string | undefined;
}

export async function POST(request: Request) {
	const body: unknown = await request.json().catch(() => undefined);

	// Un robot qui remplit le champ piège reçoit un succès, sans qu'aucun email parte.
	if (filledHoneypot(body)) {
		return reply({ ok: true }, 200);
	}

	const parsed = parseRequest(body);
	if (parsed === undefined) {
		return reply({ ok: false, reason: "invalid" }, 400);
	}

	const sent = await sendNotification(parsed);
	return sent ? reply({ ok: true }, 200) : reply({ ok: false, reason: "unavailable" }, 503);
}

async function sendNotification(request: ThesisRequest): Promise<boolean> {
	if (RESEND_API_KEY === undefined) {
		return false;
	}

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), SEND_TIMEOUT_MS);

	try {
		const response = await fetch(RESEND_API_URL, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${RESEND_API_KEY}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				from: REQUEST_FROM,
				to: [REQUEST_TO],
				reply_to: request.email,
				subject: `Demande du projet de mémoire — ${request.name}`,
				text: buildBody(request),
			}),
			signal: controller.signal,
		});

		if (!response.ok) {
			// Visible dans les logs Vercel : un 403 signale presque toujours un destinataire
			// différent de l'adresse du compte Resend.
			console.error("thesis-request: Resend refused the email", response.status, await response.text());
		}
		return response.ok;
	} catch {
		return false;
	} finally {
		clearTimeout(timeout);
	}
}

function buildBody(request: ThesisRequest): string {
	return [
		"Nouvelle demande du projet de mémoire, envoyée depuis le portfolio.",
		"",
		`Nom : ${request.name}`,
		`Email : ${request.email}`,
		`Institution : ${request.affiliation ?? "non précisée"}`,
		"",
		"Message :",
		request.message ?? "(aucun)",
		"",
		"—",
		"Répondre à cet email répond directement au demandeur. Joindre projet_memoire.pdf.",
	].join("\n");
}

function parseRequest(body: unknown): ThesisRequest | undefined {
	if (typeof body !== "object" || body === null) {
		return undefined;
	}

	const fields = body as Record<string, unknown>;
	const name = readLine(fields.name, 120);
	const email = readLine(fields.email, 254);

	if (name === undefined || name.length < 2 || email === undefined || !EMAIL_PATTERN.test(email)) {
		return undefined;
	}

	return {
		name,
		email,
		affiliation: readLine(fields.affiliation, 160),
		message: readParagraph(fields.message, 2000),
	};
}

function readLine(value: unknown, maxLength: number): string | undefined {
	if (typeof value !== "string") {
		return undefined;
	}
	const cleaned = value.replace(/\s+/g, " ").trim().slice(0, maxLength);
	return cleaned.length > 0 ? cleaned : undefined;
}

function readParagraph(value: unknown, maxLength: number): string | undefined {
	if (typeof value !== "string") {
		return undefined;
	}
	const cleaned = value.trim().slice(0, maxLength);
	return cleaned.length > 0 ? cleaned : undefined;
}

function filledHoneypot(body: unknown): boolean {
	if (typeof body !== "object" || body === null || !("website" in body)) {
		return false;
	}
	const value = (body as { website: unknown }).website;
	return typeof value === "string" && value.trim().length > 0;
}

function reply(result: ThesisRequestResult, status: number) {
	return NextResponse.json(result, { status });
}
