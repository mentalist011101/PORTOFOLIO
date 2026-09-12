import type { Repository } from "@/types";

/**
 * Réel — noms, langages et descriptions repris des dépôts eux-mêmes.
 * Les deux dépôts promus en études de cas (electricity-forecast-uk,
 * data warehouse BigQuery) ne sont pas répétés ici.
 *
 * Projet-Audit n'est pas listé : le dépôt répond 404, il est privé.
 */
export const repositories: readonly Repository[] = [
	{
		id: "chat-pdf",
		name: "Chat_PDF",
		label: "Chat with your PDFs",
		description: "Question answering over a document you upload, rather than over what the model remembers.",
		language: "Python",
		field: "RAG",
		url: "https://github.com/mentalist011101/Chat_PDF",
	},
	{
		id: "medical-chatbot",
		name: "Build-a-Medical-Chatbot",
		label: "Medical chatbot",
		description: "A notebook build of a medical question-answering assistant, end to end.",
		language: "Jupyter",
		field: "LLM",
		url: "https://github.com/mentalist011101/Build-a-Medical-Chatbot",
	},
	{
		id: "netflix-recommender",
		name: "Netflix-Movie-Recommendation-System",
		label: "Netflix-style recommender",
		description:
			"Semantic search over film descriptions behind a FastAPI backend, with filters on category, type and the predicted emotional tone of the synopsis.",
		language: "Jupyter",
		field: "Recommender",
		url: "https://github.com/mentalist011101/Netflix-Movie-Recommendation-System",
	},
	{
		id: "book-recommender",
		name: "book-recommendation-system",
		label: "Book recommender",
		description: "A recommendation system for books, built as a full notebook-to-app pipeline.",
		language: "Jupyter",
		field: "Recommender",
		url: "https://github.com/mentalist011101/book-recommendation-system",
	},
	{
		id: "job-recommender",
		name: "Job_Recommender",
		label: "Job recommender",
		description: "Matching candidate profiles to job postings.",
		language: "Python",
		field: "Recommender",
		url: "https://github.com/mentalist011101/Job_Recommender",
	},
	{
		id: "housing-yaounde",
		name: "Analyse-des-Determinants-des-Prix-Immobiliers-a-Yaounde",
		label: "Housing prices in Yaoundé",
		description:
			"800 dwellings analysed to find what actually drives valuation in Yaoundé, with an interactive predictive model built in Streamlit.",
		language: "Jupyter",
		field: "Data Science",
		url: "https://github.com/mentalist011101/Analyse-des-Determinants-des-Prix-Immobiliers-a-Yaounde",
	},
	{
		id: "computer-vision-tf",
		name: "COMPUTER-VISION-WITH-TENSORFLOW",
		label: "Computer vision with TensorFlow",
		description:
			"A worked path through TensorFlow for vision, from the basics to deploying a CNN-based solution.",
		language: "Jupyter",
		field: "Computer Vision",
		url: "https://github.com/mentalist011101/COMPUTER-VISION-WITH-TENSORFLOW",
	},
	{
		id: "teen-phone-addiction",
		name: "Teen-Phone-Addiction-D-tection-de-l-addiction-au-smartphone",
		label: "Teen phone addiction",
		description: "Detecting smartphone addiction in teenagers from behavioural data.",
		language: "Jupyter",
		field: "Machine Learning",
		url: "https://github.com/mentalist011101/Teen-Phone-Addiction-D-tection-de-l-addiction-au-smartphone",
	},
	{
		id: "imagegen",
		name: "ImageGEN",
		label: "ImageGEN",
		description: "A front end for image generation.",
		language: "CSS",
		field: "Generative AI",
		url: "https://github.com/mentalist011101/ImageGEN",
	},
	{
		id: "url-shorten",
		name: "URL_SHORTEN",
		label: "URL shortener",
		description: "A link-shortening service — the small web project every backend habit comes from.",
		language: "Web",
		field: "Web",
		url: "https://github.com/mentalist011101/URL_SHORTEN",
	},
];
