import Link from "next/link";

import { IdeaMap } from "@/components/beyond/IdeaMap";
import type { IdeaMapCloud, IdeaMapEdge, IdeaMapNode } from "@/components/beyond/IdeaMap";
import { Circled, Strike, Underline } from "@/components/beyond/Scribbles";
import { HandArrow } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Tape } from "@/components/ui/Tape";
import { TornEdge } from "@/components/ui/TornEdge";
import { getReflections } from "@/lib/content";
import { cx, formatDate } from "@/lib/utils";
import type { Reflection } from "@/types";

export async function Reflections() {
	const reflections = await getReflections();
	const map = layoutMap(reflections);

	return (
		<section id="reflections" className="relative overflow-hidden bg-paper grid-paper py-20 sm:py-24">
			<div className="shell">
				<Reveal className="relative max-w-2xl">
					<p className="font-hand text-[1.5rem] font-medium leading-none text-ink-soft">in my head…</p>
					<h2 className="mt-3 text-[clamp(1.9rem,4.6vw,3.1rem)] leading-[1.1] text-ink">
						<Strike className="text-ink-faint">Essays</Strike>{" "}
						<span className="whitespace-nowrap">
							Thinking <span className="font-hand text-[1.18em] font-bold text-rust">out loud</span>
						</span>
					</h2>
					<p className="mt-5 text-[0.975rem] leading-relaxed text-ink-soft">
						Drafts on AI and the society it is changing — what I actually think, not what a CV should say. Each one
						stays in the language it was written in.
					</p>
					<p className="mt-3 rotate-[-1.5deg] font-hand text-[1.35rem] font-medium text-rust/90">
						(still thinking — these will change)
					</p>
				</Reveal>

				<div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.2fr)] lg:items-start">
					<ol className="space-y-16">
						{reflections.map((reflection, index) => (
							<Reveal key={reflection.slug} as="li" delay={index * 80}>
								<Scrap reflection={reflection} index={index} />
							</Reveal>
						))}
					</ol>

					<Reveal className="relative lg:sticky lg:top-28">
						<p className="flex items-end gap-2 pl-4 font-hand text-[1.45rem] font-medium leading-none text-ink-soft">
							how they connect — hover a theme
							<HandArrow className="h-8 w-12 rotate-[25deg] text-ink-faint" />
						</p>
						<IdeaMap nodes={map.nodes} edges={map.edges} cloud={MAP.cloud} width={MAP.width} height={MAP.height} />
					</Reveal>
				</div>
			</div>
		</section>
	);
}

// Une feuille arrachée d'un carnet : lignes, marge rouge, scotch, bord inférieur déchiré.
function Scrap({ reflection, index }: { readonly reflection: Reflection; readonly index: number }) {
	return (
		<Link
			href={`/beyond/reflections/${reflection.slug}`}
			lang={reflection.lang}
			className={cx(
				"group relative block bg-card rule-line px-7 pb-8 pl-12 pt-7 shadow-card transition-transform duration-500 ease-out-soft hover:-translate-y-1 hover:rotate-0 sm:pl-14",
				SCRAP_TILTS[index % SCRAP_TILTS.length],
				index % 2 === 1 && "sm:ml-10",
			)}
		>
			<Tape className={index % 2 === 0 ? "-top-3 left-10" : "-top-3 right-10 rotate-[4deg]"} />
			<span aria-hidden className="absolute inset-y-0 left-7 w-px bg-rust/40 sm:left-9" />

			<p className="flex flex-wrap items-center gap-x-4 gap-y-1 font-hand text-[1.25rem] font-medium leading-none text-ink-faint">
				<span>{formatDate(reflection.date)}</span>
				<Circled className="uppercase text-ink-soft">{reflection.lang}</Circled>
				<span>~{reflection.readingTime} min</span>
			</p>

			<h3 className="mt-4 text-[1.45rem] leading-tight tracking-tight text-ink">
				<Underline>{reflection.title}</Underline>
			</h3>
			<p className="mt-4 font-hand text-[1.45rem] font-medium leading-[28px] text-ink-soft">{reflection.summary}</p>

			{reflection.demo && (
				<p className="absolute -bottom-10 right-6 rotate-[-4deg] font-hand text-[1.35rem] font-bold text-rust">
					↑ placeholder, to write
				</p>
			)}

			<TornEdge position="bottom" className="text-card" />
		</Link>
	);
}

const SCRAP_TILTS = ["-rotate-[1.2deg]", "rotate-[0.9deg]", "-rotate-[0.5deg]", "rotate-[1.4deg]"];

const MAP = {
	width: 760,
	height: 500,
	themeRadius: 100,
	reflectionRadius: 168,
	cloud: { cx: 380, cy: 222, rx: 352, ry: 198 } satisfies IdeaMapCloud,
} as const;

// Disposition déterministe : les thèmes sur un cercle intérieur, chaque réflexion à
// l'extérieur, dans la direction moyenne de ses thèmes.
function layoutMap(reflections: readonly Reflection[]): { readonly nodes: IdeaMapNode[]; readonly edges: IdeaMapEdge[] } {
	const { cx, cy } = MAP.cloud;
	const themes = [...new Set(reflections.flatMap((reflection) => reflection.themes))].sort();
	const themeAngle = new Map(themes.map((theme, index) => [theme, (index / themes.length) * Math.PI * 2 - Math.PI / 2]));

	const angles = spread(
		reflections.map((reflection) => {
			const vectors = reflection.themes.map((theme) => themeAngle.get(theme) ?? 0);
			return Math.atan2(
				vectors.reduce((sum, angle) => sum + Math.sin(angle), 0),
				vectors.reduce((sum, angle) => sum + Math.cos(angle), 0),
			);
		}),
	);

	// Ovale plutôt que cercle, pour épouser le nuage ; les réflexions moins étirées pour laisser place aux libellés.
	const point = (angle: number, radius: number, stretch: number) => ({ x: cx + Math.cos(angle) * radius * stretch, y: cy + Math.sin(angle) * radius * 0.92 });

	const nodes: IdeaMapNode[] = [
		...themes.map((theme): IdeaMapNode => ({ id: `theme:${theme}`, kind: "theme", label: theme, ...point(themeAngle.get(theme) ?? 0, MAP.themeRadius, 1.4) })),
		...reflections.map((reflection, index): IdeaMapNode => {
			const angle = angles[index] ?? 0;
			return {
				id: `reflection:${reflection.slug}`,
				kind: "reflection",
				label: reflection.short,
				href: `/beyond/reflections/${reflection.slug}`,
				anchor: Math.cos(angle) < 0 ? "end" : "start",
				...point(angle, MAP.reflectionRadius, 1.05),
			};
		}),
	];

	const position = new Map(nodes.map((node) => [node.id, node]));
	const edges = reflections.flatMap((reflection) =>
		reflection.themes.map((theme): IdeaMapEdge => {
			const from = position.get(`reflection:${reflection.slug}`);
			const to = position.get(`theme:${theme}`);
			const mx = ((from?.x ?? cx) + (to?.x ?? cx)) / 2;
			const my = ((from?.y ?? cy) + (to?.y ?? cy)) / 2;
			const control = { x: mx + (cx - mx) * 0.35, y: my + (cy - my) * 0.35 };
			return {
				from: `reflection:${reflection.slug}`,
				to: `theme:${theme}`,
				path: `M${from?.x ?? cx},${from?.y ?? cy} Q${control.x},${control.y} ${to?.x ?? cx},${to?.y ?? cy}`,
			};
		}),
	);

	return { nodes, edges };
}

// Écarte les réflexions trop proches sur le cercle pour que leurs libellés ne se chevauchent pas.
function spread(angles: readonly number[]): number[] {
	const minGap = 0.42;
	const order = angles.map((angle, index) => ({ angle, index })).sort((a, b) => a.angle - b.angle);
	for (let pass = 0; pass < 20; pass++) {
		for (let i = 1; i < order.length; i++) {
			const previous = order[i - 1];
			const current = order[i];
			if (previous !== undefined && current !== undefined && current.angle - previous.angle < minGap) {
				const push = (minGap - (current.angle - previous.angle)) / 2;
				previous.angle -= push;
				current.angle += push;
			}
		}
	}
	const result: number[] = [];
	for (const { angle, index } of order) {
		result[index] = angle;
	}
	return result;
}
