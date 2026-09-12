import { TornEdge } from "@/components/ui/TornEdge";
import { publishedArticles } from "@/data/articles";
import { projects } from "@/data/projects";
import { skillDomains } from "@/data/skills";

const technologies = new Set(projects.flatMap((project) => project.technologies));

const stats = [
	{ value: projects.length, label: "selected projects", note: "written up as case studies" },
	{ value: publishedArticles.length, label: "research notes", note: "published, plus drafts" },
	{ value: skillDomains.length, label: "focus domains", note: "from data to deployment" },
	{ value: technologies.size, label: "technologies", note: "used across those projects" },
];

export function StatsBand() {
	return (
		<section aria-label="Portfolio at a glance" className="relative my-12 bg-rust text-white sm:my-16">
			<TornEdge position="top" className="text-rust" />
			<TornEdge position="bottom" className="text-rust" />

			<div className="shell grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-4 lg:py-16">
				{stats.map((stat) => (
					<div key={stat.label}>
						<p className="font-display text-[clamp(2.4rem,6vw,3.6rem)] font-extrabold leading-none tracking-tight">
							{String(stat.value).padStart(2, "0")}
						</p>
						<p className="mt-3 font-display text-sm font-bold tracking-tight">{stat.label}</p>
						<p className="mt-1 text-[0.8125rem] leading-snug text-white/65">{stat.note}</p>
					</div>
				))}
			</div>
		</section>
	);
}
