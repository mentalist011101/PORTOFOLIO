import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tape } from "@/components/ui/Tape";
import { profile } from "@/data/profile";

export function About() {
	return (
		<section id="about" className="bg-paper paper-grain py-20 sm:py-24">
			<div className="shell">
				<SectionHeader
					eyebrow="Where I come from"
					title={
						<>
							A short version of
							<br className="hidden sm:block" /> a longer path
						</>
					}
				/>

				<div className="mt-14 grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
					<div className="flex flex-col">
						{/* PLACEHOLDER TEXT — profile.intro in src/data/profile.ts */}
						<div className="space-y-6">
							{profile.intro.map((paragraph, index) => (
								<Reveal key={paragraph.slice(0, 24)} delay={index * 90}>
									<p className="text-[1.0625rem] leading-[1.75] text-ink-soft">{paragraph}</p>
								</Reveal>
							))}
						</div>

						<Reveal delay={280} className="mt-10 lg:mt-auto lg:pt-16">
							<blockquote className="border-l-2 border-ember pl-6">
								<p className="font-editorial text-[1.35rem] italic leading-snug text-ink">
									“A model that cannot be interrogated cannot be trusted, corrected, or taught from.”
								</p>
							</blockquote>
						</Reveal>
					</div>

					<Reveal delay={160} className="relative">
						<div className="relative rotate-[0.8deg] rounded-card border border-rule bg-card p-7 shadow-lift">
							<Tape className="-top-3 left-10" />
							<h3 className="label-mono text-ink-faint">Field notes</h3>

							<dl className="mt-5 space-y-4 text-sm">
								{FACTS.map((fact) => (
									<div key={fact.term} className="grid grid-cols-[6.5rem_1fr] gap-3 border-b border-rule pb-4 last:border-0 last:pb-0">
										<dt className="font-mono text-[0.6875rem] uppercase tracking-wider text-ink-faint">{fact.term}</dt>
										<dd className="text-ink">{fact.value}</dd>
									</div>
								))}
							</dl>

							<h3 className="label-mono mt-7 text-ink-faint">Currently working on</h3>
							<ul className="mt-4 space-y-2.5">
								{profile.focus.map((item) => (
									<li key={item} className="flex gap-3 text-sm text-ink-soft">
										<span aria-hidden className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
										{item}
									</li>
								))}
							</ul>
						</div>
					</Reveal>
				</div>
			</div>
		</section>
	);
}

const FACTS = [
	{ term: "Based in", value: profile.location },
	{ term: "School", value: `${profile.schoolShort}, ${profile.university}` },
	{ term: "Working on", value: "Explainability that survives deployment" },
	{ term: "Languages", value: "French (native), English (professional)" },
	{ term: "Looking for", value: "A research-oriented programme abroad, and AI engineering work" },
] as const;
