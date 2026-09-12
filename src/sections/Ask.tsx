import { AskLuciano } from "@/components/ask-luciano/AskLuciano";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Ask() {
	return (
		<section id="ask" className="bg-paper paper-grain py-20 sm:py-24">
			<div className="shell">
				<SectionHeader
					eyebrow="A small demonstration rather than a claim"
					title="Ask Luciano"
					description="Rather than writing that I build retrieval systems, here is a very small one. Your question is normalised, tokenised and scored against a local knowledge base built from the same data that renders this page — no network call, no language model, nothing leaves your browser."
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

						<div className="mt-8 rounded-card border border-dashed border-rule-strong p-5">
							<h3 className="label-mono text-ink-faint">Next version</h3>
							<p className="mt-3 text-[0.875rem] leading-relaxed text-ink-soft">
								The engine sits behind a single function type, so replacing the keyword scorer with a retrieval-augmented
								model — embeddings over these same documents, an agent with tools — changes one file and no components.
								It is deliberately not done yet: a local engine that always answers correctly is more honest than a
								language model that occasionally invents a diploma.
							</p>
							<p className="mt-4 font-mono text-[0.6875rem] text-ink-faint">
								type ChatEngine = (question, history) =&gt; Promise&lt;ChatReply&gt;
							</p>
						</div>
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
