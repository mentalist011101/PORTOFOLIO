import snapshot from "@/data/chess-history.json";
import { profile } from "@/data/profile";
import type { ChessGame, ChessProfileResult, ChessTimeClass, ChessTimeControl, RatingPoint } from "@/types";

export async function getChessProfile(): Promise<ChessProfileResult> {
	try {
		const [stats, archives] = await Promise.all([
			fetchJson<StatsResponse>(`${API}/stats`),
			fetchJson<ArchivesResponse>(`${API}/games/archives`),
		]);

		// Les mois terminés viennent du snapshot (npm run chess:snapshot) ; on ne demande que
		// les mois qu'il ne contient pas, en série parce que chess.com freine le parallèle.
		// Le dernier mois d'archive est toujours lu, pour la dernière partie jouée.
		const months: Record<string, MonthRatings> = { ...snapshot.months };
		const latestUrl = archives.archives.at(-1);
		let latestGames: readonly Game[] = [];
		for (const url of archives.archives) {
			const month = url.slice(-7).replace("/", "-");
			const known = month in snapshot.months;
			if (known && url !== latestUrl) {
				continue;
			}

			const { games } = await fetchJson<MonthResponse>(url);
			if (!known) {
				months[month] = monthEnd(games);
			}
			if (url === latestUrl) {
				latestGames = games;
			}
		}

		const controls = TIME_CLASSES.flatMap((timeClass): ChessTimeControl[] => {
			const entry = stats[`chess_${timeClass}`];
			if (entry === undefined) {
				return [];
			}

			return [
				{
					timeClass,
					current: entry.last.rating,
					best: entry.best?.rating,
					bestGameUrl: entry.best?.game,
					record: entry.record,
					history: history(months, timeClass),
				},
			];
		});

		return { ok: true, controls, latestGame: toChessGame(latest(latestGames)) };
	} catch {
		return { ok: false };
	}
}

const USERNAME = snapshot.username;
const API = `https://api.chess.com/pub/player/${USERNAME}`;
const TIME_CLASSES: readonly ChessTimeClass[] = ["rapid", "blitz", "bullet"];
const SIX_HOURS = 6 * 60 * 60;

type MonthRatings = Partial<Record<ChessTimeClass, number>>;

interface StatsEntry {
	readonly last: { readonly rating: number };
	readonly best?: { readonly rating: number; readonly game: string };
	readonly record: { readonly win: number; readonly loss: number; readonly draw: number };
}

type StatsResponse = Partial<Record<`chess_${ChessTimeClass}`, StatsEntry>>;

interface ArchivesResponse {
	readonly archives: readonly string[];
}

interface GameSide {
	readonly username: string;
	readonly rating: number;
	readonly result: string;
}

interface Game {
	readonly url: string;
	readonly fen: string;
	readonly rules: string;
	readonly rated: boolean;
	readonly time_class: string;
	readonly end_time: number;
	readonly white: GameSide;
	readonly black: GameSide;
}

interface MonthResponse {
	readonly games: readonly Game[];
}

async function fetchJson<T>(url: string): Promise<T> {
	const response = await fetch(url, {
		headers: { "User-Agent": `luciano-portfolio (${profile.siteUrl})` },
		next: { revalidate: SIX_HOURS },
		signal: AbortSignal.timeout(10_000),
	});

	if (!response.ok) {
		throw new Error(`chess.com responded ${response.status} for ${url}`);
	}

	return (await response.json()) as T;
}

function monthEnd(games: readonly Game[]): MonthRatings {
	const ratings: MonthRatings = {};
	for (const timeClass of TIME_CLASSES) {
		const last = latest(games.filter((game) => game.rated && game.time_class === timeClass));
		if (last !== undefined) {
			ratings[timeClass] = mySide(last).rating;
		}
	}
	return ratings;
}

function latest(games: readonly Game[]): Game | undefined {
	return games
		.filter((game) => game.rules === "chess")
		.reduce<Game | undefined>((found, game) => (found === undefined || game.end_time > found.end_time ? game : found), undefined);
}

function mySide(game: Game): GameSide {
	return game.white.username.toLowerCase() === USERNAME ? game.white : game.black;
}

function toChessGame(game: Game | undefined): ChessGame | undefined {
	if (game === undefined) {
		return undefined;
	}

	const me = mySide(game);
	const opponent = me === game.white ? game.black : game.white;
	const outcome = me.result === "win" ? "won" : opponent.result === "win" ? "lost" : "drew";

	return {
		url: game.url,
		fen: game.fen,
		timeClass: game.time_class,
		date: new Date(game.end_time * 1000).toISOString().slice(0, 10),
		color: me === game.white ? "white" : "black",
		me: { username: me.username, rating: me.rating },
		opponent: { username: opponent.username, rating: opponent.rating },
		outcome,
		reason: outcome === "won" ? opponent.result : me.result,
	};
}

function history(months: Readonly<Record<string, MonthRatings>>, timeClass: ChessTimeClass): RatingPoint[] {
	return Object.keys(months)
		.sort()
		.flatMap((month): RatingPoint[] => {
			const rating = months[month]?.[timeClass];
			return rating === undefined ? [] : [{ month, rating }];
		});
}
