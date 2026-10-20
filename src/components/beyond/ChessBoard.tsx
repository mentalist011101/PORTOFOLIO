import { cx } from "@/lib/utils";

interface ChessBoardProps {
	readonly fen: string;
	readonly flipped?: boolean;
	readonly label: string;
}

export function ChessBoard({ fen, flipped = false, label }: ChessBoardProps) {
	const squares = parsePlacement(fen);
	const ranks = flipped ? [0, 1, 2, 3, 4, 5, 6, 7] : [7, 6, 5, 4, 3, 2, 1, 0];
	const files = flipped ? [7, 6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5, 6, 7];

	return (
		<div
			role="img"
			aria-label={label}
			className="grid aspect-square w-full grid-cols-8 grid-rows-8 overflow-hidden rounded-[4px] shadow-lift [container-type:inline-size]"
		>
			{ranks.flatMap((rank, row) =>
				files.map((file, column) => {
					const piece = squares[rank]?.[file];
					const light = (rank + file) % 2 === 1;

					return (
						<div
							key={`${file}${rank}`}
							className={cx(
								"relative grid place-items-center",
								light ? "bg-[var(--color-board-light)]" : "bg-[var(--color-board-dark)]",
							)}
						>
							{column === 0 && (
								<span
									className={cx(
										"absolute left-[6%] top-[3%] font-sans text-[2.4cqw] font-bold leading-none",
										light ? "text-[var(--color-board-dark)]" : "text-[var(--color-board-light)]",
									)}
								>
									{rank + 1}
								</span>
							)}
							{row === 7 && (
								<span
									className={cx(
										"absolute bottom-[3%] right-[6%] font-sans text-[2.4cqw] font-bold leading-none",
										light ? "text-[var(--color-board-dark)]" : "text-[var(--color-board-light)]",
									)}
								>
									{FILES[file]}
								</span>
							)}
							{piece !== undefined && (
								<span
									aria-hidden
									className="select-none text-[10.5cqw] leading-none"
									style={{
										fontFamily: PIECE_FONT,
										color: piece.white ? "#fbfaf7" : "#2b2926",
										textShadow: piece.white ? WHITE_OUTLINE : BLACK_OUTLINE,
									}}
								>
									{GLYPHS[piece.kind]}
									{TEXT_PRESENTATION}
								</span>
							)}
						</div>
					);
				}),
			)}
		</div>
	);
}

const FILES = "abcdefgh";

// Glyphes pleins pour les deux camps : la couleur vient du style, pas du caractère.
const GLYPHS: Record<string, string> = { k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" };

// Sans ce sélecteur, iOS rend ♟ en emoji.
const TEXT_PRESENTATION = "︎";

const PIECE_FONT = '"Segoe UI Symbol", "Noto Sans Symbols 2", "DejaVu Sans", "Apple Symbols", serif';
const WHITE_OUTLINE = "0 0 1px #2b2926, 0 0 1px #2b2926, 0 0 1px #2b2926, 0 2px 2px rgba(0,0,0,0.25)";
const BLACK_OUTLINE = "0 0 1px rgba(255,255,255,0.35), 0 2px 2px rgba(0,0,0,0.3)";

interface Piece {
	readonly kind: string;
	readonly white: boolean;
}

// Indexé [rang][colonne], rang 0 = 1re rangée, colonne 0 = colonne a.
function parsePlacement(fen: string): (Piece | undefined)[][] {
	const placement = fen.split(" ")[0] ?? "";
	return placement
		.split("/")
		.reverse()
		.map((row) =>
			[...row].flatMap((char): (Piece | undefined)[] =>
				/\d/.test(char) ? Array.from({ length: Number(char) }, () => undefined) : [{ kind: char.toLowerCase(), white: char === char.toUpperCase() }],
			),
		);
}
