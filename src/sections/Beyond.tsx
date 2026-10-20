import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { chapters } from "@/data/beyond";
import { cx } from "@/lib/utils";

export function Beyond() {
	return (
		<section id="beyond" className="bg-paper-alt py-20 sm:py-24">
			<div className="shell">
				<SectionHeader
					eyebrow="Off the clock"
					title={
						<>
							Beyond{" "}
							<span className="font-editorial text-[0.95em] font-normal italic">the code</span>
						</>
					}
					description="Everything above is what I build. This is the rest, in two chapters: what goes on in my head, and what I love for no reason."
					action={
						<Button href="/beyond" variant="outline">
							Open the notebook
							<ArrowRight className="text-[0.95rem]" />
						</Button>
					}
				/>

				<ul className="mt-12 grid gap-6 md:grid-cols-2">
					{chapters.map((chapter, index) => (
						<Reveal key={chapter.slug} as="li" delay={index * 80}>
							<Link
								href={`/beyond/${chapter.slug}`}
								className={cx(
									"sticky-note flex h-full min-h-52 flex-col justify-between p-7 transition-transform duration-300 ease-out-soft hover:-translate-y-1 hover:rotate-0",
									TONES[index % TONES.length],
								)}
							>
								<span className="label-mono text-ink/55">Chapter {index + 1}</span>
								<span className="mt-6 block">
									<span className="block font-display text-[2rem] font-extrabold leading-none tracking-tight text-ink">
										{chapter.name}
									</span>
									<span className="mt-2 block font-editorial text-[1.0625rem] italic text-ink/75">{chapter.tagline}</span>
								</span>
								<span className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-[0.875rem] text-ink/70">
									{chapter.sections.map((section) => (
										<span key={section.id}>{section.label}</span>
									))}
								</span>
							</Link>
						</Reveal>
					))}
				</ul>
			</div>
		</section>
	);
}

const TONES = ["on-light bg-sun -rotate-[1deg]", "bg-card border border-rule rotate-[0.8deg]"];
