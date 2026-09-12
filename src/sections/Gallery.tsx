import Image from "next/image";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tape } from "@/components/ui/Tape";
import { gallery } from "@/data/gallery";
import { cx } from "@/lib/utils";
import type { GalleryItem } from "@/types";

export function Gallery() {
	return (
		<section id="gallery" className="bg-paper grid-paper py-20 sm:py-24">
			<div className="shell">
				<SectionHeader
					eyebrow="Screens, certificates, a campus bench"
					title={
						<>
							The work,{" "}
							<span className="font-editorial text-[0.95em] font-normal italic">in pieces</span>
						</>
					}
					description="The same things as above, pinned to a wall instead of written up. Some of them open the full document."
				/>

				{/* Grille explicite plutôt que `columns` : dans un conteneur multi-colonnes,
				    Chromium positionne les éléments absolus (le scotch) contre la mauvaise colonne. */}
				<div className="mt-14 grid grid-cols-2 items-start gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
					{gallery.map((item, index) => (
						<Reveal key={item.id} delay={(index % 4) * 70}>
							<Pinned item={item} index={index} />
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}

function Pinned({ item, index }: { readonly item: GalleryItem; readonly index: number }) {
	const body = (
		<figure
			className={cx(
				"relative bg-card p-2 pb-7 shadow-card transition-all duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-lift",
				ROTATIONS[index % ROTATIONS.length],
			)}
		>
			{index % 3 === 0 && <Tape className="-top-3 left-1/2 w-16 -translate-x-1/2 rotate-[3deg]" />}

			<div className={cx("relative overflow-hidden bg-paper-alt", RATIOS[item.ratio])}>
				<Image
					src={item.src}
					alt={item.alt}
					fill
					sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
					className="object-cover object-top"
				/>
			</div>

			<figcaption className="absolute inset-x-3 bottom-2 truncate font-editorial text-[0.8125rem] italic text-ink-soft">
				{item.caption}
			</figcaption>
		</figure>
	);

	if (item.href === undefined) {
		return body;
	}

	return (
		<a
			href={item.href}
			target={item.href.startsWith("#") ? undefined : "_blank"}
			rel={item.href.startsWith("#") ? undefined : "noreferrer noopener"}
			className="block"
		>
			{body}
		</a>
	);
}

const ROTATIONS = ["-rotate-[1.6deg]", "rotate-[1.2deg]", "-rotate-[0.6deg]", "rotate-[2deg]", "rotate-[0.4deg]"];

const RATIOS: Record<GalleryItem["ratio"], string> = {
	portrait: "aspect-[4/5]",
	square: "aspect-square",
	wide: "aspect-[16/10]",
};
