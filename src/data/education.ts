import { thesis } from "@/data/thesis";
import type { EducationEntry } from "@/types";

/**
 * Réel — repris du relevé de notes ENSPY (filière Humanités Numériques —
 * Data Science). Le Master 1 attend encore ses résultats : voir le TODO.
 */
export const education: readonly EducationEntry[] = [
	{
		id: "master-2",
		demo: false,
		institution: "École Nationale Supérieure Polytechnique de Yaoundé",
		location: "Yaoundé, Cameroon",
		degree: "Master 2",
		field: "Engineering Sciences — Data Science (Digital Humanities)",
		start: "2026",
		end: "2027 (in progress)",
		description:
			"Final year of the Master's programme, oriented towards knowledge representation and reasoning: building systems whose answers can be traced back to something explicit rather than to a model's memory. Dissertation defence is scheduled for August 2027.",
		highlights: [
			`Dissertation: « ${thesis.title} », supervised by ${thesis.supervisors.join(" and ")}`,
			"Research direction: knowledge representation, symbolic reasoning and hybrid AI",
			"Independent reproduction of Sangroya et al. (2019) — FCA and an ontology to explain an LSTM",
			"Applied work on retrieval-augmented systems and AI agents",
		],
	},
	{
		id: "master-1",
		demo: false,
		institution: "École Nationale Supérieure Polytechnique de Yaoundé",
		location: "Yaoundé, Cameroon",
		degree: "Master 1",
		field: "Engineering Sciences — Data Science (Digital Humanities)",
		start: "2025",
		end: "2026",
		distinction: "Mention Très Bien · ranked 1st",
		description:
			"First year of the Master's programme, completed with 60/60 credits, a GPA of 3.59/4.0 and a 16.58/20 average — first of the cohort. The same period covered the start of the AI engineering internship at Valione Services.",
		metrics: [
			{ label: "Rank", value: "1st" },
			{ label: "Average", value: "16.58/20" },
			{ label: "GPA", value: "3.59/4.0" },
			{ label: "Credits", value: "60/60" },
		],
		highlights: [
			"Advanced algorithms 19.40/20 · knowledge engineering 19.28/20",
			"Learning from digital data 18.70/20 · data warehousing 18.15/20",
			"Business intelligence and big data 17.88/20 · linear models and design of experiments 17.50/20",
			"Bayesian statistics, factor analysis, discriminant analysis, information retrieval",
		],
	},
	{
		id: "licence",
		demo: false,
		institution: "École Nationale Supérieure Polytechnique de Yaoundé",
		location: "Yaoundé, Cameroon",
		degree: "Licence (BSc)",
		field: "Engineering Sciences — Data Science (Digital Humanities)",
		start: "2022",
		end: "2025",
		distinction: "Mention Très Bien · 1st of 17 in L3",
		description:
			"Three-year degree combining mathematics, computer science and the legal and organisational side of data work. Final year completed with 60/60 credits and a GPA of 3.22/4.0.",
		metrics: [
			{ label: "L1 rank", value: "3rd of 62" },
			{ label: "L2 rank", value: "5th of 52" },
			{ label: "L3 rank", value: "1st of 17" },
			{ label: "GPA (L3)", value: "3.22/4.0" },
		],
		highlights: [
			"Operations research 19.56/20 · mathematical modelling 19.70/20",
			"Deep learning 17.80/20 · query evaluation and optimisation 17.45/20",
			"Machine learning, databases, Python for data science, inferential statistics",
			"Information systems audit, big data law, data storytelling",
		],
	},
];
