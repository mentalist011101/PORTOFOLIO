import { cx } from "@/lib/utils";

export function PlaceholderStamp({ className }: { readonly className?: string }) {
	return (
		<span
			className={cx(
				"inline-block rotate-[-3deg] rounded-[3px] border-2 border-rust px-2 py-0.5 font-mono text-[0.6875rem] font-bold uppercase not-italic tracking-[0.16em] text-rust",
				className,
			)}
		>
			Placeholder
		</span>
	);
}
