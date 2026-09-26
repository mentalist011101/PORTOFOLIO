import type { SkillDomain } from "@/types";

export const skillDomains: readonly SkillDomain[] = [
	{
		id: "ai",
		name: "Artificial Intelligence",
		stance: "Models are hypotheses about data. I care about the ones that survive contact with a held-out set.",
		skills: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "Transfer learning"],
		evidence: "Lesson assistant, WhatsApp agent",
		accent: "night",
	},
	{
		id: "xai",
		name: "Knowledge representation & reasoning",
		stance: "Explainability was my way in. What I want to master is the step before it: putting the knowledge inside the system, so an answer can be checked against something.",
		skills: ["Formal Concept Analysis", "Ontologies", "Symbolic reasoning", "Hybrid AI", "SHAP", "Anchors", "Counterfactuals"],
		evidence: "Sangroya et al. (2019) reproduced — see the notes below",
		accent: "sun",
	},
	{
		id: "ai-engineering",
		name: "AI Engineering",
		stance: "Getting a model to production is not a deployment step, it is most of the work.",
		skills: ["RAG", "AI agents", "LLM applications", "MCP", "APIs", "FAISS", "Evaluation harnesses"],
		evidence: "Lesson assistant, WhatsApp agent",
		accent: "azure",
	},
	{
		id: "data-science",
		name: "Data Science",
		stance: "Half of every result comes from deciding what the rows actually mean.",
		skills: ["Exploratory analysis", "Statistical modelling", "SQL", "R", "DAX", "BigQuery", "Feature design"],
		evidence: "E-commerce analysis, Time series decomposition",
		accent: "card",
	},
	{
		id: "engineering",
		name: "Software Engineering",
		stance: "Reproducible beats clever. Anything I cannot run twice I do not trust once.",
		skills: ["Python", "TypeScript", "Node.js", "Docker", "Git", "GitLab", "PostgreSQL", "MongoDB", "Nginx"],
		evidence: "Every project above",
		accent: "card",
	},
];
