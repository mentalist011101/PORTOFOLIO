"use client";

import { useState } from "react";

// YouTube n'est chargé (ni iframe ni cookies) qu'au clic sur « play ».
export function VideoFacade({ id, title }: { readonly id: string; readonly title: string }) {
	const [playing, setPlaying] = useState(false);

	return (
		<div className="relative aspect-video overflow-hidden rounded-[6px] shadow-lift">
			{playing ? (
				<iframe
					src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`}
					title={title}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					className="absolute inset-0 h-full w-full"
				/>
			) : (
				<button
					type="button"
					onClick={() => setPlaying(true)}
					className="chalkboard group absolute inset-0 flex flex-col items-center justify-center gap-4 text-center"
				>
					<span className="grid h-16 w-16 place-items-center rounded-full border-2 border-current transition-transform duration-300 group-hover:scale-110">
						<svg aria-hidden viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current">
							<path d="M7 4.5v15l12-7.5z" />
						</svg>
					</span>
					<span className="chalk font-hand text-[1.75rem] font-bold leading-none">Play the video</span>
					<span className="text-[0.8125rem] text-ink-faint">Loads from YouTube when you press play.</span>
				</button>
			)}
		</div>
	);
}
