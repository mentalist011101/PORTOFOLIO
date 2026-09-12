import { articles, publishedArticles } from "@/data/articles";
import { education } from "@/data/education";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillDomains } from "@/data/skills";
import type { KnowledgeEntry } from "@/types";

const currentDegree = education[0];

/**
 * Answers are composed from the same data the page renders, so replacing a
 * project or an article updates the assistant without touching this file.
 */
export const knowledgeBase: readonly KnowledgeEntry[] = [
	{
		id: "identity",
		topic: "Who Luciano is",
		keywords: ["who", "luciano", "you", "yourself", "about", "introduce", "presentation", "bio", "profile"],
		answer: `${profile.fullName} — ${profile.title}, based in ${profile.location}. ${profile.positioning} His work moved from data analysis towards machine learning, then towards two things he now spends most of his time on: making models explain themselves, and engineering the systems that serve them.`,
		followUps: ["What does he study?", "What are his research interests?", "What has he built?"],
	},
	{
		id: "studies",
		topic: "Academic background",
		keywords: ["study", "studies", "school", "university", "enspy", "degree", "academic", "education", "background", "student", "diploma"],
		answer: `He is in ${currentDegree?.degree ?? "a Master's"} at ${profile.school}, ${profile.university}, in the ${currentDegree?.field ?? "Data Science"} track. He finished Master 1 first of his cohort — GPA 3.59/4.0, 16.58/20 average, 60/60 credits — and the Licence before it also first, with mention Très Bien in both. The full timeline is in the Academic journey section.`,
		followUps: ["What is he researching?", "What certifications does he hold?", "Where is he going next?"],
		link: { label: "See the academic journey", href: "#journey" },
	},
	{
		id: "skills",
		topic: "Skills and technologies",
		keywords: ["skill", "skills", "technology", "technologies", "stack", "tools", "languages", "python", "typescript", "know", "competence", "expertise"],
		answer: `He works across ${skillDomains.length} domains: ${skillDomains.map((domain) => domain.name).join(", ")}. Day to day that means ${skillDomains
			.flatMap((domain) => domain.skills)
			.slice(0, 8)
			.join(", ")} — and the engineering around them: Python, TypeScript, Docker, PostgreSQL, Git.`,
		followUps: ["What projects prove that?", "What does he use for explainability?", "Does he do AI engineering?"],
		link: { label: "See what he builds", href: "#what-i-build" },
	},
	{
		id: "projects",
		topic: "Projects",
		// Pas de "study" ici : la collision avec « what does he study » est plus coûteuse que le gain sur « case study ».
		keywords: ["project", "projects", "built", "build", "portfolio", "case", "made", "created", "app", "repository"],
		answer: `${projects.length} selected projects, each written up as problem → approach → result: ${projects
			.map((project) => `${project.title} (${project.category})`)
			.join(", ")}. The closest to his research interests is ${projects[0]?.title ?? "Sentinel"} — ${projects[0]?.tagline.toLowerCase() ?? ""}.`,
		followUps: ["Tell me about explainable AI", "Does he work with LLMs?", "Where can I find his GitHub?"],
		link: { label: "Open the projects", href: "#projects" },
	},
	{
		id: "research",
		topic: "Research interests",
		keywords: ["research", "interest", "interests", "phd", "thesis", "master", "masters", "topic", "focus", "area", "science"],
		answer: `Explainable AI first: attribution methods, rule-based surrogates, counterfactuals, and structural approaches such as Formal Concept Analysis for describing what a model has learned. Second: retrieval-augmented systems and agents, where the open question is grounding rather than fluency. He is looking for a Master's programme and a lab where those two lines meet.`,
		followUps: ["What has he written about it?", "What is Formal Concept Analysis?", "How can I contact him?"],
		link: { label: "Read the research notes", href: "#research" },
	},
	{
		id: "xai",
		topic: "Explainable AI",
		keywords: ["explainable", "explainability", "interpretability", "interpretable", "shap", "lime", "anchors", "gradients", "attribution", "xai", "counterfactual", "fca", "concept", "lattice"],
		answer: `This is the direction he is pushing towards: SHAP for global structure, Anchors when a high-precision local rule is what a user needs, Integrated Gradients on differentiable models, counterfactual search to answer "what would have had to change", and Formal Concept Analysis as a structural alternative to saliency. Most of that work currently lives in his writing rather than in a shipped product — the research notes are the honest evidence.`,
		followUps: ["What projects use this?", "What articles has he written?", "What does he study?"],
		link: { label: "See the Explainable AI work", href: "#what-i-build" },
	},
	{
		id: "ai-engineering",
		topic: "AI engineering, RAG and agents",
		keywords: ["rag", "agent", "agents", "llm", "mcp", "retrieval", "engineering", "api", "production", "deploy", "vector", "embedding"],
		answer: `He builds the serving side too. The lesson assistant is the reference project: a PDF parser for the official primary curriculum, Gemini embeddings, a PostgreSQL and pgvector store, and a generation agent behind a FastAPI service. The WhatsApp agent is the lighter counterpart — two chained models, a memory and a live search tool, reachable from a phone.`,
		followUps: ["Tell me about Kola", "What technologies does he use?", "What is he writing about?"],
		link: { label: "Open the projects", href: "#projects" },
	},
	{
		id: "articles",
		topic: "Articles and writing",
		keywords: ["article", "articles", "blog", "write", "writing", "written", "publication", "publications", "paper", "papers", "notes", "read"],
		answer: `${publishedArticles.length} published pieces and ${articles.length - publishedArticles.length} in draft, kept as a technical notebook rather than a blog. They include "${articles[0]?.title ?? ""}" and work on attribution methods, retrieval failure modes and Formal Concept Analysis.`,
		followUps: ["What are his research interests?", "Where can I find his GitHub?", "What has he built?"],
		link: { label: "Read the articles", href: "#research" },
	},
	{
		id: "experience",
		topic: "Experience",
		keywords: [
			"experience", "internship", "intern", "job", "work", "professional", "company", "worked",
			"position", "role", "valione", "microsoft", "graph", "365", "tenant", "stage",
		],
		answer: `Six months as an AI engineer at Valione Services, from March to September 2026: backend development of an agent that administers Microsoft 365 environments, and the tool layer through which language models reach Microsoft Graph data. Agentic orchestration, context management, TypeScript and Node.js. It is written up in full in the Experience section.`,
		followUps: ["What projects has he worked on?", "What certifications does he hold?", "How can I contact him?"],
		link: { label: "See the experience", href: "#experience" },
	},
	{
		id: "credentials",
		topic: "Certifications and achievements",
		keywords: ["certification", "certifications", "certificate", "award", "awards", "distinction", "competition", "achievement", "achievements", "prize", "honour", "honor"],
		answer: `Two DataCamp certifications — AI Engineer for Data Scientists Associate and AI Fundamentals — a Data Community Africa scholarship, and participation in the national phase of the Coupe d'Afrique des Nations en Science des Données (DataTour 2025). They are listed compactly in the Credentials section: the projects and the articles carry more weight than the certificates, and the layout says so.`,
		followUps: ["What is his academic background?", "What has he built?", "Where is he going next?"],
		link: { label: "See the credentials", href: "#credentials" },
	},
	{
		id: "github",
		topic: "GitHub",
		keywords: ["github", "code", "repository", "repositories", "repo", "source", "open"],
		answer: `His code lives at github.com/mentalist011101 — project repositories, experiments and the notebooks behind the articles.`,
		followUps: ["What are his best projects?", "How can I contact him?", "Is his CV available?"],
		link: { label: "Open GitHub", href: profile.github },
	},
	{
		id: "contact",
		topic: "Contact",
		keywords: ["contact", "email", "mail", "reach", "linkedin", "hire", "recruit", "talk", "message", "available", "opportunity"],
		answer: `Email is the most reliable route, and LinkedIn works too. He is open to research internships, Master's programmes and AI engineering opportunities — the Contact section at the bottom has every link in one place.`,
		followUps: ["Is his CV available?", "Where is he based?", "What is he looking for?"],
		link: { label: "Go to contact", href: "#contact" },
	},
	{
		id: "cv",
		topic: "CV",
		keywords: ["cv", "resume", "download", "pdf", "curriculum"],
		answer: `The CV is downloadable from the hero section and from the footer, as a PDF.`,
		followUps: ["What is his academic background?", "What experience does he have?", "How can I contact him?"],
		link: { label: "Download the CV", href: profile.cv },
	},
	{
		id: "location",
		topic: "Location",
		keywords: ["where", "based", "location", "country", "cameroon", "yaounde", "yaoundé", "live", "living", "from"],
		answer: `${profile.location}. He studies at ${profile.schoolShort}, ${profile.university}, and is looking to continue his studies abroad at Master's level.`,
		followUps: ["What is he looking for?", "What does he study?", "How can I contact him?"],
	},
	{
		id: "next",
		topic: "What comes next",
		keywords: ["next", "future", "goal", "goals", "looking", "want", "plan", "plans", "ambition", "scholarship", "eiffel", "erasmus", "abroad", "going"],
		answer: `He is finishing Master 2 at ENSPY and looking abroad for the next step: a research-oriented programme in explainable or trustworthy AI — Eiffel, Erasmus and similar routes — then a doctorate if the right subject and supervisor appear. In the meantime: research internships, and finishing the projects that turn interpretability methods into something an engineer can actually deploy.`,
		followUps: ["What is he researching?", "What is his academic background?", "How can I contact him?"],
	},
	{
		id: "meta",
		topic: "How this assistant works",
		keywords: ["how", "this", "work", "works", "chatbot", "assistant", "built", "made", "ai", "gpt", "model", "site", "website", "portfolio"],
		answer: `No API call, no language model — this runs entirely in your browser. Your question is normalised, tokenised and scored against a small local knowledge base built from the same data that renders the page. The engine sits behind a one-function interface, so swapping it for a retrieval-augmented model later changes one file and no components. The site itself is Next.js, TypeScript and Tailwind, statically rendered.`,
		followUps: ["What technologies does he use?", "What has he built?", "Where can I find his GitHub?"],
	},
];

export const suggestedQuestions: readonly string[] = [
	"Who is Luciano?",
	"What are his research interests?",
	"What has he built?",
	"What does he study?",
	"How does this assistant work?",
];

export const fallbackAnswer =
	"I only know what is on this page, and that question is outside it. Try asking about his background, his projects, his research interests, his articles, or how to reach him.";
