import Image from "next/image";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tape } from "@/components/ui/Tape";
import { education } from "@/data/education";
import { profile } from "@/data/profile";
import { cx } from "@/lib/utils";

export function Journey() {
	return (
		<section id="journey" className="bg-paper-alt grid-paper py-20 sm:py-24">
			<div className="shell">
				<SectionHeader
					eyebrow="Where I studied"
					title="Academic journey"
					description="Three steps in the same track at ENSPY — Engineering Sciences, Data Science. Hover a card to see the marks: grades are on a 20-point scale, GPA on 4."
					action={
						<div className="flex items-center gap-3 rounded-card border border-rule bg-card px-4 py-3 shadow-card">
							<Image
								src={profile.enspyLogo}
								alt="École Nationale Supérieure Polytechnique de Yaoundé"
								width={44}
								height={44}
								className="h-11 w-11 mix-blend-multiply"
							/>
							<span className="text-[0.8125rem] leading-snug text-ink-soft">
								<span className="block font-display font-bold text-ink">ENSPY</span>
								Université de Yaoundé I
							</span>
						</div>
					}
				/>

				<ol className="mt-14 max-w-4xl space-y-6">
					{education.map((entry, index) => (
						<Reveal key={entry.id} as="li" delay={index * 90} className="relative pl-8 sm:pl-14">
							<span
								aria-hidden
								className={cx(
									"absolute left-[7px] top-6 h-full w-px bg-rule-strong sm:left-[19px]",
									index === education.length - 1 && "hidden",
								)}
							/>
							<span
								aria-hidden
								className="absolute left-0 top-4 grid h-4 w-4 place-items-center rounded-full border-2 border-rust bg-paper sm:left-3"
							>
								<span className="h-1.5 w-1.5 rounded-full bg-rust" />
							</span>

							<article
								className={cx(
									"group relative rounded-card border border-kraft-deep/30 bg-kraft/65 p-6 shadow-card transition-[transform,box-shadow] duration-300 ease-out-soft hover:-translate-y-1 hover:rotate-0 hover:scale-[1.015] hover:shadow-lift sm:p-7",
									index % 2 === 0 ? "rotate-[-0.4deg]" : "rotate-[0.4deg]",
								)}
							>
								<Tape className={index % 2 === 0 ? "-top-3 right-10" : "-top-3 left-12"} />

								<div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
									<div>
										<p className="label-mono text-kraft-deep">
											{entry.start} — {entry.end}
										</p>
										<h3 className="mt-2.5 text-[1.35rem] font-extrabold leading-tight tracking-tight">{entry.degree}</h3>
										<p className="mt-1 text-[0.9375rem] text-ink-soft">{entry.field}</p>
									</div>

									{entry.distinction !== undefined && (
										<p className="rounded-full bg-sun px-3 py-1.5 font-mono text-[0.6875rem] leading-none text-ink shadow-card">
											{entry.distinction}
										</p>
									)}
								</div>

								<p className="mt-4 border-t border-kraft-deep/20 pt-4 text-[0.9375rem] font-medium text-ink">
									{entry.institution} · <span className="font-normal text-ink-soft">{entry.location}</span>
								</p>

								<p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{entry.description}</p>

								<div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out-soft group-hover:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
									<div className="overflow-hidden">
										{entry.metrics !== undefined && (
											<dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
												{entry.metrics.map((metric) => (
													<div
														key={metric.label}
														className="rounded-[4px] border border-kraft-deep/25 bg-paper/70 px-3 py-2.5 shadow-card"
													>
														<dt className="font-mono text-[0.625rem] uppercase tracking-wider text-kraft-deep">{metric.label}</dt>
														<dd className="mt-1 font-display text-[1.0625rem] font-extrabold leading-none tracking-tight text-ink">
															{metric.value}
														</dd>
													</div>
												))}
											</dl>
										)}

										{entry.highlights.length > 0 && (
											<ul className="mt-4 space-y-2">
												{entry.highlights.map((highlight) => (
													<li key={highlight} className="flex gap-3 text-[0.875rem] text-ink-soft">
														<span aria-hidden className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-kraft-deep/60" />
														{highlight}
													</li>
												))}
											</ul>
										)}
									</div>
								</div>
							</article>
						</Reveal>
					))}
				</ol>
			</div>
		</section>
	);
}
