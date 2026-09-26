import type { CSSProperties } from "react";

import { techLogos } from "@/data/techLogos";
import type { TechLogo } from "@/types";

const split = Math.ceil(techLogos.length / 2);
const rows = [
	{ logos: techLogos.slice(0, split), direction: "left", duration: "46s" },
	{ logos: techLogos.slice(split), direction: "right", duration: "56s" },
] as const;

export function TechMarquee() {
	return (
		<div className="tech-strip space-y-3">
			{rows.map((row) => (
				<div key={row.direction} className="overflow-hidden py-1">
					<div
						className="tech-track"
						data-direction={row.direction}
						style={{ "--tech-duration": row.duration } as CSSProperties}
					>
						{[...row.logos, ...row.logos].map((logo, position) => (
							<Tile
								key={`${logo.name}-${position}`}
								logo={logo}
								duplicate={position >= row.logos.length}
							/>
						))}
					</div>
				</div>
			))}
		</div>
	);
}

function Tile({ logo, duplicate }: { readonly logo: TechLogo; readonly duplicate: boolean }) {
	return (
		<span
			className="tech-tile grid h-16 w-16 shrink-0 place-items-center rounded-card border sm:h-[4.25rem] sm:w-[4.25rem]"
			style={{ "--brand": logo.hex } as CSSProperties}
			title={logo.name}
			aria-hidden={duplicate || undefined}
		>
			{logo.path === undefined ? (
				<span className="font-display text-[0.8125rem] font-extrabold tracking-tight">{logo.name}</span>
			) : (
				<svg
					viewBox="0 0 24 24"
					role="img"
					aria-label={logo.name}
					className="h-7 w-7 fill-current sm:h-[1.875rem] sm:w-[1.875rem]"
				>
					<path d={logo.path} />
				</svg>
			)}
		</span>
	);
}
