import type { ReactNode } from "react";

import { cx } from "@/lib/utils";

// Traits « au crayon » posés par-dessus du texte : ils s'étirent avec lui (preserveAspectRatio="none").

export function Strike({ children, className }: { readonly children: ReactNode; readonly className?: string }) {
	return (
		<span className={cx("relative inline-block", className)}>
			{children}
			<svg aria-hidden viewBox="0 0 100 20" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-[-4%] top-[42%] h-[0.45em] w-[108%] text-rust">
				<path d="M2 12 C 20 6, 38 15, 55 9 S 85 5, 98 10" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
				<path d="M4 15 C 26 9, 48 16, 70 11 S 92 9, 97 7" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
			</svg>
		</span>
	);
}

export function Underline({ children, className }: { readonly children: ReactNode; readonly className?: string }) {
	return (
		<span className={cx("relative inline", className)}>
			{children}
			<svg aria-hidden viewBox="0 0 100 10" preserveAspectRatio="none" className="pointer-events-none absolute -bottom-1.5 left-0 h-2.5 w-full text-ember">
				<path d="M1 6 C 18 3, 35 8, 52 5 S 84 3, 99 6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
			</svg>
		</span>
	);
}

export function Circled({ children, className }: { readonly children: ReactNode; readonly className?: string }) {
	return (
		<span className={cx("relative inline-block px-1.5", className)}>
			{children}
			<svg aria-hidden viewBox="0 0 100 50" preserveAspectRatio="none" className="pointer-events-none absolute inset-[-30%_-12%] h-[160%] w-[124%] text-rust/80">
				<path
					d="M60 6 C 85 5, 97 16, 95 27 C 93 40, 70 46, 47 45 C 22 44, 4 36, 5 24 C 6 12, 26 4, 52 5 C 66 5, 74 8, 78 11"
					fill="none"
					stroke="currentColor"
					strokeWidth={1.6}
					strokeLinecap="round"
					vectorEffect="non-scaling-stroke"
				/>
			</svg>
		</span>
	);
}
