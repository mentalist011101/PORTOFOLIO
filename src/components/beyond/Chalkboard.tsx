import type { ReactNode } from "react";

import { cx } from "@/lib/utils";
import type { ExplainerLevel } from "@/types";

// Ardoise dans un cadre en bois, avec son rebord : craies et brosse.
export function Chalkboard({ children, className }: { readonly children: ReactNode; readonly className?: string }) {
	return (
		<div className="relative pb-5">
			<div
				className={cx(
					"chalkboard relative overflow-hidden rounded-[6px] border-[12px] border-kraft-deep shadow-[inset_0_0_40px_rgba(0,0,0,0.45),0_18px_40px_-18px_rgba(22,24,29,0.6)] sm:border-[16px]",
					className,
				)}
			>
				{children}
			</div>

			<div aria-hidden className="absolute inset-x-6 bottom-0 h-5 rounded-b-[4px] bg-kraft-deep shadow-[0_6px_10px_-6px_rgba(22,24,29,0.6)] sm:inset-x-10">
				<span className="absolute -top-1.5 left-[12%] h-2.5 w-14 rotate-[-3deg] rounded-full bg-[#f4f2ea] shadow-sm" />
				<span className="absolute -top-1.5 left-[24%] h-2.5 w-9 rotate-[4deg] rounded-full bg-sun shadow-sm" />
				<span className="absolute -top-1.5 left-[31%] h-2.5 w-7 rotate-[-2deg] rounded-full bg-ember/90 shadow-sm" />
				<span className="absolute -top-4 right-[14%] h-5 w-20 rounded-[3px] bg-[#3b3530] shadow-md before:absolute before:inset-x-0 before:bottom-0 before:h-1.5 before:rounded-b-[3px] before:bg-[#d9d4c7]/80" />
			</div>
		</div>
	);
}

// Le niveau en marques de craie : un, deux ou trois cercles pleins.
export function LevelMarks({ level }: { readonly level: ExplainerLevel }) {
	const filled = LEVELS.indexOf(level) + 1;

	return (
		<span className="inline-flex items-center gap-2">
			<span aria-hidden className="inline-flex gap-1">
				{LEVELS.map((entry, index) => (
					<span
						key={entry}
						className={cx("h-2.5 w-2.5 rounded-full border border-current", index < filled ? "bg-current" : "opacity-40")}
					/>
				))}
			</span>
			<span>{level}</span>
		</span>
	);
}

// Petit graphe dessiné à la craie, en clin d'œil aux graphes de connaissances.
export function ChalkDoodle({ className }: { readonly className?: string }) {
	return (
		<svg aria-hidden viewBox="0 0 180 120" className={cx("pointer-events-none text-[#f4f2ea]/45", className)}>
			<g fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
				<path d="M30 30 L90 20 L150 45 M30 30 L60 90 L90 20 M60 90 L130 95 L150 45 M90 20 L130 95" />
				<path d="M128 40 l9 3 l-6 7" />
			</g>
			<g fill="currentColor">
				<circle cx={30} cy={30} r={6} />
				<circle cx={90} cy={20} r={6} />
				<circle cx={150} cy={45} r={6} />
				<circle cx={60} cy={90} r={6} />
				<circle cx={130} cy={95} r={6} />
			</g>
		</svg>
	);
}

const LEVELS: readonly ExplainerLevel[] = ["beginner", "intermediate", "advanced"];
