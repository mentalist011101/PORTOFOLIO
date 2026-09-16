import type { Article } from "@/types";

/**
 * Les deux premiers articles sont réels et publiés sur le blog IREX.
 * Les suivants sont des sujets annoncés (`demo: true`, statut draft) :
 * remplace-les par tes vraies notes ou supprime-les.
 */
export const articles: readonly Article[] = [
	{
		id: "nlp-cest-quoi",
		demo: false,
		featured: true,
		title: "Le NLP, c'est quoi ?",
		abstract:
			"A long-form French introduction to natural language processing: where the field comes from since 1954, how tokenisation and embeddings turn text into something a model can work with, what the Transformer changed, and where the ethical stakes actually sit. Published on the IREX blog.",
		date: "2025-07-21",
		category: "NLP",
		tags: ["NLP", "Transformers", "Embeddings", "IREX", "French"],
		readingTime: 15,
		status: "published",
		url: "https://www.irex.aretex.ca/blog/lintelligence-artificielle/le-nlp-c%E2%80%99est-quoi-comprendre-comment-l%E2%80%99ia-traite-le-langage-humain",
	},
	{
		id: "gitlab-branching",
		demo: false,
		featured: true,
		title: "Bonnes pratiques de gestion des branches GitLab",
		abstract:
			"A branch model a team can actually agree on: main, rc and develop, the naming conventions that go with them, and the merge-request rules that keep production out of reach of an unreviewed commit. Published on the IREX blog.",
		date: "2025-08-21",
		category: "DevOps",
		tags: ["GitLab", "Git", "DevOps", "IREX", "French"],
		readingTime: 3,
		status: "published",
		url: "https://www.irex.aretex.ca/blog/devops/bonnes-pratiques-de-gestion-des-branches-gitlab",
	},
	{
		id: "fca-supervised-classification",
		demo: false,
		featured: false,
		title: "Supervised classification with Formal Concept Analysis, mechanism by mechanism",
		abstract:
			"Following Azibi, Meddouri and Maddouri's survey, this rebuilds by hand — on one shared mini-dataset — how each family of FCA-based classifiers (complete-lattice methods like GRAND and GALOIS, sub-lattice methods like LEGAL, concept-cover methods like MDL/Krimp) handles the same ambiguous, multi-class instance. A worked MDL example ends in a confident, traceably wrong classification: compressing a class well is not the same as discriminating between classes.",
		date: "2026-09-04",
		category: "Research notes",
		tags: ["FCA", "Classification", "Interpretability"],
		readingTime: 9,
		status: "published",
		url: "/research/presentation_fca_classification.pdf",
	},
	{
		id: "fca-xai-sangroya-reproduction",
		demo: false,
		featured: false,
		title: "Formal Concept Analysis to explain a black-box model — reproducing Sangroya et al. (2019)",
		abstract:
			"A full, independent reproduction of Sangroya, Anantaram, Rawat and Rastogi's framework for explaining a diabetes-prediction LSTM through FCA and a domain ontology — six points the paper leaves unspecified, from the LSTM architecture to the classification rule, each resolved and documented. The paper's own preprocessing numbers turn out to be unreachable (no combination of its stated cleaning steps reaches its claimed sample count); the reproduction still lands on the same qualitative profile as the paper — FCA beats the model on recall, loses on precision — with different absolute numbers, which is itself the finding: symbolic fidelity to a black box is sensitive to choices the source paper never fixes.",
		date: "2026-08-24",
		category: "Explainable AI",
		tags: ["FCA", "XAI", "Reproducibility", "Deep Learning"],
		readingTime: 11,
		status: "published",
		url: "/research/presentation_fca_xai.pdf",
	},
	{
		id: "anchors-local-explanations",
		demo: false,
		featured: true,
		title: "Anchors: from the precision/coverage mechanism to a controlled AnchorImage experiment",
		abstract:
			"A reconstruction of the Anchors algorithm — precision, coverage, KL-LUCB, beam search — followed by a controlled experiment on AnchorImage (Alibi Explain): a 4-superpixel anchor on a cat photo holds inside the perturbation distribution it was found in (precision 0.95, independently re-verified), and fails outright on four out-of-distribution backgrounds. The gap between the two is the actual finding: stability under a sampling distribution is not causality.",
		date: "2026-08-21",
		category: "Explainable AI",
		tags: ["Anchors", "Alibi Explain", "Computer Vision", "XAI"],
		readingTime: 12,
		status: "published",
		url: "/research/Anchors_final.pdf",
	},
	{
		id: "interpretability-exploration-fca",
		demo: false,
		featured: false,
		title: "Exploring interpretability: from Explainable AI to Formal Concept Analysis",
		abstract:
			"A 70-slide map of ML interpretability, built method by method: gradient-based attribution and Integrated Gradients (with a worked interpolation-path experiment), LIME and its instability, SHAP, Anchors, counterfactuals, then models interpretable by construction. The second half opens Formal Concept Analysis — formal context, concept lattice, derivation operators — and extends it to incomplete information through possibility theory, closing on the question that now drives the research direction: is a local rule enough, or does explaining a model need a richer structure?",
		date: "2026-08-14",
		category: "Research notes",
		tags: ["Explainable AI", "FCA", "Interpretability"],
		readingTime: 20,
		status: "published",
		url: "/research/presentation.pdf",
	},
];

export const publishedArticles = articles.filter((article) => article.status === "published");
