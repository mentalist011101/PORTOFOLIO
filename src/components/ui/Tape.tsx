import { cx } from "@/lib/utils";

interface TapeProps {
	readonly className?: string;
	readonly tone?: "paper" | "light";
	readonly label?: string;
}

export function Tape({ className, tone = "paper", label }: TapeProps) {
	return (
		<span
			aria-hidden={label === undefined || undefined}
			className={cx(
				"pointer-events-none absolute flex h-6 items-center justify-center rotate-[-3deg] shadow-[0_1px_2px_rgba(22,24,29,0.12)]",
				label === undefined ? "w-24" : "px-3.5",
				tone === "paper" ? "bg-[rgba(214,199,168,0.55)]" : "bg-[rgba(255,255,255,0.16)]",
				className,
			)}
			style={{
				maskImage: "linear-gradient(90deg, transparent 0, #000 6px, #000 calc(100% - 6px), transparent 100%)",
				WebkitMaskImage: "linear-gradient(90deg, transparent 0, #000 6px, #000 calc(100% - 6px), transparent 100%)",
			}}
		>
			{label !== undefined && (
				<span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-[rgba(22,24,29,0.72)]">
					{label}
				</span>
			)}
		</span>
	);
}
