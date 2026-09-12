import type { ReactNode } from "react";

import { cx } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "light" | "outline-light";
type ButtonSize = "sm" | "md";

interface ButtonProps {
	readonly children: ReactNode;
	readonly href?: string;
	readonly variant?: ButtonVariant;
	readonly size?: ButtonSize;
	readonly external?: boolean;
	readonly download?: boolean;
	readonly className?: string;
	readonly onClick?: () => void;
	readonly type?: "button" | "submit";
	readonly ariaLabel?: string;
}

export function Button({
	children,
	href,
	variant = "primary",
	size = "md",
	external = false,
	download = false,
	className,
	onClick,
	type = "button",
	ariaLabel,
}: ButtonProps) {
	const classes = cx(
		"group inline-flex items-center justify-center gap-2 rounded-btn font-medium transition-all duration-150 ease-out",
		size === "sm" ? "px-4 py-2 text-[0.8125rem]" : "px-5 py-3 text-sm",
		// Ombre pleine décalée, qui s'écrase quand le bouton est enfoncé.
		"hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
		VARIANTS[variant],
		className,
	);

	if (href !== undefined) {
		return (
			<a
				href={href}
				className={classes}
				aria-label={ariaLabel}
				download={download || undefined}
				target={external ? "_blank" : undefined}
				rel={external ? "noreferrer noopener" : undefined}
			>
				{children}
			</a>
		);
	}

	return (
		<button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
			{children}
		</button>
	);
}

const VARIANTS: Record<ButtonVariant, string> = {
	primary: "bg-ember text-white shadow-[var(--shadow-hard)] hover:bg-rust hover:shadow-[var(--shadow-hard-sm)]",
	outline:
		"border border-rule-strong bg-card text-ink shadow-[var(--shadow-hard)] hover:border-ink hover:shadow-[var(--shadow-hard-sm)]",
	light: "bg-card text-ink shadow-[var(--shadow-hard)] hover:bg-white hover:shadow-[var(--shadow-hard-sm)]",
	"outline-light":
		"border border-white/40 text-white shadow-[var(--shadow-hard-light)] hover:bg-white/10 hover:shadow-[var(--shadow-hard-light-sm)]",
};
