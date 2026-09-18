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

						<div className="mt-8 rounded-card border border-dashed border-rule-strong p-5">
							<h3 className="label-mono text-ink-faint">How the rephrasing stays honest</h3>
							<p className="mt-3 text-[0.875rem] leading-relaxed text-ink-soft">
								The engine sits behind a single function type, so swapping the keyword scorer for a hosted model — or
								back to it — changes one file and no components. A server route retrieves the grounded answer first;
								only when a match is confident enough does it ask a Hugging Face model to reword it, constrained to the
								retrieved text. Any failure — no token configured, the model unreachable — falls back to the local
								answer, silently and instantly: a grounded engine that always answers correctly beats a language model
								that occasionally invents a diploma.
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
