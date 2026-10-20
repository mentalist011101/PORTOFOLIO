import type { CSSProperties } from "react";

import { cx } from "@/lib/utils";

// Décor de l'espace poésie : fleur séchée, feuille, signet, lettres et pétales. Purement décoratif.

export function PressedFlower({ className }: { readonly className?: string }) {
	return (
		<svg aria-hidden viewBox="0 0 170 270" className={cx("pointer-events-none mix-blend-multiply dark:mix-blend-normal", className)}>
			<g fill="none" stroke="var(--color-kraft-deep)" strokeWidth={1.6} strokeLinecap="round" opacity={0.8}>
				<path d="M84 266 C 80 214, 90 160, 82 92" />
				<path d="M84 196 C 98 178, 112 162, 124 146" />
			</g>
			<g stroke="var(--color-kraft-deep)" strokeWidth={1} opacity={0.75}>
				<path d="M83 214 C 58 205, 42 186, 40 164 C 62 168, 78 188, 83 214 Z" fill="var(--color-kraft)" fillOpacity={0.55} />
				<path d="M83 172 C 104 166, 118 150, 122 130 C 102 132, 88 150, 83 172 Z" fill="var(--color-kraft)" fillOpacity={0.45} />
				<path d="M60 186 L 80 208 M104 148 L 86 168" fill="none" />
			</g>
			<g transform="translate(82 82)">
				{PETAL_ANGLES.map((angle) => (
					<ellipse
						key={angle}
						cx={0}
						cy={-27}
						rx={12}
						ry={27}
						transform={`rotate(${angle})`}
						fill="var(--color-rust)"
						fillOpacity={0.2}
						stroke="var(--color-rust)"
						strokeOpacity={0.45}
						strokeWidth={1}
					/>
				))}
				<circle r={9} fill="var(--color-sun)" fillOpacity={0.75} stroke="var(--color-kraft-deep)" strokeWidth={1} />
			</g>
			<g transform="translate(126 140) scale(0.45)">
				{PETAL_ANGLES.map((angle) => (
					<ellipse
						key={angle}
						cx={0}
						cy={-24}
						rx={11}
						ry={24}
						transform={`rotate(${angle + 20})`}
						fill="var(--color-ember)"
						fillOpacity={0.22}
						stroke="var(--color-rust)"
						strokeOpacity={0.4}
						strokeWidth={2}
					/>
				))}
				<circle r={8} fill="var(--color-sun)" fillOpacity={0.7} />
			</g>
		</svg>
	);
}

export function Leaf({ className }: { readonly className?: string }) {
	return (
		<svg aria-hidden viewBox="0 0 80 120" className={cx("pointer-events-none mix-blend-multiply dark:mix-blend-normal", className)}>
			<path
				d="M40 116 C 12 92, 6 52, 38 6 C 70 50, 66 92, 40 116 Z"
				fill="var(--color-kraft)"
				fillOpacity={0.5}
				stroke="var(--color-kraft-deep)"
				strokeWidth={1.2}
				strokeOpacity={0.7}
			/>
			<path
				d="M40 116 L 39 14 M39 44 L 24 32 M39 62 L 56 48 M40 80 L 22 68 M40 96 L 54 86"
				fill="none"
				stroke="var(--color-kraft-deep)"
				strokeWidth={1}
				strokeOpacity={0.6}
			/>
		</svg>
	);
}

/** Signet en tissu qui dépasse du livre : à placer dans un parent `relative`. */
export function Ribbon({ className }: { readonly className?: string }) {
	return (
		<span
			aria-hidden
			className={cx("pointer-events-none absolute z-10 w-5 bg-rust shadow-[1px_2px_3px_rgba(22,24,29,0.25)]", className)}
			style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% calc(100% - 10px), 0 100%)" }}
		/>
	);
}

/** Lettres et pétales qui flottent dans le fond : à placer dans un parent `relative overflow-hidden`. */
export function FloatingLetters() {
	return (
		<div aria-hidden className="pointer-events-none absolute inset-0">
			{LETTERS.map((letter) => (
				<span
					key={letter.char}
					className="drift-slow absolute font-editorial italic leading-none text-ink/[0.06]"
					style={{ left: letter.left, top: letter.top, fontSize: letter.size, rotate: letter.rotate, animationDelay: letter.delay }}
				>
					{letter.char}
				</span>
			))}
			{PETALS.map((petal, index) => (
				<span
					key={index}
					className="petal absolute top-0 h-3 w-2.5 rounded-[80%_0_80%_0]"
					style={
						{
							left: petal.left,
							backgroundColor: petal.color,
							animationDuration: petal.duration,
							animationDelay: petal.delay,
							"--sway": petal.sway,
						} as CSSProperties
					}
				/>
			))}
		</div>
	);
}

const PETAL_ANGLES = [0, 51, 103, 154, 206, 257, 309];

const LETTERS = [
	{ char: "a", left: "4%", top: "12%", size: "9rem", rotate: "-12deg", delay: "0s" },
	{ char: "é", left: "88%", top: "8%", size: "7rem", rotate: "10deg", delay: "-1.5s" },
	{ char: "&", left: "92%", top: "58%", size: "11rem", rotate: "-6deg", delay: "-3s" },
	{ char: "ç", left: "2%", top: "66%", size: "8rem", rotate: "14deg", delay: "-2s" },
	{ char: "Q", left: "46%", top: "86%", size: "7rem", rotate: "-8deg", delay: "-4s" },
	{ char: "œ", left: "70%", top: "28%", size: "6rem", rotate: "6deg", delay: "-0.8s" },
	{ char: "§", left: "22%", top: "40%", size: "6rem", rotate: "-16deg", delay: "-2.6s" },
];

const PETALS = [
	{ left: "8%", color: "rgba(180, 64, 15, 0.35)", duration: "19s", delay: "-2s", sway: "60px" },
	{ left: "23%", color: "rgba(242, 206, 27, 0.5)", duration: "24s", delay: "-11s", sway: "-40px" },
	{ left: "41%", color: "rgba(224, 102, 28, 0.32)", duration: "21s", delay: "-6s", sway: "50px" },
	{ left: "58%", color: "rgba(180, 64, 15, 0.3)", duration: "26s", delay: "-17s", sway: "-70px" },
	{ left: "74%", color: "rgba(242, 206, 27, 0.45)", duration: "20s", delay: "-9s", sway: "45px" },
	{ left: "90%", color: "rgba(224, 102, 28, 0.35)", duration: "23s", delay: "-14s", sway: "-55px" },
];
