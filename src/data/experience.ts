import type { ExperienceEntry } from "@/types";

/**
 * Réel — attestation de fin de stage signée par Valione Services.
 * Dates reprises du document officiel : 23 mars → 22 septembre 2026.
 */
export const experience: readonly ExperienceEntry[] = [
	{
		id: "valione-services",
		demo: false,
		organisation: "Valione Services",
		organisationUrl: "https://valione-services.com/en/",
		position: "AI Engineer intern",
		kind: "Six-month internship",
		location: "Yaoundé, Cameroon",
		start: "Mar 2026",
		end: "Sep 2026",
		description:
			"Backend development of an AI agent that administers Microsoft 365 environments. The interesting part was not the model: it was deciding what a language model is allowed to see and do inside a tenant, and making the tools it calls describable enough to be used correctly.",
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
];
