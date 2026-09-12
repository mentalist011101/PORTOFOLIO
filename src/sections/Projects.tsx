import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { ArrowRight, ArrowUpRight, Github, Node } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tape } from "@/components/ui/Tape";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { repositories } from "@/data/repositories";
import { cx, padIndex } from "@/lib/utils";
import type { Project, ProjectStatus } from "@/types";

export function Projects() {
	return (
		<section id="projects" className="bg-paper paper-grain py-20 sm:py-24">
			<div className="shell">
				<SectionHeader
					eyebrow="Problem, approach, result"
					title="Selected projects"
					description="Five projects rather than twenty. Each one is written the way I would defend it: what was broken, what I tried, and what actually came out of it."
					action={
						<Button href={profile.github} external variant="outline" size="sm">
							All repositories
							<ArrowUpRight className="text-[0.95rem]" />
						</Button>
					}
				/>

				<div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
					{projects.map((project, index) => (
						<Reveal key={project.id} delay={(index % 3) * 80} className="h-full">
							<ProjectCard project={project} index={index} />
						</Reveal>
					))}

					<Reveal delay={160} className="h-full">
						<div className="flex h-full min-h-48 flex-col justify-center rounded-card border border-dashed border-rule-strong bg-transparent p-6 sm:p-7">
							<p className="font-editorial text-[1.0625rem] italic leading-snug text-ink-soft">
								The next one is usually half-written in a notebook. Follow the repositories if you want to see it early.
							</p>
							<Button href={profile.github} external variant="outline" size="sm" className="mt-6 self-start">
								<Github className="text-[0.95rem]" />
								github.com/mentalist011101
							</Button>
						</div>
					</Reveal>
				</div>

				<Reveal className="mt-16">
					<div className="flex flex-wrap items-baseline justify-between gap-3 border-t border-rule pt-8">
						<h3 className="font-display text-xl font-extrabold tracking-tight">Also on the shelf</h3>
						<p className="label-mono text-ink-faint">{repositories.length} more repositories</p>
					</div>

					<ul className="mt-4 grid sm:grid-cols-2 sm:gap-x-10">
						{repositories.map((repository) => (
							<li key={repository.id} className="border-b border-rule">
								<a
									href={repository.url}
									target="_blank"
									rel="noreferrer noopener"
									className="group flex items-start gap-4 py-4 transition-colors duration-200 hover:bg-ink/[0.025]"
								>
									<span className="label-mono mt-1.5 w-[5.5rem] shrink-0 text-ink-faint">{repository.field}</span>
									<span className="min-w-0 flex-1">
										<span className="flex items-center gap-1.5 font-display text-[0.95rem] font-bold tracking-tight text-ink">
											{repository.label}
											<ArrowUpRight className="text-[0.85rem] text-ink-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rust" />
										</span>
										<span className="mt-1 block text-[0.85rem] leading-relaxed text-ink-soft">
											{repository.description}
										</span>
									</span>
									<span className="mt-1.5 hidden shrink-0 font-mono text-[0.625rem] text-ink-faint md:block">
										{repository.language}
									</span>
								</a>
							</li>
						))}
					</ul>
				</Reveal>
			</div>
		</section>
	);
}

function ProjectCard({ project, index }: { readonly project: Project; readonly index: number }) {
	return (
		<article className="group relative flex h-full flex-col rounded-card border border-rule bg-card shadow-card transition-all duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-lift">
			<Tape className={index % 2 === 0 ? "-top-3 left-8 z-10" : "-top-3 right-8 z-10 rotate-[3deg]"} />

			{project.image !== undefined && (
				<div className="relative aspect-[16/9] overflow-hidden rounded-t-[2px] border-b border-rule bg-paper-alt">
					<Image
						src={project.image}
						alt={`${project.title} — screenshot`}
						fill
						sizes="(max-width: 768px) 92vw, (max-width: 1280px) 46vw, 30vw"
						className="object-cover transition-transform duration-500 ease-out-soft group-hover:scale-[1.03]"
					/>
				</div>
			)}

			<div className="relative flex flex-1 flex-col p-6 sm:p-7">
				<Node className="pointer-events-none absolute bottom-14 right-5 text-[3.25rem] text-ink/[0.045]" />

				<header className="flex items-start justify-between gap-3">
					<div>
						<p className="label-mono text-ink-faint">
							{padIndex(index)} — {project.category}
						</p>
						<h3 className="mt-3 text-[1.45rem] font-extrabold leading-tight tracking-tight">{project.title}</h3>
					</div>
					<StatusPill status={project.status} />
				</header>

				<p className="mt-2 font-editorial text-[1.0625rem] italic leading-snug text-ink-soft">{project.tagline}</p>
				<p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">{project.summary}</p>

				<ul className="mt-5 flex flex-wrap gap-1.5">
					{project.technologies.map((technology) => (
						<li key={technology} className="rounded-full border border-rule px-2.5 py-1 font-mono text-[0.6875rem] leading-none text-ink-soft">
							{technology}
						</li>
					))}
				</ul>

				<details className="group/case mt-6 border-t border-rule pt-4">
					<summary className="flex cursor-pointer list-none items-center gap-2 font-display text-[0.8125rem] font-bold tracking-tight text-ink marker:hidden">
						<ArrowRight className="text-[0.95rem] text-rust transition-transform duration-200 group-open/case:rotate-90" />
						Read the case study
					</summary>

					<div className="mt-4 space-y-4">
						{[
							{ label: "Problem", body: project.problem },
							{ label: "Approach", body: project.approach },
							{ label: "Result", body: project.result },
						].map((block) => (
							<div key={block.label}>
								<p className="label-mono text-rust">{block.label}</p>
								<p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-soft">{block.body}</p>
							</div>
						))}
					</div>
				</details>

				<footer className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-rule pt-4">
					<span className="font-mono text-[0.6875rem] text-ink-faint">{project.period}</span>
					{project.githubUrl !== undefined && (
						<a
							href={project.githubUrl}
							target="_blank"
							rel="noreferrer noopener"
							className="inline-flex items-center gap-1.5 text-[0.8125rem] text-ink transition-colors hover:text-rust"
						>
							<Github className="text-[0.95rem]" />
							Code
							<span className="sr-only"> for {project.title}</span>
						</a>
					)}
					{project.demoUrl !== undefined && (
						<a
							href={project.demoUrl}
							target="_blank"
							rel="noreferrer noopener"
							className="inline-flex items-center gap-1.5 text-[0.8125rem] text-ink transition-colors hover:text-rust"
						>
							<ArrowUpRight className="text-[0.95rem]" />
							Demo
							<span className="sr-only"> of {project.title}</span>
						</a>
					)}
				</footer>
			</div>
		</article>
	);
}

function StatusPill({ status }: { readonly status: ProjectStatus }) {
	return (
		<span
			className={cx(
				"shrink-0 rounded-full border px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em]",
				STATUS_TONES[status],
			)}
		>
			{STATUS_LABELS[status]}
		</span>
	);
}

const STATUS_LABELS: Record<ProjectStatus, string> = {
	shipped: "shipped",
	"in-progress": "in progress",
	research: "research",
};

const STATUS_TONES: Record<ProjectStatus, string> = {
	shipped: "border-rule text-ink-soft",
	"in-progress": "border-ember/45 bg-ember/10 text-rust",
	research: "border-azure/35 bg-azure/10 text-azure",
};
