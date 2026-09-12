import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { skillDomains } from "@/data/skills";
import { cx, padIndex } from "@/lib/utils";
import type { SkillDomain } from "@/types";

export function WhatIBuild() {
	return (
		<section id="what-i-build" className="relative bg-paper-alt grid-paper py-20 sm:py-24">
			<div className="shell">
				<SectionHeader
					eyebrow="Capabilities, not a tool list"
					title="What I build"
					description="Five areas that overlap more than they separate. The technologies matter less than what they are used for, so each one points at the work that backs it."
				/>

				<div className="mt-14 grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
					{skillDomains.map((domain, index) => (
						<Reveal
							key={domain.id}
							delay={index * 70}
							className={cx(
								index !== 4 && "h-full",
								index === 1 && "lg:-translate-y-7",
								index === 2 && "lg:translate-y-4",
								index === 4 && "md:col-span-2 lg:col-span-2 lg:translate-y-4",
							)}
						>
							<DomainCard domain={domain} index={index} />
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}

function DomainCard({ domain, index }: { readonly domain: SkillDomain; readonly index: number }) {
	const dark = domain.accent === "night" || domain.accent === "azure";

	return (
		<article
			className={cx(
				"flex h-full flex-col justify-between rounded-card border p-6 shadow-card transition-all duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-lift sm:p-7",
				ACCENTS[domain.accent],
			)}
		>
			<div>
				<div className="flex items-center justify-between">
					<span className={cx("label-mono", dark ? "text-white/50" : "text-ink-faint")}>{padIndex(index)}</span>
					<span aria-hidden className={cx("h-px flex-1 translate-y-px", dark ? "ml-4 bg-white/20" : "ml-4 bg-rule")} />
				</div>

				<h3 className={cx("mt-5 text-xl font-extrabold tracking-tight sm:text-[1.4rem]", dark && "text-white")}>
					{domain.name}
				</h3>

				<p className={cx("mt-3 font-editorial text-[1.0625rem] italic leading-snug", dark ? "text-white/70" : "text-ink-soft")}>
					{domain.stance}
				</p>
			</div>

			<div className="mt-6">
				<ul className="flex flex-wrap gap-1.5">
					{domain.skills.map((skill) => (
						<li
							key={skill}
							className={cx(
								"rounded-full border px-2.5 py-1 font-mono text-[0.6875rem] leading-none",
								dark ? "border-white/25 text-white/75" : "border-rule text-ink-soft",
							)}
						>
							{skill}
						</li>
					))}
				</ul>

				<p className={cx("mt-5 border-t pt-4 font-mono text-[0.6875rem]", dark ? "border-white/15 text-white/50" : "border-rule text-ink-faint")}>
					evidence — {domain.evidence}
				</p>
			</div>
		</article>
	);
}

const ACCENTS: Record<SkillDomain["accent"], string> = {
	card: "border-rule bg-card text-ink",
	sun: "border-ink/10 bg-sun text-ink",
	azure: "border-transparent bg-azure text-white",
	night: "border-transparent bg-night text-white",
};
