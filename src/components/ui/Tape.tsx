import { cx } from "@/lib/utils";

interface TapeProps {
	readonly className?: string;
	readonly tone?: "paper" | "light";
}

export function Tape({ className, tone = "paper" }: TapeProps) {
	return (
		<span
			aria-hidden
			className={cx(
				"pointer-events-none absolute h-6 w-24 rotate-[-3deg] shadow-[0_1px_2px_rgba(22,24,29,0.12)]",
				tone === "paper" ? "bg-[rgba(214,199,168,0.55)]" : "bg-[rgba(255,255,255,0.16)]",
				className,
			)}
			style={{
				maskImage: "linear-gradient(90deg, transparent 0, #000 6px, #000 calc(100% - 6px), transparent 100%)",
				WebkitMaskImage: "linear-gradient(90deg, transparent 0, #000 6px, #000 calc(100% - 6px), transparent 100%)",
			}}
		/>
	);
}
