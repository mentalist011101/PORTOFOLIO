import type { Badge } from "@/types";

/**
 * Réel — titres, émetteurs et dates lus sur les certificats déposés dans
 * public/images/badges. Du plus récent au plus ancien.
 */
export const badges: readonly Badge[] = [
	{
		id: "ms-azure-networking",
		title: "Describe Azure networking services",
		issuer: "Microsoft Learn",
		date: "2026-06-10",
		image: "/images/badges/ms-azure-networking.jpeg",
		certificate: "/images/badges/ms-azure-networking.pdf",
	},
	{
		id: "ms-powerbi-prepare-data",
		title: "Prepare data for analysis with Power BI",
		issuer: "Microsoft Learn",
		date: "2025-04-28",
		image: "/images/badges/ms-powerbi-prepare-data.jpeg",
		certificate: "/images/badges/ms-powerbi-prepare-data.pdf",
		verifyUrl:
			"https://learn.microsoft.com/api/achievements/share/en-us/FOKOUOSAADIELUCIANO-7459/YEMXE9CR?sharingId=84C400DF187280F4",
	},
	{
		id: "ibm-ai-fundamentals",
		title: "Artificial Intelligence Fundamentals",
		issuer: "IBM SkillsBuild",
		date: "2025-02-10",
		image: "/images/badges/ibm-ai-fundamentals.jpeg",
		certificate: "/images/badges/ibm-ai-fundamentals.pdf",
		verifyUrl: "https://www.credly.com/badges/aa5dc4ce-b215-4035-98dc-fcab2a8707e9",
	},
	{
		id: "ms-model-deployment",
		title: "Design a model deployment solution",
		issuer: "Microsoft Learn",
		date: "2025-02-04",
		image: "/images/badges/ms-model-deployment.jpeg",
		certificate: "/images/badges/ms-model-deployment.pdf",
		verifyUrl:
			"https://learn.microsoft.com/api/achievements/share/en-us/FOKOUOSAADIELUCIANO-7459/UYJQGXC3?sharingId=84C400DF187280F4",
	},
	{
		id: "cisco-intro-data-science",
		title: "Introduction to Data Science",
		issuer: "Cisco Networking Academy",
		date: "2025-02-04",
		image: "/images/badges/cisco-intro-data-science.jpeg",
		certificate: "/images/badges/cisco-intro-data-science.pdf",
	},
	{
		id: "ms-ml-ops-solution",
		title: "Design a machine learning operations solution",
		issuer: "Microsoft Learn",
		date: "2025-01-24",
		image: "/images/badges/ms-ml-ops-solution.jpeg",
		certificate: "/images/badges/ms-ml-ops-solution.pdf",
		verifyUrl:
			"https://learn.microsoft.com/api/achievements/share/en-us/FOKOUOSAADIELUCIANO-7459/HASB73X8?sharingId=84C400DF187280F4",
	},
	{
		id: "ms-ml-model-training",
		title: "Design a machine learning model training solution",
		issuer: "Microsoft Learn",
		date: "2025-01-23",
		image: "/images/badges/ms-ml-model-training.jpeg",
		certificate: "/images/badges/ms-ml-model-training.pdf",
		verifyUrl:
			"https://learn.microsoft.com/api/achievements/share/en-us/FOKOUOSAADIELUCIANO-7459/FV6BTE7X?sharingId=84C400DF187280F4",
	},
	{
		id: "ms-ml-data-ingestion",
		title: "Design a data ingestion strategy for machine learning projects",
		issuer: "Microsoft Learn",
		date: "2025-01-23",
		image: "/images/badges/ms-ml-data-ingestion.jpeg",
		certificate: "/images/badges/ms-ml-data-ingestion.pdf",
		verifyUrl:
			"https://learn.microsoft.com/api/achievements/share/en-us/FOKOUOSAADIELUCIANO-7459/AP3TG2V7?sharingId=84C400DF187280F4",
	},
];
