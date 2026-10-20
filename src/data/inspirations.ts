import type { Inspiration } from "@/types";

// Une entrée = une chaîne de la télé. `youtube` : ce qui suit `v=` dans l'adresse de la vidéo.
export const inspirations: readonly Inspiration[] = [
	{
		id: "neural-network-3b1b",
		demo: true,
		kind: "video",
		youtube: "aircAruvnKk",
		title: "But what is a neural network?",
		by: "3Blue1Brown",
		topic: "ai",
		note: "Placeholder — replace with a video that marked me, and one or two lines on why it stuck.",
		lang: "en",
	},
	{
		id: "do-you-love-me",
		demo: true,
		kind: "video",
		youtube: "fn3KWM1kuAw",
		title: "Do You Love Me?",
		by: "Boston Dynamics",
		topic: "robotics",
		note: "Placeholder — the robotics video I keep coming back to, and what it changed in how I see machines.",
		lang: "en",
	},
	{
		id: "good-design-rams",
		demo: true,
		kind: "link",
		url: "https://www.vitsoe.com/us/about/good-design",
		title: "Ten principles for good design",
		by: "Dieter Rams",
		topic: "design",
		note: "Placeholder — a design reference that shaped my taste, and the principle I would keep if I could keep only one.",
		lang: "en",
	},
];
