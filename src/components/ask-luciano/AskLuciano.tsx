"use client";

import Image from "next/image";
import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";

import { ArrowUpRight, Send } from "@/components/ui/Icons";
import { suggestedQuestions } from "@/data/chatbot";
import { profile } from "@/data/profile";
import type { ChatEngine, ChatTurn } from "@/lib/chatbot";
import { localEngine } from "@/lib/chatbot";
import { cx } from "@/lib/utils";

const GREETING: ChatTurn = {
	id: "greeting",
	role: "assistant",
	text: "I answer from this page only — background, projects, research, writing, contact. Pick a question or type your own.",
};

interface AskLucianoProps {
	/** Swap in an LLM, RAG or agent implementation without touching this component. */
	readonly engine?: ChatEngine;
}

export function AskLuciano({ engine = localEngine }: AskLucianoProps) {
	const [turns, setTurns] = useState<readonly ChatTurn[]>([GREETING]);
	const [draft, setDraft] = useState("");
	const [pending, setPending] = useState(false);
	const transcriptRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const counter = useRef(0);

	useEffect(() => {
		const node = transcriptRef.current;
		if (node !== null) {
			node.scrollTop = node.scrollHeight;
		}
	}, [turns, pending]);

	const ask = async (question: string) => {
		const trimmed = question.trim();
		if (trimmed.length === 0 || pending) {
			return;
		}

		counter.current += 1;
		const userTurn: ChatTurn = { id: `u${counter.current}`, role: "user", text: trimmed };
		const history = [...turns, userTurn];

		setTurns(history);
		setDraft("");
		setPending(true);

		const [reply] = await Promise.all([engine(trimmed, history), delay(420)]);

		counter.current += 1;
		setTurns((current) => [
			...current,
			{
				id: `a${counter.current}`,
				role: "assistant",
				text: reply.text,
				link: reply.link,
				followUps: reply.followUps,
			},
		]);
		setPending(false);
		inputRef.current?.focus();
	};

	const onSubmit = (event: FormEvent) => {
		event.preventDefault();
		void ask(draft);
	};

	const lastTurn = turns[turns.length - 1];
	const chips = !pending && lastTurn?.role === "assistant" ? (lastTurn.followUps ?? suggestedQuestions) : [];

	return (
		<div className="overflow-hidden rounded-card bg-night shadow-lift">
			<div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3.5">
				<div className="flex items-center gap-2.5">
					<Image
						src={profile.avatar}
						alt=""
						width={170}
						height={235}
						className="h-8 w-8 rounded-full border border-white/20 object-cover object-top"
					/>
					<div className="leading-none">
						<p className="font-display text-[0.875rem] font-bold tracking-tight text-white">Ask Luciano</p>
						<p className="mt-1 font-mono text-[0.625rem] text-white/45">local knowledge base · no API call</p>
					</div>
				</div>

				{turns.length > 1 && (
					<button
						type="button"
						onClick={() => setTurns([GREETING])}
						className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-white/45 transition-colors hover:text-white"
					>
						Reset
					</button>
				)}
			</div>

			<div
				ref={transcriptRef}
				role="log"
				aria-live="polite"
				aria-label="Conversation"
				className="h-[20rem] space-y-4 overflow-y-auto px-5 py-5 sm:h-[23rem]"
			>
				{turns.map((turn) => (
					<div key={turn.id} className={cx("flex", turn.role === "user" ? "justify-end" : "justify-start")}>
						<div
							className={cx(
								"max-w-[88%] rounded-card px-4 py-3 text-[0.875rem] leading-relaxed",
								turn.role === "user" ? "bg-white/10 text-white" : "bg-white/[0.04] text-white/80",
							)}
						>
							{turn.role === "assistant" && <p className="label-mono mb-2 text-sun/70">Luciano</p>}
							<p>{turn.text}</p>
							{turn.link !== undefined && (
								<a
									href={turn.link.href}
									target={turn.link.href.startsWith("#") ? undefined : "_blank"}
									rel={turn.link.href.startsWith("#") ? undefined : "noreferrer noopener"}
									className="mt-3 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-sun transition-colors hover:text-white"
								>
									{turn.link.label}
									<ArrowUpRight className="text-[0.9rem]" />
								</a>
							)}
						</div>
					</div>
				))}

				{pending && (
					<div className="flex justify-start">
						<div className="flex items-center gap-1.5 rounded-card bg-white/[0.04] px-4 py-4">
							{[0, 1, 2].map((dot) => (
								<span
									key={dot}
									className="thinking-dot h-1.5 w-1.5 rounded-full bg-white/60"
									style={{ animationDelay: `${dot * 160}ms` }}
								/>
							))}
							<span className="sr-only">Searching the knowledge base</span>
						</div>
					</div>
				)}
			</div>

			{chips.length > 0 && (
				<div className="flex flex-wrap gap-2 border-t border-white/10 px-5 py-4">
					{chips.map((chip) => (
						<button
							key={chip}
							type="button"
							onClick={() => void ask(chip)}
							className="rounded-full border border-white/20 px-3 py-1.5 text-[0.75rem] text-white/70 transition-colors hover:border-sun/60 hover:text-white"
						>
							{chip}
						</button>
					))}
				</div>
			)}

			<form onSubmit={onSubmit} className="flex items-center gap-3 border-t border-white/10 px-5 py-4">
				<label htmlFor="ask-luciano-input" className="sr-only">
					Ask a question about Luciano
				</label>
				<input
					id="ask-luciano-input"
					ref={inputRef}
					value={draft}
					onChange={(event) => setDraft(event.target.value)}
					placeholder="What are his research interests?"
					autoComplete="off"
					className="min-w-0 flex-1 bg-transparent text-[0.875rem] text-white placeholder:text-white/35 focus:outline-none"
				/>
				<button
					type="submit"
					disabled={pending || draft.trim().length === 0}
					className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ember text-white transition-colors hover:bg-rust disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/40"
				>
					<Send className="text-[1rem]" />
					<span className="sr-only">Send the question</span>
				</button>
			</form>
		</div>
	);
}

function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
