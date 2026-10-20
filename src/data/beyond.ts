export interface BeyondSection {
	readonly id: string;
	readonly label: string;
	readonly note: string;
}

export interface BeyondChapter {
	readonly slug: "mind" | "heart";
	readonly name: string;
	readonly tagline: string;
	readonly summary: string;
	readonly sections: readonly BeyondSection[];
}

export const mind: BeyondChapter = {
	slug: "mind",
	name: "Mind",
	tagline: "what I think, what I do",
	summary: "The events I show up to, what I think about AI and the world it is changing, and ideas from my field made simple.",
	sections: [
		{ id: "activities", label: "Activities", note: "conferences, hackathons, volunteering" },
		{ id: "reflections", label: "Reflections", note: "AI, society, and what comes next" },
		{ id: "explainers", label: "Explainers", note: "ideas made simple, in writing then video" },
	],
};

export const heart: BeyondChapter = {
	slug: "heart",
	name: "Heart",
	tagline: "what I love, for no reason",
	summary: "A small book of poems, the games I win and lose on chess.com, and what I keep coming back to.",
	sections: [
		{ id: "poetry", label: "Poetry", note: "a small book, in two languages" },
		{ id: "chess", label: "Chess", note: "live from chess.com" },
		{ id: "inspirations", label: "Inspirations", note: "videos, design, robotics — what stuck with me" },
	],
};

export const chapters: readonly BeyondChapter[] = [mind, heart];
