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
		field: "Digital Humanities — Data Science",
		start: "2026",
		end: "2027 (in progress)",
		description:
			"Final year of the Master's programme, oriented towards artificial intelligence: building systems that serve models, and making those models account for their decisions.",
		highlights: [
			"Research direction: explainability and model interpretation",
			"Applied work on retrieval-augmented systems and AI agents",
		],
	},
	{
		id: "master-1",
		demo: false,
		institution: "École Nationale Supérieure Polytechnique de Yaoundé",
		location: "Yaoundé, Cameroon",
		degree: "Master 1",
		field: "Digital Humanities — Data Science",
		start: "2025",
		end: "2026",
		distinction: "Mention Très Bien · ranked 1st",
		description:
			"First year of the Master's programme, completed with 60/60 credits, a GPA of 3.59/4.0 and a 16.58/20 average — first of the cohort. The same period covered the six-month AI engineering internship at Valione Services.",
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
		field: "Digital Humanities — Data Science",
		start: "2022",
		end: "2025",
		distinction: "Mention Très Bien · ranked 1st of 17",
		description:
			"Three-year degree combining mathematics, computer science and the legal and organisational side of data work. Final year completed with 60/60 credits and a GPA of 3.22/4.0.",
		highlights: [
			"Operations research 19.56/20 · mathematical modelling 19.70/20",
			"Deep learning 17.80/20 · query evaluation and optimisation 17.45/20",
			"Machine learning, databases, Python for data science, inferential statistics",
			"Information systems audit, big data law, data storytelling",
		],
	},
];
