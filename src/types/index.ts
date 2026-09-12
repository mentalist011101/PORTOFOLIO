export type ProjectCategory =
	| "Explainable AI"
	| "AI Agents"
	| "Computer Vision"
	| "NLP"
	| "Machine Learning"
	| "Data Science";

export type ProjectStatus = "shipped" | "in-progress" | "research";

export interface Project {
	readonly id: string;
	/** true = placeholder content, safe to delete or overwrite. */
	readonly demo: boolean;
	readonly featured: boolean;
	readonly title: string;
	readonly tagline: string;
	readonly summary: string;
	readonly problem: string;
	readonly approach: string;
	readonly result: string;
	readonly category: ProjectCategory;
	readonly status: ProjectStatus;
	readonly period: string;
	readonly technologies: readonly string[];
	readonly githubUrl?: string;
	readonly demoUrl?: string;
	readonly image?: string;
}

export type ArticleStatus = "published" | "draft";

export interface Article {
	readonly id: string;
	readonly demo: boolean;
	readonly featured: boolean;
	readonly title: string;
	readonly abstract: string;
	readonly date: string;
	readonly category: string;
	readonly tags: readonly string[];
	readonly readingTime: number;
	readonly status: ArticleStatus;
	readonly url: string;
	readonly image?: string;
}

export interface Repository {
	readonly id: string;
	readonly name: string;
	readonly label: string;
	readonly description: string;
	readonly language: string;
	readonly field: string;
	readonly url: string;
}

export interface GalleryItem {
	readonly id: string;
	readonly src: string;
	readonly alt: string;
	readonly caption: string;
	readonly href?: string;
	readonly ratio: "portrait" | "square" | "wide";
}

export interface SkillDomain {
	readonly id: string;
	readonly name: string;
	readonly stance: string;
	readonly skills: readonly string[];
	readonly evidence: string;
	readonly accent: "card" | "sun" | "azure" | "night";
}

export interface EducationEntry {
	readonly id: string;
	readonly demo: boolean;
	readonly institution: string;
	readonly location: string;
	readonly degree: string;
	readonly field: string;
	readonly start: string;
	readonly end: string;
	readonly distinction?: string;
	readonly description: string;
	readonly highlights: readonly string[];
}

export interface ExperienceEntry {
	readonly id: string;
	readonly demo: boolean;
	readonly organisation: string;
	readonly organisationUrl?: string;
	readonly position: string;
	readonly kind: string;
	readonly location: string;
	readonly start: string;
	readonly end: string;
	readonly description: string;
	readonly responsibilities: readonly string[];
	readonly achievements: readonly string[];
	readonly technologies: readonly string[];
}

export type CredentialKind = "certification" | "programme" | "competition" | "award";

export interface Credential {
	readonly id: string;
	readonly demo: boolean;
	readonly title: string;
	readonly issuer: string;
	readonly year: string;
	readonly kind: CredentialKind;
	readonly note?: string;
	readonly url?: string;
	readonly image?: string;
}

export interface KnowledgeEntry {
	readonly id: string;
	readonly topic: string;
	readonly keywords: readonly string[];
	readonly answer: string;
	readonly followUps: readonly string[];
	readonly link?: { readonly label: string; readonly href: string };
}
