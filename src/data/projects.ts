import type { Project } from "@/types";

/**
 * Les cinq projets sont réels : titres, technologies et captures viennent de
 * tes propres travaux. Les textes problem / approach / result sont des
 * brouillons rédigés à partir du code et des captures — à relire et corriger
 * avant publication.
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
			"I taught CM1–CM2 myself for a year before this. Every lesson sheet gets written by hand, following a strict APC template, while the reference material — curriculum, canevas, protocols — is scattered across PDFs nobody can search. A general-purpose chatbot produces sheets that look right and cite nothing.",
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
		id: "legal-assistant",
		demo: false,
		featured: false,
		title: "Legal Assistant",
		tagline: "Querying dense legal texts by retrieval instead of by memory — corpus phase",
		summary:
			"A retrieval-augmented assistant for querying legal texts in plain language, currently in the corpus-building phase, before the retrieval and generation pipeline goes in.",
		problem:
			"Legal texts are long, cross-referenced and unforgiving of imprecision. Finding the clause that actually answers a question means reading past everything that almost answers it.",
		approach:
			"The plan: split and embed the legal corpus, index it in FAISS, and retrieve by similarity before generation, so the model answers from the passages it was actually given rather than from what it remembers about the law. The current work is the corpus itself — collecting and structuring the texts the system will eventually query.",
		result:
			"Not yet a working assistant. The corpus is being assembled; retrieval and generation come next.",
		category: "NLP",
		status: "in-progress",
		period: "2025 — present",
		technologies: ["Python", "Embeddings", "FAISS", "RAG", "LLM"],
	},
];

export const featuredProjects = projects.filter((project) => project.featured);
