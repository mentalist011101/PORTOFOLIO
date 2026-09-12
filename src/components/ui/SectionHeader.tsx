import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { cx } from "@/lib/utils";

interface SectionHeaderProps {
	readonly eyebrow: string;
	readonly title: ReactNode;
	readonly description?: ReactNode;
	readonly action?: ReactNode;
	readonly tone?: "ink" | "light";
	readonly className?: string;
}

export function SectionHeader({ eyebrow, title, description, action, tone = "ink", className }: SectionHeaderProps) {
	return (
		<Reveal className={cx("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}>
			<div className="max-w-2xl">
				<p className={cx("eyebrow", tone === "light" && "text-white/60")}>{eyebrow}</p>
				<h2
					className={cx(
						"mt-2 text-[clamp(1.9rem,4.6vw,3.1rem)] leading-[1.05]",
						tone === "light" ? "text-white" : "text-ink",
					)}
				>
					{title}
				</h2>
				{description !== undefined && (
					<p className={cx("mt-5 text-[0.975rem] leading-relaxed", tone === "light" ? "text-white/70" : "text-ink-soft")}>
						{description}
					</p>
				)}
			</div>
			{action !== undefined && <div className="shrink-0">{action}</div>}
		</Reveal>
	);
}
