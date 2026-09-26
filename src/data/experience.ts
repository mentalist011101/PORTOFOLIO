import type { ExperienceEntry } from "@/types";

/**
 * Réel — Valione : stage professionnel démarré le 23 mars 2026, prolongé au-delà
 * des 6 mois initiaux ; toujours en poste. IREX : stage de 3 mois, terminé.
 */
export const experience: readonly ExperienceEntry[] = [
	{
		id: "valione-services",
		demo: false,
		organisation: "Valione Services",
		organisationUrl: "https://valione-services.com/en/",
		position: "AI Engineer",
		kind: "Professional internship, ongoing",
		location: "Yaoundé, Cameroon",
		start: "Mar 2026",
		end: "Present",
		description:
			"Started in March 2026 as a six-month professional internship, extended since and still running alongside the Master's. Backend development of an AI agent that administers Microsoft 365 environments. The interesting part was not the model: it was deciding what a language model is allowed to see and do inside a tenant, and making the tools it calls describable enough to be used correctly.",
		responsibilities: [
			"Built the backend of an agent automating Microsoft 365 administration",
			"Designed the tools through which language models reach and exploit Microsoft Graph data",
			"Worked on agentic orchestration, context management and model integration",
		],
		achievements: [
			"A tool layer over Microsoft Graph that a model can call without being told the API shape in the prompt",
			"Context handling that keeps a long administrative conversation usable rather than truncated",
		],
		technologies: [
			"TypeScript",
			"Node.js",
			"Microsoft Graph",
			"MCP",
			"Claude",
			"OpenAI",
			"Prisma",
			"PostgreSQL",
			"Azure",
		],
	},
	{
		id: "irex",
		demo: false,
		organisation: "IREX",
		organisationUrl: "https://www.irex.aretex.ca/",
		position: "AI developer intern",
		kind: "Three-month internship",
		location: "Yaoundé, Cameroon",
		start: "Jun 2025",
		end: "Aug 2025",
		description:
			"Design, vector indexing and containerised deployment of a retrieval-augmented system for querying internal documents through an LLM. The same internship is why the two articles below carry an IREX byline — writing them up was part of the job.",
		responsibilities: [
			"Built the RAG pipeline: document ingestion, vector indexing and retrieval with RAGFlow",
			"Containerised the service and put it behind Nginx",
			"Set up a GitLab CI/CD pipeline for the deployment",
		],
		achievements: [
			"A document-querying assistant deployed and reachable, not just demoed locally",
			"Two technical articles published on the IREX blog, including the NLP piece linked in Research",
		],
		technologies: ["RAGFlow", "LLM", "Docker", "Nginx", "GitLab CI/CD"],
	},
];
