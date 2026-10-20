import Image from "next/image";

import { ChessBoard } from "@/components/beyond/ChessBoard";
import { RatingChart } from "@/components/beyond/RatingChart";
import { ArrowUpRight, Bullet, Lightning, Stopwatch } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";
import { getChessProfile } from "@/lib/chess";
import { cx, formatDate, formatMonth } from "@/lib/utils";
import type { ChessGame, ChessPlayer, ChessTimeClass, ChessTimeControl } from "@/types";

export async function Chess() {
	const chess = await getChessProfile();

	return (
		<section
			id="chess"
			className="chess-room relative overflow-hidden bg-paper py-20 text-ink sm:py-24"
			style={{ background: "repeating-conic-gradient(rgba(255,255,255,0.022) 0 25%, transparent 0 50%) 0 0 / 72px 72px, var(--color-paper)" }}
		>
			<div className="shell">
				<Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<div className="max-w-2xl">
						<p className="eyebrow">Over the board</p>
						<h2 className="mt-2 text-[clamp(1.9rem,4.6vw,3.1rem)] leading-[1.05] text-ink">Chess</h2>
						<p className="mt-5 text-[0.975rem] leading-relaxed text-ink-soft">
							Blitz, rapid and the occasional bullet, on chess.com. Everything here is live from its public API: the
							last game I played, and my rating month by month — the months where it goes the wrong way included.
						</p>
					</div>
					<a
						href={profile.chess}
						target="_blank"
						rel="noreferrer noopener"
						className="inline-flex shrink-0 items-center gap-2 self-start rounded-[8px] bg-[var(--color-chess-green)] px-6 py-3.5 font-display text-[1.1875rem] font-extrabold text-white shadow-[0_5px_0_var(--color-chess-green-deep)] transition-[transform,box-shadow,filter] duration-100 hover:brightness-110 active:translate-y-[4px] active:shadow-[0_1px_0_var(--color-chess-green-deep)] md:self-auto"
					>
						Challenge me
						<ArrowUpRight className="text-[1.05rem]" />
					</a>
				</Reveal>

				{chess.ok ? (
					<Room controls={chess.controls} latestGame={chess.latestGame} />
				) : (
					<p className="mt-12 rounded-[6px] bg-card px-6 py-8 text-[0.9375rem] text-ink-soft">
						chess.com did not answer just now. The ratings will be back on the next refresh — meanwhile, my profile
						shows them live.
					</p>
				)}
			</div>
		</section>
	);
}

function Room({ controls, latestGame }: { readonly controls: readonly ChessTimeControl[]; readonly latestGame?: ChessGame }) {
	const ratings = controls.flatMap((control) => control.history.map((point) => point.rating));
	const step = Math.max(...ratings) - Math.min(...ratings) > 800 ? 400 : 200;
	const domain = [Math.floor(Math.min(...ratings) / step) * step, Math.ceil(Math.max(...ratings) / step) * step] as const;
	const ticks = Array.from({ length: (domain[1] - domain[0]) / step + 1 }, (_, index) => domain[0] + index * step);
	const months = [...new Set(controls.flatMap((control) => control.history.map((point) => point.month)))].sort();

	return (
		<>
			<div className={cx("mt-12 grid gap-8", latestGame !== undefined && "lg:grid-cols-[minmax(0,25rem)_minmax(0,1fr)]")}>
				{latestGame !== undefined && (
					<Reveal>
						<LatestGame game={latestGame} />
					</Reveal>
				)}

				<ul className="flex flex-col gap-4">
					{controls.map((control, index) => (
						<Reveal key={control.timeClass} as="li" delay={index * 80}>
							<article className="flex flex-col gap-5 rounded-[6px] bg-card p-5 sm:flex-row sm:items-center">
								<div className="shrink-0 sm:w-44">
									<h3 className="flex items-center gap-2 font-sans text-[0.9375rem] font-bold tracking-normal text-ink">
										<TimeClassIcon timeClass={control.timeClass} />
										{LABELS[control.timeClass]}
									</h3>
									<p className="mt-2.5 font-display text-[2.5rem] font-extrabold leading-none tracking-tight text-ink">
										{control.current}
									</p>
									{control.best !== undefined && control.bestGameUrl !== undefined && (
										<p className="mt-2.5 text-[0.8125rem] text-ink-faint">
											Best{" "}
											<a
												href={control.bestGameUrl}
												target="_blank"
												rel="noreferrer noopener"
												className="font-semibold text-ink-soft underline decoration-rule-strong underline-offset-4 transition-colors hover:text-ink"
											>
												{control.best}
											</a>
										</p>
									)}
									<p className="mt-1 text-[0.8125rem] text-ink-faint">
										{control.record.win} W · {control.record.loss} L · {control.record.draw} D
									</p>
								</div>

								<div className="min-w-0 flex-1">
									<RatingChart
										label={LABELS[control.timeClass]}
										points={control.history}
										domain={domain}
										ticks={ticks}
										lineClassName="text-[var(--color-chess-line)]"
									/>
								</div>
							</article>
						</Reveal>
					))}
				</ul>
			</div>

			<details className="mt-6 rounded-[6px] bg-card">
				<summary className="cursor-pointer px-5 py-3.5 text-[0.875rem] text-ink-soft transition-colors hover:text-ink">
					Month-end ratings as a table
				</summary>
				<div className="overflow-x-auto border-t border-rule">
					<table className="w-full text-left text-[0.8125rem]">
						<thead>
							<tr className="border-b border-rule">
								<th scope="col" className="px-5 py-2.5 font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-ink-faint">
									Month
								</th>
								{controls.map((control) => (
									<th
										key={control.timeClass}
										scope="col"
										className="px-5 py-2.5 text-right font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-ink-faint"
									>
										{LABELS[control.timeClass]}
									</th>
								))}
							</tr>
						</thead>
						<tbody className="divide-y divide-rule">
							{months.map((month) => (
								<tr key={month}>
									<th scope="row" className="px-5 py-2 font-normal text-ink-soft">
										{formatMonth(month)}
									</th>
									{controls.map((control) => (
										<td key={control.timeClass} className="px-5 py-2 text-right tabular-nums text-ink">
											{control.history.find((point) => point.month === month)?.rating ?? "—"}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</details>
		</>
	);
}

function LatestGame({ game }: { readonly game: ChessGame }) {
	const reason = REASONS[game.reason];

	return (
		<article className="rounded-[6px] bg-card p-4 sm:p-5">
			<h3 className="label-mono text-ink-faint">Latest game · {game.timeClass}</h3>

			<PlayerRow player={game.opponent} className="mt-4" />
			<div className="my-2.5">
				<ChessBoard
					fen={game.fen}
					flipped={game.color === "black"}
					label={`Final position of my latest ${game.timeClass} game, against ${game.opponent.username}. I had the ${game.color} pieces and ${OUTCOMES[game.outcome].toLowerCase()}.`}
				/>
			</div>
			<PlayerRow player={game.me} avatar={profile.avatar} />

			<div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-4">
				<p className="flex items-center gap-2.5 text-[0.875rem] text-ink-soft">
					<span
						className={cx(
							"rounded-[4px] px-2 py-1 font-display text-[0.75rem] font-extrabold uppercase tracking-wide",
							OUTCOME_TONES[game.outcome],
						)}
					>
						{OUTCOMES[game.outcome]}
					</span>
					<span>
						{reason}
						{reason !== undefined && " · "}
						{formatDate(game.date)}
					</span>
				</p>
				<a
					href={game.url}
					target="_blank"
					rel="noreferrer noopener"
					className="inline-flex items-center gap-1 text-[0.875rem] font-semibold text-ink transition-colors hover:text-[var(--color-chess-line)]"
				>
					Review the game
					<ArrowUpRight className="text-[0.95rem]" />
				</a>
			</div>
		</article>
	);
}

function PlayerRow({ player, avatar, className }: { readonly player: ChessPlayer; readonly avatar?: string; readonly className?: string }) {
	return (
		<p className={cx("flex items-center gap-2.5 text-[0.875rem]", className)}>
			{avatar === undefined ? (
				<span aria-hidden className="grid h-8 w-8 place-items-center rounded-[3px] bg-white/10 font-bold text-ink-soft">
					{player.username.charAt(0).toUpperCase()}
				</span>
			) : (
				<Image src={avatar} alt="" width={32} height={32} className="h-8 w-8 rounded-[3px] object-cover" />
			)}
			<span className="font-semibold text-ink">{player.username}</span>
			<span className="text-ink-faint">({player.rating})</span>
		</p>
	);
}

function TimeClassIcon({ timeClass }: { readonly timeClass: ChessTimeClass }) {
	if (timeClass === "rapid") {
		return <Stopwatch className="text-[1.1rem] text-[#81b64c]" />;
	}
	if (timeClass === "blitz") {
		return <Lightning className="text-[1.1rem] text-[#f7c631]" />;
	}
	return <Bullet className="text-[1.1rem] text-[#e3aa24]" />;
}

const LABELS: Record<ChessTimeClass, string> = {
	rapid: "Rapid",
	blitz: "Blitz",
	bullet: "Bullet",
};

const OUTCOMES: Record<ChessGame["outcome"], string> = {
	won: "Won",
	lost: "Lost",
	drew: "Draw",
};

const OUTCOME_TONES: Record<ChessGame["outcome"], string> = {
	won: "bg-[var(--color-chess-green)] text-white",
	lost: "bg-[#b23a2b] text-white",
	drew: "bg-white/15 text-ink",
};

const REASONS: Partial<Record<string, string>> = {
	checkmated: "by checkmate",
	resigned: "by resignation",
	timeout: "on time",
	abandoned: "by abandonment",
	agreed: "by agreement",
	repetition: "by repetition",
	stalemate: "by stalemate",
	insufficient: "insufficient material",
	timevsinsufficient: "timeout vs insufficient material",
	"50move": "by the 50-move rule",
};
