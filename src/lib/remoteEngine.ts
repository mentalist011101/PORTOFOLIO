import type { ChatEngine, ChatReply } from "@/lib/chatbot";
import { localEngine } from "@/lib/chatbot";

/**
 * Same contract as localEngine, routed through /api/chat so a Hugging Face
 * model can rephrase the grounded answer server-side. Any failure — no
 * token configured, network error, malformed response — falls back to
 * localEngine so the assistant never appears broken.
 */
export const remoteEngine: ChatEngine = async (question, history) => {
	try {
		const response = await fetch("/api/chat", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ question }),
		});

		if (!response.ok) {
			return localEngine(question, history);
		}

		const reply: unknown = await response.json();
		return isChatReply(reply) ? reply : localEngine(question, history);
	} catch {
		return localEngine(question, history);
	}
};

function isChatReply(value: unknown): value is ChatReply {
	if (typeof value !== "object" || value === null) {
		return false;
	}

	const candidate = value as Partial<ChatReply>;
	return typeof candidate.text === "string" && Array.isArray(candidate.followUps) && typeof candidate.confidence === "number";
}
