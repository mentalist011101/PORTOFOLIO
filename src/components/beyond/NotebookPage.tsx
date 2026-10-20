import type { ReactNode } from "react";

import { cx } from "@/lib/utils";

// Une page de carnet : lignes, double marge rouge. En-tête commun à tout l'espace Beyond.
export function NotebookPage({ children, className }: { readonly children: ReactNode; readonly className?: string }) {
	return (
		<section id="top" className={cx("relative overflow-hidden border-b border-rule bg-card rule-line", className)}>
			<span aria-hidden className="absolute inset-y-0 left-[max(0.75rem,calc((100vw-78rem)/2+1rem))] w-px bg-rust/45" />
			<span aria-hidden className="absolute inset-y-0 left-[max(1rem,calc((100vw-78rem)/2+1.25rem))] w-px bg-rust/30" />
			{children}
		</section>
	);
}
