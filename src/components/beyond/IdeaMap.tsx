"use client";

import Link from "next/link";
import { useId, useState } from "react";

import { cx } from "@/lib/utils";

export interface IdeaMapNode {
	readonly id: string;
	readonly kind: "theme" | "reflection";
	readonly label: string;
	readonly x: number;
	readonly y: number;
	readonly href?: string;
	/** Côté du libellé d'une réflexion : vers l'extérieur du cercle. */
	readonly anchor?: "start" | "end";
}

export interface IdeaMapEdge {
	readonly from: string;
	readonly to: string;
	readonly path: string;
}

export interface IdeaMapCloud {
	readonly cx: number;
	readonly cy: number;
	readonly rx: number;
	readonly ry: number;
}

interface IdeaMapProps {
	readonly nodes: readonly IdeaMapNode[];
	readonly edges: readonly IdeaMapEdge[];
	readonly cloud: IdeaMapCloud;
	readonly width: number;
	readonly height: number;
}

// Décoratif pour les lecteurs d'écran : la liste des réflexions à côté porte les mêmes liens.
export function IdeaMap({ nodes, edges, cloud, width, height }: IdeaMapProps) {
	const [active, setActive] = useState<string>();
	const sketch = useId();

	const linked = new Set(
		active === undefined ? [] : edges.flatMap((edge) => (edge.from === active || edge.to === active ? [edge.from, edge.to] : [])),
	);
	const dimmed = (id: string) => active !== undefined && !linked.has(id) && id !== active;

	return (
		<svg viewBox={`0 0 ${width} ${height}`} className="block h-auto w-full" aria-hidden onPointerLeave={() => setActive(undefined)}>
			<defs>
				{/* Bruit de déplacement léger : les traits tremblent comme au crayon. */}
				<filter id={sketch} x="-5%" y="-5%" width="110%" height="110%">
					<feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves={2} seed={7} />
					<feDisplacementMap in="SourceGraphic" scale={3.2} />
				</filter>
			</defs>

			<g filter={`url(#${sketch})`} className="text-ink-soft">
				<path d={cloudPath(cloud)} className="fill-card/70" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" />
				<circle cx={cloud.cx - cloud.rx * 0.62} cy={cloud.cy + cloud.ry + 26} r={15} className="fill-card/70" stroke="currentColor" strokeWidth={1.5} />
				<circle cx={cloud.cx - cloud.rx * 0.78} cy={cloud.cy + cloud.ry + 56} r={9} className="fill-card/70" stroke="currentColor" strokeWidth={1.5} />
				<circle cx={cloud.cx - cloud.rx * 0.9} cy={cloud.cy + cloud.ry + 76} r={5} className="fill-card/70" stroke="currentColor" strokeWidth={1.5} />

				{edges.map((edge) => {
					const lit = active !== undefined && (edge.from === active || edge.to === active);
					return (
						<path
							key={`${edge.from}-${edge.to}`}
							d={edge.path}
							fill="none"
							strokeWidth={lit ? 2.2 : 1.2}
							strokeLinecap="round"
							className={cx(
								"transition-[stroke,opacity] duration-300",
								lit ? "stroke-ember" : "stroke-ink-faint",
								active !== undefined && !lit && "opacity-25",
							)}
						/>
					);
				})}

				{nodes
					.filter((node) => node.kind === "theme")
					.map((node) => {
						const rx = themeWidth(node.label) / 2;
						return (
							<g key={node.id} className={cx("transition-opacity duration-300", dimmed(node.id) && "opacity-30")}>
								<ellipse
									cx={node.x}
									cy={node.y}
									rx={rx}
									ry={19}
									className={cx("transition-colors", active === node.id ? "fill-sun/80" : "fill-transparent")}
									stroke="currentColor"
									strokeWidth={1.5}
								/>
								<ellipse cx={node.x + 2} cy={node.y - 1} rx={rx - 3} ry={17} fill="none" stroke="currentColor" strokeWidth={0.9} transform={`rotate(-4 ${node.x} ${node.y})`} />
							</g>
						);
					})}
			</g>

			{nodes.map((node) =>
				node.kind === "theme" ? (
					<text
						key={node.id}
						x={node.x}
						y={node.y + 1}
						textAnchor="middle"
						dominantBaseline="central"
						onPointerEnter={() => setActive(node.id)}
						className={cx("cursor-default fill-ink font-hand text-[22px] font-medium transition-opacity duration-300", dimmed(node.id) && "opacity-30")}
					>
						{node.label}
					</text>
				) : (
					<Link
						key={node.id}
						href={node.href ?? "#"}
						tabIndex={-1}
						onPointerEnter={() => setActive(node.id)}
						className={cx("group transition-opacity duration-300", dimmed(node.id) && "opacity-30")}
					>
						<circle cx={node.x} cy={node.y} r={16} fill="transparent" />
						<circle cx={node.x} cy={node.y} r={5.5} className="fill-ink group-hover:fill-rust" />
						<text
							x={node.x + (node.anchor === "end" ? -12 : 12)}
							y={node.y + 1}
							textAnchor={node.anchor ?? "start"}
							dominantBaseline="central"
							className="fill-ink font-hand text-[23px] font-bold group-hover:fill-rust"
						>
							{node.label}
						</text>
					</Link>
				),
			)}

			{/* Cibles de survol des thèmes, par-dessus tout le reste. */}
			{nodes
				.filter((node) => node.kind === "theme")
				.map((node) => (
					<ellipse
						key={`hit-${node.id}`}
						cx={node.x}
						cy={node.y}
						rx={themeWidth(node.label) / 2}
						ry={19}
						fill="transparent"
						onPointerEnter={() => setActive(node.id)}
					/>
				))}
		</svg>
	);
}

function themeWidth(label: string): number {
	return label.length * 10 + 34;
}

// Contour de nuage : des arcs bombés vers l'extérieur, posés le long d'une ellipse.
function cloudPath({ cx, cy, rx, ry }: IdeaMapCloud): string {
	const bumps = 14;
	const points = Array.from({ length: bumps }, (_, index) => {
		const angle = (index / bumps) * Math.PI * 2;
		return { x: cx + Math.cos(angle) * rx, y: cy + Math.sin(angle) * ry };
	});

	return (
		points
			.map((point, index) => {
				const next = points[(index + 1) % bumps] ?? point;
				const radius = Math.hypot(next.x - point.x, next.y - point.y) * (index % 2 === 0 ? 0.62 : 0.56);
				return `${index === 0 ? `M${point.x.toFixed(1)},${point.y.toFixed(1)} ` : ""}A${radius.toFixed(1)},${radius.toFixed(1)} 0 0 1 ${next.x.toFixed(1)},${next.y.toFixed(1)}`;
			})
			.join(" ") + " Z"
	);
}
