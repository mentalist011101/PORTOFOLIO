export const profile = {
	firstName: "Luciano",
	fullName: "Luciano Fokouo Saadie",
	title: "AI Engineer & Data Scientist",
	school: "ENSPY — École Nationale Supérieure Polytechnique de Yaoundé",
	schoolShort: "ENSPY",
	university: "Université de Yaoundé I",
	location: "Yaoundé, Cameroon",
	positioning: "I build AI systems whose answers can be checked: language-model applications grounded in explicit knowledge and automated reasoning, for domains where a wrong answer costs something.",
	intro: [
		"I am a Master's student in Engineering Sciences — Data Science at ENSPY, and an AI engineer in practice. Most of what I have built so far is the serving side of language models: retrieval pipelines and agents that have to answer from a source rather than from what the model happens to remember.",
		"Building those systems is what pushed me towards knowledge representation and automated reasoning. Explainability was my way in — attribution methods, Anchors, then Formal Concept Analysis — and it taught me its own limit: an explanation produced after the fact does not make a system reliable. What makes an answer checkable is the knowledge the system carries and the reasoning it can be held to.",
		"That is the direction I work in now: hybrid systems, symbolic structure alongside learned models, for domains where a wrong answer costs something — law first. The aim is R&D in hybrid AI, then a doctorate.",
	],
	focus: [
		"Knowledge representation and automated reasoning",
		"Language models grounded in explicit knowledge",
		"Verifiable answers in high-stakes domains, starting with law",
	],
	portrait: "/images/portrait.jpeg",
	avatar: "/images/avatar.jpeg",
	enspyLogo: "/images/enspy-logo.jpeg",
	email: "fokouosaadieluciano@gmail.com",
	github: "https://github.com/mentalist011101",
	blog: "https://www.irex.aretex.ca/blog",
	linkedin: "https://www.linkedin.com/in/luciano-fokouo-saadie-luciano/",
	cv: "/cv/luciano-fokouo-saadie-cv.pdf",
	siteUrl: "https://portofolio-drab-rho.vercel.app",
} as const;

export const navigation = [
	{ id: "about", label: "About" },
	{ id: "what-i-build", label: "What I build" },
	{ id: "projects", label: "Projects" },
	{ id: "research", label: "Research" },
	{ id: "journey", label: "Journey" },
	{ id: "ask", label: "Ask Luciano" },
] as const;
