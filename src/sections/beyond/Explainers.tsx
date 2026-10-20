import Link from "next/link";

import { ChalkDoodle, Chalkboard, LevelMarks } from "@/components/beyond/Chalkboard";
import { Reveal } from "@/components/ui/Reveal";
import { getExplainers } from "@/lib/content";
import { cx } from "@/lib/utils";

export async function Explainers() {
	const explainers = await getExplainers();

	return (
		<section id="explainers" className="bg-paper-alt py-20 sm:py-24">
			<div className="shell">
				<Reveal>
					<Chalkboard className="px-6 pb-12 pt-10 sm:px-12 sm:pb-14 sm:pt-12">
						<ChalkDoodle className="absolute right-6 top-6 hidden w-40 rotate-[-4deg] md:block" />

						<p className="chalk font-hand text-[1.5rem] font-medium leading-none text-ink-soft">today&apos;s lesson…</p>
						<h2 className="chalk mt-2 font-hand text-[clamp(3rem,8vw,5rem)] font-bold leading-[0.95] tracking-normal text-ink">
							Explainers
						</h2>
						<svg aria-hidden viewBox="0 0 300 12" preserveAspectRatio="none" className="mt-1 h-3 w-56 text-sun/80 sm:w-72">
							<path d="M2 8 C 60 3, 120 10, 180 6 S 270 3, 298 7" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
						</svg>
						<p className="mt-5 max-w-xl text-[0.975rem] leading-relaxed text-ink-soft">
							Ideas from my field, made simple — one notion at a time, in writing for now and on video soon. Each one
							stays in the language it was written in.
						</p>

						<ol className="mt-10 grid gap-6 md:grid-cols-3">
							{explainers.map((explainer, index) => (
								<li key={explainer.slug}>
									<Link
										href={`/beyond/explainers/${explainer.slug}`}
										lang={explainer.lang}
										className={cx(
											"group flex h-full flex-col rounded-[3px] border-2 border-dashed border-rule-strong p-5 transition-colors duration-300 hover:border-ink/70 hover:bg-white/[0.03]",
											TILTS[index % TILTS.length],
										)}
									>
										<p className="flex items-center justify-between gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-faint">
											<LevelMarks level={explainer.level} />
											<span className="rounded-full border border-rule-strong px-2 py-0.5">{explainer.lang}</span>
										</p>
										<h3 className="chalk mt-4 font-hand text-[1.95rem] font-bold leading-[1.05] tracking-normal text-ink">
											{explainer.title}
										</h3>
										<p className="mt-3 text-[0.875rem] leading-relaxed text-ink-soft">{explainer.summary}</p>
										<p className="mt-auto flex items-center justify-between gap-3 pt-5 font-hand text-[1.25rem] font-medium text-ink-soft">
											<span>~{explainer.readingTime} min read</span>
											<span className={explainer.video === undefined ? "text-ink-faint" : "text-sun"}>
												{explainer.video === undefined ? "video coming" : "▶ video"}
											</span>
										</p>
										{explainer.demo && (
											<p className="mt-2 rotate-[-2deg] font-hand text-[1.25rem] font-bold text-sun">placeholder — to write</p>
										)}
									</Link>
								</li>
							))}
						</ol>
					</Chalkboard>
				</Reveal>
			</div>
		</section>
	);
}

const TILTS = ["-rotate-[0.6deg]", "rotate-[0.5deg]", "-rotate-[0.3deg]"];
