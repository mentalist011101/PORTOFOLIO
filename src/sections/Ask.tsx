import { AskLuciano } from "@/components/ask-luciano/AskLuciano";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HandArrow } from "@/components/ui/Icons";
import { knowledgeBase, suggestedQuestions } from "@/data/chatbot";

export function Ask() {
	const previewQuestion = suggestedQuestions[1] ?? suggestedQuestions[0] ?? "";
	const previewEntry = knowledgeBase.find((entry) => entry.id === "research") ?? knowledgeBase[0];

	return (
		<section id="ask" className="bg-paper paper-grain py-20 sm:py-24">
			<div className="shell">
				<SectionHeader
					eyebrow="A small demonstration rather than a claim"
					title="Ask Luciano"
					description="Rather than writing that I build retrieval systems, here is a very small one. Your question is normalised, tokenised and scored against a local knowledge base built from the same data that renders this page. A hosted language model may rephrase that grounded answer for fluency, but it is only ever allowed to reword facts already retrieved — never to add new ones."
				/>

				<div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
					<Reveal>
						<h3 className="label-mono text-ink-faint">What it can answer</h3>
						<ul className="mt-5 space-y-3">
							{TOPICS.map((topic) => (
								<li key={topic} className="flex gap-3 text-[0.9375rem] text-ink-soft">
									<span aria-hidden className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
									{topic}
								</li>
							))}
						</ul>

						{previewEntry !== undefined && (
							<div className="relative mt-10">
								<div className="sticky-note -rotate-[1.4deg] rounded-card border border-kraft-deep/30 bg-kraft/70 p-5">
									<p className="label-mono text-ink/45">a real exchange, not a mockup</p>
									<p className="mt-3 font-mono text-[0.8125rem] leading-relaxed text-ink">
										<span className="text-ink/50">Q ·</span> {previewQuestion}
									</p>
									<p className="mt-2 font-mono text-[0.8125rem] leading-relaxed text-ink/70">
										<span className="text-ink/50">A ·</span> {truncate(previewEntry.answer, 128)}
									</p>
								</div>

								<HandArrow className="pointer-events-none absolute -right-14 top-full hidden h-16 w-20 -translate-y-2 rotate-[18deg] text-ember/70 lg:block" />
								<p className="eyebrow pointer-events-none absolute -bottom-9 right-0 hidden w-32 -rotate-2 text-[0.9rem] text-ink-faint lg:block">
									ask it yourself →
								</p>
							</div>
						)}
					</Reveal>

					<Reveal delay={120}>
						<AskLuciano />
					</Reveal>
				</div>
			</div>
		</section>
	);
}

const TOPICS = [
	"Who he is and what he studies",
	"Research interests: explainability, attribution, concept structures",
	"Projects, with the problem each one addressed",
	"Articles and technical notes",
	"Experience, credentials and academic record",
	"How to reach him, and where the code lives",
] as const;

function truncate(value: string, maxLength: number): string {
	if (value.length <= maxLength) {
		return value;
	}

	return `${value.slice(0, maxLength).trimEnd()}…`;
}
