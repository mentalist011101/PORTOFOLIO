import { ArrowUpRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { experience } from "@/data/experience";
import { padIndex } from "@/lib/utils";

export function Experience() {
	return (
		<section id="experience" className="bg-paper paper-grain py-20 sm:py-24">
			<div className="shell">
				<SectionHeader
					eyebrow="Where the work happened"
					title="Experience"
					description="One role so far, written with enough detail to be discussed in an interview rather than skimmed on a CV."
				/>

				<div className="mt-14 space-y-5">
					{experience.map((entry, index) => (
						<Reveal key={entry.id} delay={index * 80}>
							<article className="rounded-card border border-rule bg-card p-6 shadow-card transition-shadow duration-300 hover:shadow-lift sm:p-8">
								<div className="grid gap-6 lg:grid-cols-[16rem_1fr] lg:gap-10">
									<div className="lg:border-r lg:border-rule lg:pr-8">
										<p className="label-mono text-ink-faint">
											{padIndex(index)} — {entry.kind}
										</p>
										<h3 className="mt-3 text-[1.25rem] font-extrabold leading-tight tracking-tight">{entry.position}</h3>
										{entry.organisationUrl === undefined ? (
											<p className="mt-2 text-[0.9375rem] font-medium text-rust">{entry.organisation}</p>
										) : (
											<a
												href={entry.organisationUrl}
												target="_blank"
												rel="noreferrer noopener"
												className="mt-2 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-rust underline decoration-ember/30 underline-offset-4 transition-colors hover:decoration-ember"
											>
												{entry.organisation}
												<ArrowUpRight className="text-[0.9rem]" />
											</a>
										)}
										<p className="mt-2 font-mono text-[0.6875rem] text-ink-faint">
											{entry.start} — {entry.end}
											<br />
											{entry.location}
										</p>
									</div>

									<div>
										<p className="text-[0.9375rem] leading-relaxed text-ink-soft">{entry.description}</p>

										<div className="mt-6 grid gap-6 sm:grid-cols-2">
											<div>
												<h4 className="label-mono text-ink-faint">Responsibilities</h4>
												<ul className="mt-3 space-y-2">
													{entry.responsibilities.map((item) => (
														<li key={item} className="flex gap-3 text-[0.875rem] leading-relaxed text-ink-soft">
															<span aria-hidden className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-rule-strong" />
															{item}
														</li>
													))}
												</ul>
											</div>

											<div>
												<h4 className="label-mono text-rust">Outcome</h4>
												<ul className="mt-3 space-y-2">
													{entry.achievements.map((item) => (
														<li key={item} className="flex gap-3 text-[0.875rem] leading-relaxed text-ink-soft">
															<span aria-hidden className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
															{item}
														</li>
													))}
												</ul>
											</div>
										</div>

										<ul className="mt-6 flex flex-wrap gap-1.5 border-t border-rule pt-5">
											{entry.technologies.map((technology) => (
												<li
													key={technology}
													className="rounded-full border border-rule px-2.5 py-1 font-mono text-[0.6875rem] leading-none text-ink-soft"
												>
													{technology}
												</li>
											))}
										</ul>
									</div>
								</div>
							</article>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
