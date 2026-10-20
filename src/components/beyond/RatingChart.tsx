"use client";

import { useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";

import { cx, formatMonth } from "@/lib/utils";
import type { RatingPoint } from "@/types";

interface RatingChartProps {
	readonly label: string;
	readonly points: readonly RatingPoint[];
	readonly domain: readonly [number, number];
	readonly ticks: readonly number[];
	readonly lineClassName?: string;
}

export function RatingChart({ label, points, domain, ticks, lineClassName = "text-rust dark:text-ember" }: RatingChartProps) {
	const [active, setActive] = useState<number>();
	const last = points.length - 1;

	const x = (index: number) => (last === 0 ? PLOT.left + PLOT.width / 2 : PLOT.left + (index / last) * PLOT.width);
	const y = (rating: number) => PLOT.top + (1 - (rating - domain[0]) / (domain[1] - domain[0])) * PLOT.height;

	const path = points.map((point, index) => `${index === 0 ? "M" : "L"}${x(index).toFixed(1)},${y(point.rating).toFixed(1)}`).join(" ");
	const area = `${path} L${x(last).toFixed(1)},${PLOT.top + PLOT.height} L${x(0).toFixed(1)},${PLOT.top + PLOT.height} Z`;
	const focused = active === undefined ? undefined : points[active];

	function onPointerMove(event: PointerEvent<SVGSVGElement>) {
		const box = event.currentTarget.getBoundingClientRect();
		const ratio = (((event.clientX - box.left) / box.width) * WIDTH - PLOT.left) / PLOT.width;
		setActive(Math.round(Math.min(Math.max(ratio, 0), 1) * last));
	}

	function onKeyDown(event: KeyboardEvent<SVGSVGElement>) {
		if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
			return;
		}

		event.preventDefault();
		const step = event.key === "ArrowRight" ? 1 : -1;
		setActive((current) => Math.min(Math.max((current ?? last) + step, 0), last));
	}

	const first = points[0];
	const end = points[last];
	if (first === undefined || end === undefined) {
		return <p className="py-10 text-center text-[0.8125rem] text-ink-faint">No rated games yet.</p>;
	}

	const marker = focused ?? end;

	return (
		<div className="relative">
			<svg
				viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
				className={cx(
					"block h-auto w-full touch-pan-y outline-none focus-visible:outline-2 focus-visible:outline-offset-4",
					lineClassName,
				)}
				role="img"
				aria-label={`${label} rating at the end of each month, from ${formatMonth(first.month)} to ${formatMonth(end.month)}. Use the left and right arrow keys to read each month.`}
				tabIndex={0}
				onPointerMove={onPointerMove}
				onPointerLeave={() => setActive(undefined)}
				onFocus={() => setActive(last)}
				onBlur={() => setActive(undefined)}
				onKeyDown={onKeyDown}
			>
				{ticks.map((tick) => (
					<g key={tick}>
						<line
							x1={PLOT.left}
							x2={PLOT.left + PLOT.width}
							y1={y(tick)}
							y2={y(tick)}
							className="stroke-rule"
							strokeWidth={1}
							vectorEffect="non-scaling-stroke"
						/>
						<text
							x={PLOT.left - 6}
							y={y(tick)}
							textAnchor="end"
							dominantBaseline="middle"
							className="fill-ink-faint font-mono text-[9px] tabular-nums"
						>
							{tick}
						</text>
					</g>
				))}

				<text x={x(0)} y={HEIGHT - 4} textAnchor="start" className="fill-ink-faint font-mono text-[9px]">
					{formatMonth(first.month)}
				</text>
				{last > 0 && (
					<text x={x(last)} y={HEIGHT - 4} textAnchor="end" className="fill-ink-faint font-mono text-[9px]">
						{formatMonth(end.month)}
					</text>
				)}

				{last > 0 && (
					<>
						<path d={area} fill="currentColor" opacity={0.1} />
						<path d={path} fill="none" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
					</>
				)}

				{active !== undefined && (
					<line
						x1={x(active)}
						x2={x(active)}
						y1={PLOT.top}
						y2={PLOT.top + PLOT.height}
						className="stroke-ink-faint"
						strokeWidth={1}
						vectorEffect="non-scaling-stroke"
					/>
				)}

				<circle
					cx={x(active ?? last)}
					cy={y(marker.rating)}
					r={4}
					fill="currentColor"
					className="stroke-card"
					strokeWidth={2}
				/>
			</svg>

			<div
				aria-live="polite"
				className="pointer-events-none absolute top-0 whitespace-nowrap rounded-[4px] border border-rule bg-card px-2.5 py-1.5 shadow-card"
				style={
					focused === undefined
						? { visibility: "hidden" }
						: { left: `${(x(active ?? 0) / WIDTH) * 100}%`, transform: `translateX(-${(x(active ?? 0) / WIDTH) * 100}%)` }
				}
			>
				{focused !== undefined && (
					<>
						<span className="block font-display text-[0.9375rem] font-bold leading-none text-ink">{focused.rating}</span>
						<span className="mt-1 block font-mono text-[0.625rem] text-ink-faint">{formatMonth(focused.month)}</span>
					</>
				)}
			</div>
		</div>
	);
}

const WIDTH = 320;
const HEIGHT = 150;
const PLOT = { left: 34, top: 40, width: 278, height: 88 } as const;
