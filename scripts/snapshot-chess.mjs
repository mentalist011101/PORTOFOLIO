// Fige l'Elo de fin de mois des mois terminés dans src/data/chess-history.json.
// Un mois révolu ne change plus ; la page n'interroge en direct que les mois absents d'ici.
// Usage : npm run chess:snapshot

import { writeFile } from "node:fs/promises";

const USERNAME = "mentalist010101";
const TIME_CLASSES = ["rapid", "blitz", "bullet"];
const OUTPUT = new URL("../src/data/chess-history.json", import.meta.url);

const currentMonth = new Date().toISOString().slice(0, 7);
const { archives } = await getJson(`https://api.chess.com/pub/player/${USERNAME}/games/archives`);
const months = {};

// En série : chess.com ralentit fortement les requêtes parallèles.
for (const url of archives) {
	const month = url.slice(-7).replace("/", "-");
	if (month >= currentMonth) {
		continue;
	}

	const { games } = await getJson(url);
	months[month] = monthEnd(games);
	console.log(month, months[month]);
}

await writeFile(OUTPUT, `${JSON.stringify({ username: USERNAME, months }, undefined, "\t")}\n`);
console.log(`${Object.keys(months).length} months written to ${OUTPUT.pathname}`);

async function getJson(url) {
	const response = await fetch(url, { headers: { "User-Agent": "luciano-portfolio snapshot" } });
	if (!response.ok) {
		throw new Error(`chess.com responded ${response.status} for ${url}`);
	}
	return response.json();
}

function monthEnd(games) {
	const ratings = {};
	for (const timeClass of TIME_CLASSES) {
		const last = games
			.filter((game) => game.rules === "chess" && game.rated && game.time_class === timeClass)
			.sort((a, b) => b.end_time - a.end_time)[0];
		if (last !== undefined) {
			ratings[timeClass] = (last.white.username.toLowerCase() === USERNAME ? last.white : last.black).rating;
		}
	}
	return ratings;
}
