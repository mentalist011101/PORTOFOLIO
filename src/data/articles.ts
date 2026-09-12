import type { Article } from "@/types";

/**
 * Les deux premiers articles sont réels et publiés sur le blog IREX.
 * Les suivants sont des sujets annoncés (`demo: true`, statut draft) :
 * remplace-les par tes vraies notes ou supprime-les.
 */
export const articles: readonly Article[] = [
	{
		id: "nlp-cest-quoi",
		demo: false,
		featured: true,
		title: "Le NLP, c'est quoi ?",
		abstract:
			"A long-form French introduction to natural language processing: where the field comes from since 1954, how tokenisation and embeddings turn text into something a model can work with, what the Transformer changed, and where the ethical stakes actually sit. Published on the IREX blog.",
		date: "2025-07-21",
		category: "NLP",
		tags: ["NLP", "Transformers", "Embeddings", "IREX", "French"],
		readingTime: 15,
		status: "published",
		url: "https://www.irex.aretex.ca/blog/lintelligence-artificielle/le-nlp-c%E2%80%99est-quoi-comprendre-comment-l%E2%80%99ia-traite-le-langage-humain",
	},
	{
		id: "gitlab-branching",
		demo: false,
		featured: true,
		title: "Bonnes pratiques de gestion des branches GitLab",
		abstract:
			"A branch model a team can actually agree on: main, rc and develop, the naming conventions that go with them, and the merge-request rules that keep production out of reach of an unreviewed commit. Published on the IREX blog.",
		date: "2025-08-21",
		category: "DevOps",
		tags: ["GitLab", "Git", "DevOps", "IREX", "French"],
		readingTime: 3,
		status: "published",
		url: "https://www.irex.aretex.ca/blog/devops/bonnes-pratiques-de-gestion-des-branches-gitlab",
	},
	{
		id: "demo-article-integrated-gradients",
		demo: true,
		featured: false,
		title: "Integrated Gradients, one axiom at a time",
		abstract:
			"Planned note — why completeness and sensitivity are the two properties worth caring about, how the baseline quietly decides your explanation, and what a bad baseline looks like.",
		date: "2026-02-10",
		category: "Explainable AI",
		tags: ["Integrated Gradients", "Deep Learning", "Attribution"],
		readingTime: 10,
		status: "draft",
		url: "#research",
	},
	{
		id: "demo-article-retrieval",
		demo: true,
		featured: false,
		title: "What retrieval actually retrieves",
		abstract:
			"Planned note — failure modes of RAG systems: chunk boundaries that cut arguments in half, embeddings that confuse topic with answer, and evaluations that measure fluency instead of grounding.",
		date: "2026-03-04",
		category: "AI Engineering",
		tags: ["RAG", "Retrieval", "Evaluation"],
		readingTime: 11,
		status: "draft",
		url: "#research",
	},
	{
		id: "demo-article-fca",
		demo: true,
		featured: false,
		title: "Formal Concept Analysis as a lens on model behaviour",
		abstract:
			"Planned note — a lattice is a strange thing to hand a machine learning engineer; this one is an attempt to explain why it is worth the detour when you want structure rather than saliency.",
		date: "2026-04-15",
		category: "Research notes",
		tags: ["FCA", "Interpretability", "Theory"],
		readingTime: 14,
		status: "draft",
		url: "#research",
	},
];

export const publishedArticles = articles.filter((article) => article.status === "published");
