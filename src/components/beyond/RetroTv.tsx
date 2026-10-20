"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { ArrowUpRight } from "@/components/ui/Icons";
import { Tape } from "@/components/ui/Tape";
import { cx } from "@/lib/utils";
import type { Inspiration } from "@/types";

export function RetroTv({ channels }: { readonly channels: readonly Inspiration[] }) {
	const [index, setIndex] = useState(0);
	const [tuning, setTuning] = useState(false);
	const [playing, setPlaying] = useState(false);
	const tuningTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

	useEffect(() => () => clearTimeout(tuningTimer.current), []);

	const channel = channels[index];
	if (channel === undefined) {
		return undefined;
	}

	const tune = (next: number) => {
		const target = (next + channels.length) % channels.length;
		if (target === index) {
			return;
		}
		setPlaying(false);
		setIndex(target);
		setTuning(true);
		clearTimeout(tuningTimer.current);
		tuningTimer.current = setTimeout(() => setTuning(false), 420);
	};

	const number = `CH ${String(index + 1).padStart(2, "0")}`;
	const external = channel.kind === "video" ? `https://www.youtube.com/watch?v=${channel.youtube}` : channel.url;

	return (
		<div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-start">
			<div className="relative mx-auto w-full max-w-2xl pt-14">
				{/* Antennes « oreilles de lapin ». */}
				<span aria-hidden className="absolute left-1/2 top-2 h-16 w-[3px] origin-bottom -translate-x-1/2 rotate-[-28deg] rounded-full bg-ink-soft" />
				<span aria-hidden className="absolute left-1/2 top-2 h-16 w-[3px] origin-bottom -translate-x-1/2 rotate-[24deg] rounded-full bg-ink-soft" />
				<span aria-hidden className="absolute left-1/2 top-[3.6rem] h-4 w-12 -translate-x-1/2 rounded-t-full bg-[#3b3530]" />

				<div className="on-light relative rounded-[26px] bg-[linear-gradient(160deg,#a07a4c,#6e4f2c)] p-3.5 shadow-lift sm:p-5">
					<div className="flex gap-4">
						<div className="min-w-0 flex-1 rounded-[20px] bg-[#161616] p-2.5 shadow-[inset_0_2px_10px_rgba(0,0,0,0.85)] sm:p-3">
							<div className="relative aspect-[4/3] overflow-hidden rounded-[16%/13%] bg-black">
								{playing && channel.kind === "video" ? (
									<iframe
										src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(channel.youtube)}?autoplay=1&rel=0`}
										title={channel.title}
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen
										className="absolute inset-0 h-full w-full"
									/>
								) : (
									<Screen channel={channel} number={number} onPlay={() => setPlaying(true)} />
								)}

								{!playing && (
									<>
										<span aria-hidden className="crt-scanlines pointer-events-none absolute inset-0" />
										<span aria-hidden className="crt-vignette pointer-events-none absolute inset-0" />
									</>
								)}
								{tuning && <span aria-hidden className="tv-static pointer-events-none absolute inset-0" />}
							</div>
						</div>

						<div className="hidden w-20 shrink-0 flex-col items-center gap-4 py-2 sm:flex">
							<p className="rounded-[4px] bg-[#0d1a10] px-2 py-1 font-mono text-[0.75rem] text-[#7dff9b] shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]" aria-live="polite">
								{number}
							</p>
							<button
								type="button"
								onClick={() => tune(index + 1)}
								aria-label="Next channel"
								className="relative grid h-14 w-14 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#5a524a,#2a2622)] shadow-[0_3px_6px_rgba(0,0,0,0.45)] transition-transform duration-500 ease-out-soft hover:brightness-110"
								style={{ rotate: `${index * 45}deg` }}
							>
								<span aria-hidden className="absolute top-1.5 h-3 w-1 rounded-full bg-[#e9e2d3]" />
							</button>
							<span aria-hidden className="relative grid h-10 w-10 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#5a524a,#2a2622)] shadow-[0_3px_6px_rgba(0,0,0,0.45)]">
								<span className="absolute top-1 h-2 w-0.5 rotate-[30deg] rounded-full bg-[#e9e2d3]" />
							</span>
							<span
								aria-hidden
								className="mt-1 h-24 w-full rounded-[6px] bg-[#3b2a17]"
								style={{ backgroundImage: "repeating-linear-gradient(to bottom, rgba(0,0,0,0.45) 0 2px, transparent 2px 6px)" }}
							/>
						</div>
					</div>
				</div>

				<div aria-hidden className="flex justify-between px-16">
					<span className="h-4 w-10 rounded-b-[6px] bg-[#3b3530]" />
					<span className="h-4 w-10 rounded-b-[6px] bg-[#3b3530]" />
				</div>
			</div>

			<div>
				<p className="label-mono text-ink-faint">TV guide — what&apos;s on</p>
				<ol className="mt-4 space-y-2">
					{channels.map((entry, entryIndex) => (
						<li key={entry.id}>
							<button
								type="button"
								onClick={() => tune(entryIndex)}
								aria-pressed={entryIndex === index}
								lang={entry.lang}
								className={cx(
									"group flex w-full items-baseline gap-4 rounded-[6px] px-4 py-3 text-left transition-colors",
									entryIndex === index ? "bg-card shadow-card" : "hover:bg-card/60",
								)}
							>
								<span className="font-mono text-[0.75rem] text-ink-faint">{String(entryIndex + 1).padStart(2, "0")}</span>
								<span className="min-w-0 flex-1">
									<span className="block font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
										{entry.topic} · {entry.kind}
									</span>
									<span className="mt-1 block font-display text-[1.0625rem] font-extrabold leading-snug tracking-tight text-ink group-hover:text-rust">
										{entry.title}
									</span>
									<span className="block font-editorial text-[0.9375rem] italic text-ink-soft">
										{entry.by}
										{entry.demo && <span className="ml-2 font-hand text-[1.1rem] font-bold not-italic text-rust">placeholder</span>}
									</span>
								</span>
								{entryIndex === index && (
									<span className="flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-rust">
										<span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-rust" />
										on air
									</span>
								)}
							</button>
						</li>
					))}
				</ol>

				<div className="sticky-note on-light relative mt-8 rotate-[-1deg] bg-sun px-6 pb-5 pt-7" lang={channel.lang}>
					<Tape className="-top-3 left-8" />
					<p className="font-hand text-[1.3rem] font-bold leading-none text-ink/60" lang="en">
						why it stuck with me
					</p>
					<p className="mt-3 font-hand text-[1.45rem] font-medium leading-snug text-ink">{channel.note}</p>
					<a
						href={external}
						target="_blank"
						rel="noreferrer noopener"
						className="mt-4 inline-flex items-center gap-1 text-[0.875rem] font-medium text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
						lang="en"
					>
						{channel.kind === "video" ? "Watch on YouTube" : "Open the link"}
						<ArrowUpRight className="text-[0.95rem]" />
					</a>
				</div>
			</div>
		</div>
	);
}

function Screen({ channel, number, onPlay }: { readonly channel: Inspiration; readonly number: string; readonly onPlay: () => void }) {
	if (channel.kind === "link") {
		return (
			<div className="absolute inset-0 flex flex-col justify-center bg-[#0b1a10] px-[9%] font-mono text-[#7dff9b] [text-shadow:0_0_6px_rgba(125,255,155,0.55)]">
				<p className="text-[0.75rem] uppercase tracking-[0.2em] opacity-75">
					{number} · {channel.topic}
				</p>
				<p className="mt-3 text-[clamp(1rem,3.2vw,1.6rem)] font-medium leading-tight">{channel.title}</p>
				<p className="mt-2 text-[0.875rem] opacity-80">{channel.by}</p>
				<a
					href={channel.url}
					target="_blank"
					rel="noreferrer noopener"
					className="relative z-10 mt-6 inline-flex w-fit items-center gap-2 border border-current px-3 py-1.5 text-[0.8125rem] uppercase tracking-[0.14em] hover:bg-[#7dff9b] hover:text-[#0b1a10] hover:[text-shadow:none]"
				>
					Tune in
					<ArrowUpRight className="text-[0.9rem]" />
				</a>
			</div>
		);
	}

	return (
		<button type="button" onClick={onPlay} className="group absolute inset-0 block text-left" aria-label={`Play ${channel.title}, by ${channel.by}`}>
			<Image
				src={`https://i.ytimg.com/vi/${channel.youtube}/hqdefault.jpg`}
				alt=""
				fill
				sizes="(max-width: 1024px) 90vw, 560px"
				className="object-cover"
			/>
			<span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />
			<span aria-hidden className="absolute right-[8%] top-[8%] font-mono text-[0.875rem] text-[#7dff9b] [text-shadow:0_0_6px_rgba(125,255,155,0.6)]">
				{number}
			</span>
			<span
				aria-hidden
				className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white ring-2 ring-white/70 transition-transform duration-300 group-hover:scale-110"
			>
				<svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current">
					<path d="M7 4.5v15l12-7.5z" />
				</svg>
			</span>
			<span className="absolute inset-x-[8%] bottom-[9%] text-white">
				<span className="block font-display text-[clamp(1rem,2.6vw,1.35rem)] font-extrabold leading-tight">{channel.title}</span>
				<span className="block font-editorial text-[0.9375rem] italic text-white/80">{channel.by}</span>
			</span>
		</button>
	);
}
