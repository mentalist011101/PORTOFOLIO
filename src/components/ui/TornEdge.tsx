import { cx } from "@/lib/utils";

interface TornEdgeProps {
	readonly position: "top" | "bottom";
	/** Text colour class — the edge is filled with currentColor. */
	readonly className?: string;
}

export function TornEdge({ position, className }: TornEdgeProps) {
	return (
		<svg
			viewBox="0 0 1200 22"
			preserveAspectRatio="none"
			aria-hidden
			focusable="false"
			className={cx(
				"pointer-events-none absolute inset-x-0 h-3 w-full sm:h-[22px]",
				position === "top" ? "bottom-full translate-y-px" : "top-full -translate-y-px",
				className,
			)}
		>
			<path d={position === "top" ? TOP_EDGE : BOTTOM_EDGE} fill="currentColor" />
		</svg>
	);
}

const TOP_EDGE =
	"M0,22 L0,13 L26,5 L53,16 L84,6 L118,15 L152,4 L188,14 L224,7 L262,17 L298,5 L336,13 L372,3 L410,16 L446,8 L484,18 L520,6 L558,12 L596,3 L634,15 L672,7 L710,17 L748,5 L786,14 L824,4 L862,16 L900,8 L938,18 L976,6 L1014,13 L1052,3 L1090,15 L1128,7 L1166,17 L1200,9 L1200,22 Z";

const BOTTOM_EDGE =
	"M0,0 L1200,0 L1200,12 L1172,19 L1140,6 L1104,17 L1068,5 L1030,15 L992,4 L954,16 L916,8 L878,18 L840,6 L802,14 L764,3 L726,17 L688,7 L650,15 L612,4 L574,18 L536,9 L498,16 L460,5 L422,14 L384,3 L346,17 L308,8 L270,15 L232,5 L194,13 L156,4 L118,16 L80,7 L42,18 L0,10 Z";
