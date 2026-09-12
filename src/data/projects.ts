import type { Project } from "@/types";

/**
 * Les quatre premiers projets sont réels : titres, technologies et captures
 * viennent de tes propres travaux. Les textes problem / approach / result sont
 * des brouillons rédigés à partir du code et des captures — à relire et
 * corriger avant publication.
 *
 * Le dernier (`demo: true`) est un emplacement gardé pour ton projet XAI.
 */
export const projects: readonly Project[] = [
	{
		id: "lesson-assistant",
		demo: false,
		featured: true,
		title: "Lesson planning assistant",
		tagline: "An agent grounded in the official primary-school curriculum",
		summary:
			"A retrieval-augmented assistant that helps Cameroonian primary school teachers write their lesson sheets, anchored on the official curriculum and open pedagogical resources rather than on a model's general knowledge.",
		problem:
			"Primary school teachers write every lesson sheet by hand, following a strict APC template, while the reference material — curriculum, canevas, protocols — is scattered across PDFs nobody can search. A general-purpose chatbot produces sheets that look right and cite nothing.",
		approach:
			"A PDF parser that reliably extracts the header metadata of real lesson sheets (competence, domain, discipline, title, OPR, OPO) and keeps the step table as raw text, Gemini embeddings, and a PostgreSQL + pgvector store. Ingestion runs end to end: parse, upsert disciplines and units, vectorise in batches, store. Generation sits behind a FastAPI service with a LangGraph agent.",
		result:
			"The parser is validated on a real document and the ingestion pipeline runs end to end; the generation agent and the FastAPI layer are the current work. The UI prototype already walks a teacher from class and discipline down to a titled, timed lesson.",
		category: "AI Agents",
		status: "in-progress",
		period: "2026 — present",
		technologies: ["Python", "PostgreSQL", "pgvector", "Gemini embeddings", "FastAPI", "LangGraph", "Streamlit"],
		image: "/images/project-lesson-assistant.jpeg",
		githubUrl: "https://github.com/mentalist011101/edu-lesson-ai",
	},
	{
		id: "whatsapp-agent",
		demo: false,
		featured: true,
		title: "WhatsApp research agent",
		tagline: "Two chained agents, a memory and a search tool, reachable from a phone",
		summary:
			"An automation experiment: a WhatsApp conversation routed through two chained LLM agents, one holding the conversation memory, the other equipped with a live web-search tool.",
		problem:
			"Most assistants live behind a web app nobody opens twice. The interface people here actually use all day is WhatsApp — and a single model with no memory and no access to current information cannot hold a useful conversation there.",
		approach:
			"An n8n workflow triggered by incoming WhatsApp messages. The first agent runs on Groq with a conversational memory node; the second runs on Google Gemini and can call a SerpApi Google search when the question needs facts the model does not hold. The reply goes back through the same channel.",
		result:
			"A working end-to-end loop from message to grounded answer, and a concrete lesson on where the orchestration breaks: model fallbacks and tool timeouts matter more than prompt wording.",
		category: "AI Agents",
		status: "shipped",
		period: "2026",
		technologies: ["n8n", "Groq", "Google Gemini", "SerpApi", "WhatsApp API"],
		image: "/images/project-whatsapp-agent.jpeg",
		githubUrl: "https://github.com/mentalist011101",
	},
	{
		id: "ecommerce-bigquery",
		demo: false,
		featured: true,
		title: "E-commerce data warehouse",
		tagline: "Dimensional modelling under BigQuery Sandbox constraints",
		summary:
			"A small analytical warehouse built from public e-commerce data: dimensional modelling, BigQuery optimisation, and an exploratory sales analysis published in Looker Studio.",
		problem:
			"Raw order events answer no business question on their own, and a naive query over a large sales table is both slow and expensive. The Sandbox tier makes that explicit — no billing, hard quotas, so the layout of the table is the only lever left.",
		approach:
			"Applied dimensional modelling to public e-commerce data, then optimised for the engine: a clustered fact table so the recurring filters — date, product, user — scan only what they need, everything within what the Sandbox mode allows. The analysis is written in SQL and published as a Looker Studio report rather than kept in a notebook only I could run.",
		result:
			"A warehouse whose scanned bytes stay proportional to the question asked, and a sales report anyone can open and filter without touching the SQL.",
		category: "Data Science",
		status: "shipped",
		period: "2025",
		technologies: ["BigQuery", "SQL", "Looker Studio", "Dimensional modelling", "Clustering"],
		image: "/images/project-ecommerce-bigquery.jpeg",
		githubUrl:
			"https://github.com/mentalist011101/Conception-et-optimisation-d-un-data-warehouse-analytique-e-commerce-sur-BigQuery-Sandbox-",
	},
	{
		id: "electricity-forecast-uk",
		demo: false,
		featured: false,
		title: "UK electricity demand",
		tagline: "Separating what repeats from what is left to explain",
		summary:
			"A time series study of electricity consumption in Great Britain: decomposing six years of half-hourly demand, then reading the residuals for what the seasonal model does not capture.",
		problem:
			"A demand series that swings by thousands of megawatts every single day tells you nothing by eye. Fitting a forecaster before understanding that structure is how people end up modelling a calendar and calling it a prediction.",
		approach:
			"Seasonal decomposition of the 2015–2021 series, then systematic analysis of the residuals — variance changes, isolated spikes, regime shifts — to decide what belongs in a forecasting model and what is a measurement artefact.",
		result:
			"A clean separation of the periodic component from the residual, and a shortlist of anomalies worth investigating before any forecasting model is fitted to the series.",
		category: "Data Science",
		status: "shipped",
		period: "2025",
		technologies: ["Python", "pandas", "statsmodels", "matplotlib", "Google Colab"],
		image: "/images/project-time-series.jpeg",
		githubUrl: "https://github.com/mentalist011101/electricity-forecast-uk",
	},
	{
		id: "demo-project-xai",
		demo: true,
		featured: false,
		title: "Sentinel",
		tagline: "Reason codes for a credit model that used to say only yes or no",
		summary:
			"PLACEHOLDER — emplacement gardé pour ton projet d'explicabilité. Remplace cette entrée dans src/data/projects.ts ou supprime-la.",
		problem:
			"A gradient-boosted scoring model performed well on paper but returned a single number. Loan officers could not justify a refusal to an applicant, and analysts could not tell a data problem from a model problem.",
		approach:
			"Kept the strong model and wrapped it: SHAP values for global structure, Anchors for the high-precision local rules, and a small counterfactual search answering 'what would have had to change'. The three views are reconciled into a stable reason-code vocabulary and served behind one endpoint.",
		result:
			"Every decision carries ranked reason codes and one actionable counterfactual, and the explanation layer surfaced two leaking features that had gone unnoticed in validation.",
		category: "Explainable AI",
		status: "research",
		period: "2026",
		technologies: ["Python", "scikit-learn", "SHAP", "Anchors", "FastAPI"],
		githubUrl: "https://github.com/mentalist011101",
	},
];

export const featuredProjects = projects.filter((project) => project.featured);
