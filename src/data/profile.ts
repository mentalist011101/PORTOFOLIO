export const profile = {
	firstName: "Luciano",
	fullName: "Luciano Fokouo Saadie",
	title: "AI Engineer & Data Scientist",
	school: "ENSPY — École Nationale Supérieure Polytechnique de Yaoundé",
	schoolShort: "ENSPY",
	university: "Université de Yaoundé I",
	location: "Yaoundé, Cameroon",
	positioning: "I build intelligent systems that connect data, models and the reasons behind their decisions.",
	/** PLACEHOLDER — replace with your own words. */
	intro: [
		"I am a Master's student in Digital Humanities and Data Science at ENSPY, working at the point where data science stops being a notebook and starts being a system. My path began with statistics and data analysis, moved through machine learning and deep learning, and now leans towards two questions that keep me busy: how do we make a model explain itself, and how do we ship it so that someone can actually rely on it.",
		"Explainability is not a compliance checkbox to me. A model that cannot be interrogated cannot be trusted, corrected, or taught from. I spend most of my technical reading on attribution methods, rule-based surrogates and the formal structures — concept lattices among them — that let us describe what a model has learned in terms a human can argue with.",
		"The other half of my work is engineering: retrieval pipelines, agents, APIs, evaluation harnesses. A research idea that cannot be reproduced or served is an unfinished idea, so I try to close that loop myself.",
	],
	focus: [
		"Explainable AI and model interpretation",
		"Retrieval-augmented systems and AI agents",
		"Applied machine learning for local problems",
	],
	portrait: "/images/portrait.jpeg",
	avatar: "/images/avatar.jpeg",
	enspyLogo: "/images/enspy-logo.jpeg",
	email: "lucianofokouosaadie@gmail.com",
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
