interface IconProps {
	readonly className?: string;
}

const base = "h-[1em] w-[1em] shrink-0";

export function ArrowRight({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={`${base} ${className ?? ""}`}>
			<path d="M4 12h15" />
			<path d="m13 6 6 6-6 6" />
		</svg>
	);
}

export function ArrowUpRight({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={`${base} ${className ?? ""}`}>
			<path d="M7 17 17 7" />
			<path d="M8 7h9v9" />
		</svg>
	);
}

export function ArrowDown({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={`${base} ${className ?? ""}`}>
			<path d="M12 4v15" />
			<path d="m6 13 6 6 6-6" />
		</svg>
	);
}

export function Download({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={`${base} ${className ?? ""}`}>
			<path d="M12 3v12" />
			<path d="m7 10 5 5 5-5" />
			<path d="M4 20h16" />
		</svg>
	);
}

export function Github({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={`${base} ${className ?? ""}`}>
			<path d="M12 1.6a10.5 10.5 0 0 0-3.32 20.46c.53.1.72-.23.72-.5v-1.8c-2.92.64-3.54-1.4-3.54-1.4-.48-1.23-1.17-1.55-1.17-1.55-.96-.66.07-.64.07-.64 1.06.07 1.61 1.1 1.61 1.1.94 1.62 2.47 1.15 3.07.88.1-.69.37-1.15.67-1.42-2.33-.27-4.78-1.18-4.78-5.24 0-1.16.4-2.1 1.07-2.84-.11-.27-.47-1.35.1-2.81 0 0 .88-.29 2.88 1.08a9.9 9.9 0 0 1 5.24 0c2-1.37 2.88-1.08 2.88-1.08.57 1.46.21 2.54.1 2.81.67.74 1.07 1.68 1.07 2.84 0 4.07-2.46 4.96-4.8 5.23.38.33.72.97.72 1.96v2.9c0 .28.19.61.73.5A10.5 10.5 0 0 0 12 1.6Z" />
		</svg>
	);
}

export function Linkedin({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={`${base} ${className ?? ""}`}>
			<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.25H3V9.75Zm6.5 0h3.83v1.54h.05c.53-.96 1.84-1.97 3.78-1.97 4.05 0 4.8 2.5 4.8 5.76V21h-4v-5.04c0-1.2-.02-2.75-1.75-2.75-1.76 0-2.03 1.31-2.03 2.66V21h-4V9.75Z" />
		</svg>
	);
}

export function Mail({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={`${base} ${className ?? ""}`}>
			<rect x="3" y="5" width="18" height="14" rx="2" />
			<path d="m3.5 7 8.5 6 8.5-6" />
		</svg>
	);
}

export function Menu({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden className={`${base} ${className ?? ""}`}>
			<path d="M4 7h16" />
			<path d="M4 12h16" />
			<path d="M4 17h16" />
		</svg>
	);
}

export function Close({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden className={`${base} ${className ?? ""}`}>
			<path d="m6 6 12 12" />
			<path d="m18 6-12 12" />
		</svg>
	);
}

export function Send({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={`${base} ${className ?? ""}`}>
			<path d="M4.5 12h15" />
			<path d="m13 5.5 6.5 6.5-6.5 6.5" />
		</svg>
	);
}

export function Sparkle({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={`${base} ${className ?? ""}`}>
			<path d="M12 0c.6 6.4 5 10.8 12 12-7 1.2-11.4 5.6-12 12-.6-6.4-5-10.8-12-12C7 10.8 11.4 6.4 12 0Z" />
		</svg>
	);
}

/** Trait tracé à la main : légèrement irrégulier, c'est voulu. */
export function HandArrow({ className }: IconProps) {
	return (
		<svg viewBox="0 0 120 84" fill="none" stroke="currentColor" strokeWidth={2.1} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
			<path d="M6 8c14-3 29 1 41 9 11 7 19 17 22 29 1 5 2 11 1 16" />
			<path d="M58 52c4 6 8 11 12 16" />
			<path d="M84 58c-5 4-9 7-14 10" />
		</svg>
	);
}

export function Sun({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={`${base} ${className ?? ""}`}>
			<circle cx="12" cy="12" r="4.2" />
			<path d="M12 2.5v2.4M12 19.1v2.4M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.9 19.1l1.7-1.7M17.4 6.6l1.7-1.7" />
		</svg>
	);
}

export function Moon({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={`${base} ${className ?? ""}`}>
			<path d="M20.6 15.2a8.7 8.7 0 0 1-10.8-10.8A9.2 9.2 0 1 0 20.6 15.2Z" />
		</svg>
	);
}

export function Node({ className }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden className={`${base} ${className ?? ""}`}>
			<circle cx="5" cy="6" r="2.2" />
			<circle cx="5" cy="18" r="2.2" />
			<circle cx="19" cy="12" r="2.2" />
			<path d="M7 7.2 17 11M7 16.8 17 13" />
		</svg>
	);
}
