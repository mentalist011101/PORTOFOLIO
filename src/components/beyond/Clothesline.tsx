"use client";

import Image from "next/image";
import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

import { PlaceholderStamp } from "@/components/beyond/PlaceholderStamp";
import { ArrowLeft, ArrowRight, ArrowUpRight, Close } from "@/components/ui/Icons";
import { cx, formatDate } from "@/lib/utils";
import type { Activity, ActivityRole } from "@/types";

interface OpenState {
	readonly id: string;
	readonly via: "hover" | "click";
	/** Abscisse (viewport) du centre du badge d'origine, pour que la vue agrandie en parte. */
	readonly originX: number;
}

export function Clothesline({ activities }: { readonly activities: readonly Activity[] }) {
	const scroller = useRef<HTMLOListElement>(null);
	const cards = useRef(new Map<string, HTMLButtonElement>());
	const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
	const [open, setOpen] = useState<OpenState>();

	const opened = activities.find((activity) => activity.id === open?.id);

	// Le fil se lit de gauche à droite dans le temps : on ouvre sur le plus récent.
	useEffect(() => {
		const node = scroller.current;
		if (node !== null) {
			node.scrollLeft = node.scrollWidth;
		}
	}, []);

	const close = useCallback(
		(restoreFocus: boolean) => {
			if (restoreFocus && open !== undefined) {
				cards.current.get(open.id)?.focus();
			}
			setOpen(undefined);
		},
		[open],
	);

	useEffect(() => {
		if (open === undefined) {
			return;
		}

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				close(true);
			}
		};

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [open, close]);

	useEffect(() => () => clearTimeout(hoverTimer.current), []);

	const openCard = (id: string, via: OpenState["via"]) => {
		const rect = cards.current.get(id)?.getBoundingClientRect();
		if (rect !== undefined) {
			setOpen({ id, via, originX: rect.left + rect.width / 2 });
		}
	};

	// Un délai avant d'ouvrir au survol : traverser le fil avec la souris ne doit rien déclencher.
	const onCardPointerEnter = (event: ReactPointerEvent, id: string) => {
		if (event.pointerType !== "mouse") {
			return;
		}
		clearTimeout(hoverTimer.current);
		hoverTimer.current = setTimeout(() => openCard(id, "hover"), 380);
	};

	const scrollBy = (direction: 1 | -1) => {
		const node = scroller.current;
		if (node !== null) {
			node.scrollBy({ left: direction * node.clientWidth * 0.8, behavior: "smooth" });
		}
	};

	return (
		<div>
			<div className="shell flex items-center justify-between gap-4">
				<p className="hidden font-editorial text-[0.9375rem] italic text-ink-soft sm:block">
					Hover a badge to open it — or tap it.
				</p>
				<div className="ml-auto flex gap-2">
					<button
						type="button"
						onClick={() => scrollBy(-1)}
						aria-label="Earlier activities"
						className="grid h-10 w-10 place-items-center rounded-full border border-rule-strong bg-card text-ink shadow-card transition-colors hover:border-ink"
					>
						<ArrowLeft className="text-[1rem]" />
					</button>
					<button
						type="button"
						onClick={() => scrollBy(1)}
						aria-label="Later activities"
						className="grid h-10 w-10 place-items-center rounded-full border border-rule-strong bg-card text-ink shadow-card transition-colors hover:border-ink"
					>
						<ArrowRight className="text-[1rem]" />
					</button>
				</div>
			</div>

			<div className="relative mt-4 min-h-[36rem]">
				<ol
					ref={scroller}
					tabIndex={0}
					aria-label="Activities, from the oldest to the most recent"
					className={cx(
						"flex snap-x snap-mandatory overflow-x-auto px-[max(1.25rem,calc((100vw-78rem)/2+2.5rem))] pb-10 pt-2 transition-opacity duration-300 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
						opened !== undefined && "pointer-events-none opacity-0",
					)}
				>
					{activities.map((activity, index) => {
						const year = activity.start.slice(0, 4);
						const newYear = index === 0 || activities[index - 1]?.start.slice(0, 4) !== year;

						return (
							<Fragment key={activity.id}>
								{newYear && (
									<li aria-hidden className="relative w-24 shrink-0">
										<Twine />
										<span className="absolute left-1/2 top-[18px] h-5 w-px -translate-x-1/2 bg-kraft-deep/60" />
										<span className="absolute left-1/2 top-[36px] -translate-x-1/2 rotate-[-4deg] rounded-[3px] bg-ink px-2.5 py-1 font-display text-[0.9375rem] font-extrabold text-paper shadow-card">
											{year}
										</span>
									</li>
								)}
								<li className="relative w-[18.5rem] shrink-0 snap-center px-3.5">
									<Twine />
									<Clothespin className="top-[6px]" />
									<button
										ref={(node) => {
											if (node === null) {
												cards.current.delete(activity.id);
											} else {
												cards.current.set(activity.id, node);
											}
										}}
										type="button"
										aria-haspopup="dialog"
										aria-expanded={open?.id === activity.id}
										onPointerEnter={(event) => onCardPointerEnter(event, activity.id)}
										onPointerLeave={() => clearTimeout(hoverTimer.current)}
										onClick={() => openCard(activity.id, "click")}
										className="block w-full text-left"
									>
										<Badge activity={activity} tilt={TILTS[index % TILTS.length] ?? ""} />
									</button>
								</li>
							</Fragment>
						);
					})}
				</ol>

				{opened !== undefined && open !== undefined && (
					<div
						className="absolute inset-0 z-20"
						onClick={(event) => {
							if (event.target === event.currentTarget) {
								close(false);
							}
						}}
					>
						<div className="shell h-full">
							<Spotlight
								key={opened.id}
								activity={opened}
								originX={open.originX}
								focusOnOpen={open.via === "click"}
								onPointerLeave={open.via === "hover" ? () => close(false) : undefined}
								onClose={() => close(true)}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

function Badge({ activity, tilt }: { readonly activity: Activity; readonly tilt: string }) {
	const role = ROLES[activity.role];
	const cover = activity.photos?.[0];

	return (
		<article
			className={cx(
				"relative mt-9 origin-top overflow-hidden rounded-[10px] border border-rule bg-card shadow-lift transition-transform duration-500 ease-out-soft hover:rotate-0 hover:scale-[1.02]",
				tilt,
			)}
		>
			<RoleBand role={activity.role} />

			{cover !== undefined && (
				<div className="relative aspect-[16/9] border-b border-rule bg-paper-alt">
					<Image src={cover.src} alt="" fill sizes="296px" className="object-cover object-top" />
				</div>
			)}

			<div className="p-4">
				{activity.demo && <PlaceholderStamp className="mb-3" />}
				<p className="font-mono text-[0.6875rem] text-ink-faint">{dateRange(activity)}</p>
				<h3 className="mt-2 text-[1.0625rem] leading-snug tracking-tight text-ink">{activity.title}</h3>
				<p className="mt-1.5 text-[0.8125rem] text-ink-soft">{activity.organiser}</p>
				<p className="text-[0.8125rem] text-ink-faint">
					{activity.location} · <span className="capitalize">{activity.kind}</span>
				</p>
				<p className="mt-3 line-clamp-3 text-[0.8125rem] leading-relaxed text-ink-soft">{activity.summary}</p>
				<p className="mt-4 flex items-center justify-between border-t border-rule pt-3 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
					Open the badge
					<span className="sr-only">: {role.badge}, {activity.title}</span>
					<ArrowUpRight className="text-[0.875rem]" />
				</p>
			</div>
		</article>
	);
}

interface SpotlightProps {
	readonly activity: Activity;
	readonly originX: number;
	readonly focusOnOpen: boolean;
	readonly onPointerLeave?: () => void;
	readonly onClose: () => void;
}

function Spotlight({ activity, originX, focusOnOpen, onPointerLeave, onClose }: SpotlightProps) {
	const closeButton = useRef<HTMLButtonElement>(null);
	const panel = useRef<HTMLElement>(null);
	const [photoIndex, setPhotoIndex] = useState(0);
	const [originInPanel, setOriginInPanel] = useState<number>();
	const photos = activity.photos ?? [];
	const photo = photos[photoIndex];

	// Avant le premier affichage, sinon l'animation démarre depuis le centre puis saute.
	useLayoutEffect(() => {
		const box = panel.current?.getBoundingClientRect();
		if (box !== undefined) {
			setOriginInPanel(originX - box.left);
		}
	}, [originX]);

	useEffect(() => {
		if (focusOnOpen) {
			closeButton.current?.focus();
		}
	}, [focusOnOpen]);

	return (
		<div className="relative h-full pt-1.5" onPointerLeave={onPointerLeave}>
			<Clothespin className="top-0 z-10" />
			<article
				ref={panel}
				role="dialog"
				aria-label={activity.title}
				className="spotlight-in relative mt-4 flex h-[calc(100%-2.5rem)] flex-col overflow-hidden rounded-[14px] border border-rule bg-card shadow-lift"
				style={{ transformOrigin: originInPanel === undefined ? "50% 0" : `${originInPanel}px 0` }}
			>
				<div className="relative">
					<RoleBand role={activity.role} large />
					<button
						ref={closeButton}
						type="button"
						onClick={onClose}
						aria-label="Close the badge"
						className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/15 text-current transition-colors hover:bg-black/30"
					>
						<Close className="text-[1rem]" />
					</button>
				</div>

				<div className="grid min-h-0 flex-1 gap-6 overflow-y-auto p-5 sm:p-7 lg:grid-cols-[15rem_minmax(0,1fr)_16rem] lg:gap-8 lg:overflow-hidden">
					<div className="lg:overflow-y-auto">
						{activity.demo && <PlaceholderStamp className="mb-4" />}
						<p className="font-mono text-[0.75rem] text-ink-faint">{dateRange(activity)}</p>
						<h3 className="mt-3 text-[1.5rem] leading-tight tracking-tight text-ink">{activity.title}</h3>
						<dl className="mt-5 space-y-3 text-[0.875rem]">
							<Fact term="Role" value={ROLES[activity.role].badge} />
							<Fact term="Organiser" value={activity.organiser} />
							<Fact term="Where" value={activity.location} />
							<Fact term="Kind" value={activity.kind} capitalize />
						</dl>
					</div>

					<figure className="flex min-h-[16rem] flex-col">
						<div className="relative min-h-[16rem] flex-1 overflow-hidden rounded-[6px] bg-paper-alt">
							{photo === undefined ? (
								<div className="absolute inset-3 grid place-items-center rounded-[4px] border-2 border-dashed border-rule-strong text-center">
									<span className="font-editorial text-[1.0625rem] italic text-ink-faint">Photo to come</span>
								</div>
							) : (
								<a href={photo.src} target="_blank" rel="noreferrer noopener" className="absolute inset-0">
									<Image
										src={photo.src}
										alt={photo.alt}
										fill
										sizes="(max-width: 1024px) 90vw, 560px"
										className="object-contain p-2"
									/>
								</a>
							)}
						</div>
						{photos.length > 1 && (
							<div className="mt-3 flex gap-2">
								{photos.map((item, index) => (
									<button
										key={item.src}
										type="button"
										onClick={() => setPhotoIndex(index)}
										aria-label={`Show photo ${index + 1}: ${item.alt}`}
										aria-pressed={index === photoIndex}
										className={cx(
											"relative h-12 w-16 overflow-hidden rounded-[4px] border-2 bg-paper-alt transition-colors",
											index === photoIndex ? "border-ember" : "border-transparent opacity-70 hover:opacity-100",
										)}
									>
										<Image src={item.src} alt="" fill sizes="64px" className="object-cover object-top" />
									</button>
								))}
							</div>
						)}
						{photo !== undefined && (
							<figcaption className="mt-2 font-editorial text-[0.875rem] italic text-ink-soft">{photo.alt}</figcaption>
						)}
					</figure>

					<div className="lg:overflow-y-auto">
						<p className="text-[0.9375rem] leading-relaxed text-ink-soft">{activity.summary}</p>
						{activity.highlights !== undefined && activity.highlights.length > 0 && (
							<ul className="mt-5 space-y-2.5">
								{activity.highlights.map((highlight) => (
									<li key={highlight} className="flex gap-3 text-[0.875rem] text-ink-soft">
										<span aria-hidden className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
										{highlight}
									</li>
								))}
							</ul>
						)}
						{activity.url !== undefined && (
							<a
								href={activity.url}
								target="_blank"
								rel="noreferrer noopener"
								className="mt-6 inline-flex items-center gap-1 text-[0.875rem] font-medium text-ink underline decoration-rule-strong underline-offset-4 transition-colors hover:decoration-ember"
							>
								More about it
								<ArrowUpRight className="text-[0.95rem]" />
							</a>
						)}
					</div>
				</div>
			</article>
		</div>
	);
}

function RoleBand({ role, large = false }: { readonly role: ActivityRole; readonly large?: boolean }) {
	return (
		<div className={cx("text-center", ROLES[role].tone, large ? "px-14 pb-3.5 pt-3" : "px-4 pb-3 pt-2.5")}>
			<span aria-hidden className="mx-auto block h-2 w-12 rounded-full bg-paper shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)]" />
			<p
				className={cx(
					"font-display font-extrabold uppercase tracking-[0.14em]",
					large ? "mt-2.5 text-[1.25rem]" : "mt-2.5 text-[1.0625rem]",
				)}
			>
				{ROLES[role].badge}
			</p>
		</div>
	);
}

function Fact({ term, value, capitalize = false }: { readonly term: string; readonly value: string; readonly capitalize?: boolean }) {
	return (
		<div>
			<dt className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">{term}</dt>
			<dd className={cx("mt-0.5 text-ink", capitalize && "capitalize")}>{value}</dd>
		</div>
	);
}

function Clothespin({ className }: { readonly className?: string }) {
	return (
		<span
			aria-hidden
			className={cx(
				"absolute left-1/2 z-10 h-8 w-3 -translate-x-1/2 rounded-[2px] bg-kraft shadow-[0_1px_2px_rgba(22,24,29,0.3)] before:absolute before:inset-x-0 before:top-1/2 before:h-px before:bg-kraft-deep/70",
				className,
			)}
		/>
	);
}

function Twine() {
	return (
		<svg aria-hidden viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-10 w-full text-kraft-deep">
			<path d="M0 6 Q50 30 100 6" fill="none" stroke="currentColor" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
		</svg>
	);
}

function dateRange(activity: Activity): string {
	return activity.end === undefined ? formatDate(activity.start) : `${formatDate(activity.start)} — ${formatDate(activity.end)}`;
}

const TILTS = ["rotate-[-2.2deg]", "rotate-[1.6deg]", "rotate-[-1deg]", "rotate-[2.4deg]", "rotate-[-1.6deg]"];

const ROLES: Record<ActivityRole, { readonly badge: string; readonly tone: string }> = {
	attended: { badge: "Attendee", tone: "bg-azure text-white" },
	participant: { badge: "Participant", tone: "bg-ember text-white" },
	organised: { badge: "Organiser", tone: "bg-night text-white" },
	speaker: { badge: "Speaker", tone: "bg-rust text-white" },
	volunteer: { badge: "Volunteer", tone: "bg-sun text-ink" },
};
