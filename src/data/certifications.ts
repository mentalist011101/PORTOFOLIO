import type { Credential } from "@/types";

/** Réel — lu sur tes attestations. Vérifie l'année de la bourse DCA. */
export const credentials: readonly Credential[] = [
	{
		id: "datacamp-ai-engineer-associate",
		demo: false,
		title: "AI Engineer for Data Scientists Associate",
		issuer: "DataCamp",
		year: "2026",
		kind: "certification",
		note: "Certified on 5 March 2026 — AEDS0014759833516.",
		url: "/images/credential-datacamp-ai-engineer.jpeg",
		image: "/images/credential-datacamp-ai-engineer.jpeg",
	},
	{
		id: "datacamp-ai-fundamentals",
		demo: false,
		title: "AI Fundamentals",
		issuer: "DataCamp",
		year: "2026",
		kind: "certification",
		note: "Certified on 1 February 2026 — AIF0028944960490.",
		url: "/images/credential-datacamp-ai-fundamentals.jpeg",
		image: "/images/credential-datacamp-ai-fundamentals.jpeg",
	},
	{
		id: "dca-datacamp-scholarship",
		demo: false,
		// TODO: confirmer l'année d'obtention.
		title: "DCA × DataCamp scholarship",
		issuer: "Data Community Africa",
		year: "2026",
		kind: "award",
		note: "Scholarship granting full access to the DataCamp platform.",
		url: "/images/credential-dca-scholarship.jpeg",
		image: "/images/credential-dca-scholarship.jpeg",
	},
	{
		id: "cansd-datatour-2025",
		demo: false,
		title: "Coupe d'Afrique des Nations en Science des Données — national phase",
		issuer: "Data Afrique Hub · DataTour 2025",
		year: "2025",
		kind: "competition",
		note: "Africa-wide data science cup; active participation from 11 October to 1 November 2025, Cameroon.",
		url: "/images/credential-cansd-datatour.jpeg",
		image: "/images/credential-cansd-datatour.jpeg",
	},
];

