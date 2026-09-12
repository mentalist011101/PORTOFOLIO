import { fallbackAnswer, knowledgeBase, suggestedQuestions } from "@/data/chatbot";
import type { KnowledgeEntry } from "@/types";

export interface ChatTurn {
	readonly id: string;
	readonly role: "user" | "assistant";
	readonly text: string;
	readonly link?: { readonly label: string; readonly href: string };
	readonly followUps?: readonly string[];
}

export interface ChatReply {
	readonly text: string;
	readonly followUps: readonly string[];
	readonly link?: { readonly label: string; readonly href: string };
	readonly matchedTopic?: string;
	readonly confidence: number;
}

/**
 * The single seam between the interface and whatever answers the questions.
 * Swapping the local engine for an LLM, a RAG pipeline or an agent means
 * providing another implementation of this type — no component changes.
 */
export type ChatEngine = (question: string, history: readonly ChatTurn[]) => Promise<ChatReply>;

export function createLocalEngine(entries: readonly KnowledgeEntry[] = knowledgeBase): ChatEngine {
	const index = entries.map((entry) => ({
		entry,
		keywords: new Set(entry.keywords.map(normalise)),
		haystack: normalise(`${entry.topic} ${entry.answer}`),
	}));

	return async (question) => {
		const tokens = tokenise(question);

		if (tokens.length === 0) {
			return { text: fallbackAnswer, followUps: [...suggestedQuestions].slice(0, 3), confidence: 0 };
		}

		const smallTalk = matchSmallTalk(tokens);
		if (smallTalk !== undefined) {
			return { text: smallTalk, followUps: [...suggestedQuestions].slice(0, 3), confidence: 1 };
		}

		let best: { readonly entry: KnowledgeEntry; readonly score: number } | undefined;

		for (const candidate of index) {
			let score = 0;

			for (const token of tokens) {
				if (candidate.keywords.has(token)) {
					score += 3;
					continue;
				}

				if (token.length >= 4 && hasPrefix(candidate.keywords, token)) {
					score += 1.6;
					continue;
				}

				if (token.length >= 4 && candidate.haystack.includes(token)) {
					score += 0.5;
				}
			}

			if (best === undefined || score > best.score) {
				best = { entry: candidate.entry, score };
			}
		}

		const threshold = 2.5;
		if (best === undefined || best.score < threshold) {
			return {
				text: fallbackAnswer,
				followUps: [...suggestedQuestions].slice(0, 3),
				confidence: best === undefined ? 0 : Math.min(best.score / threshold, 0.9),
			};
		}

		return {
			text: best.entry.answer,
			followUps: best.entry.followUps,
			link: best.entry.link,
			matchedTopic: best.entry.topic,
			confidence: Math.min(best.score / (threshold * 2), 1),
		};
	};
}

export const localEngine = createLocalEngine();

const STOP_WORDS = new Set([
	"a", "an", "and", "are", "as", "at", "be", "but", "by", "can", "could", "did", "do", "does",
	"for", "from", "had", "has", "have", "he", "her", "him", "his", "i", "if", "in", "into", "is",
	"it", "its", "me", "my", "of", "on", "or", "our", "s", "so", "some", "tell", "than", "that",
	"the", "their", "them", "there", "these", "they", "this", "to", "us", "was", "we", "were",
	"will", "with", "would", "you", "your", "please", "give", "show", "about",
]);

const SMALL_TALK: readonly { readonly triggers: readonly string[]; readonly answer: string }[] = [
	{
		triggers: ["hello", "hi", "hey", "bonjour", "salut", "hola", "greetings"],
		answer: "Hello. Ask me anything about Luciano's background, his projects or his research — I answer from this page only.",
	},
	{
		triggers: ["thanks", "thank", "merci", "cheers"],
		answer: "Any time. There is more in the projects and research sections if you want the detail.",
	},
	{
		triggers: ["bye", "goodbye", "later", "au revoir"],
		answer: "Thanks for reading. The contact section at the bottom has every way to reach him.",
	},
];

function matchSmallTalk(tokens: readonly string[]): string | undefined {
	if (tokens.length > 3) {
		return undefined;
	}

	return SMALL_TALK.find((item) => tokens.some((token) => item.triggers.includes(token)))?.answer;
}

function hasPrefix(keywords: ReadonlySet<string>, token: string): boolean {
	for (const keyword of keywords) {
		if (keyword.startsWith(token) || token.startsWith(keyword)) {
			return true;
		}
	}

	return false;
}

function tokenise(value: string): readonly string[] {
	return normalise(value)
		.split(" ")
		.filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function normalise(value: string): string {
	return value
		.toLowerCase()
		.normalize("NFD")
		.replace(/\p{M}/gu, "")
		.replace(/[^a-z0-9]+/g, " ")
		.trim();
}
