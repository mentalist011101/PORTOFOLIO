import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { HandArrow } from "@/components/ui/Icons";
import { Tape } from "@/components/ui/Tape";
import { profile } from "@/data/profile";
import { Activities } from "@/sections/beyond/Activities";
import { Chess } from "@/sections/beyond/Chess";

export const metadata: Metadata = {
	title: "Beyond the code",
	description: `What ${profile.firstName} does off the clock: conferences, hackathons, volunteering, and chess.`,
	alternates: { canonical: "/beyond" },
};

export default function BeyondPage() {
	return (
		<>
			<a
				href="#activities"
				className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-btn focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
			>
				Skip to content
			</a>

			<Header />

			<main>
				{/* Une page de carnet : on quitte la partie « dossier » du site. */}
				<section id="top" className="relative overflow-hidden border-b border-rule bg-card rule-line pb-16 pt-32 sm:pb-20 sm:pt-40">
					<span aria-hidden className="absolute inset-y-0 left-[max(0.75rem,calc((100vw-78rem)/2+1rem))] w-px bg-rust/45" />
					<span aria-hidden className="absolute inset-y-0 left-[max(1rem,calc((100vw-78rem)/2+1.25rem))] w-px bg-rust/30" />

					<div className="shell relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
						<div className="max-w-2xl pl-4 sm:pl-6">
							<p className="eyebrow">Off the clock — personal notes</p>
							<h1 className="mt-2 text-[clamp(2.6rem,7vw,4.6rem)] leading-[1] text-ink">
								Beyond{" "}
								<span className="font-editorial text-[0.95em] font-normal italic text-rust">the code</span>
							</h1>
							<p className="mt-6 text-[1.0625rem] leading-[28px] text-ink-soft">
								The rest of this site is the version for a jury: what I build, what I studied, what it proves. This
								page is the notebook next to it — the events I show up to, the games I win and lose on chess.com, and
								more as I write it.
							</p>

							<nav aria-label="On this page" className="mt-10">
								<p className="label-mono text-ink-faint">Contents</p>
								<ol className="mt-3">
									{CONTENTS.map((entry, index) => (
										<li key={entry.href}>
											<a
												href={entry.href}
												className="group flex items-baseline gap-4 py-1 text-ink transition-colors hover:text-rust"
											>
												<span className="font-mono text-[0.75rem] text-ink-faint">{String(index + 1).padStart(2, "0")}</span>
												<span className="font-display text-[1.375rem] font-extrabold tracking-tight">{entry.label}</span>
												<span className="font-editorial text-[1rem] italic text-ink-soft group-hover:text-rust">— {entry.note}</span>
											</a>
										</li>
									))}
								</ol>
							</nav>
						</div>

						<div className="relative hidden lg:block">
							<div className="sticky-note relative rotate-[3deg] bg-sun p-6 pt-8">
								<Tape className="-top-3 left-1/2 -translate-x-1/2 rotate-[-4deg]" />
								<p className="label-mono text-ink/55">Note to self</p>
								<p className="mt-3 font-display text-[1.5rem] font-extrabold leading-tight tracking-tight text-ink">
									Not on the CV.
								</p>
								<p className="mt-2 font-editorial text-[1.0625rem] italic leading-snug text-ink/75">
									No grades here, just what I do because I want to.
								</p>
							</div>
							<HandArrow className="ml-6 mt-6 h-16 w-24 -scale-x-100 rotate-[20deg] text-rust/70" />
						</div>
					</div>
				</section>

				<Activities />
				<Chess />
			</main>

			<Footer />
		</>
	);
}

const CONTENTS = [
	{ href: "#activities", label: "Activities", note: "conferences, hackathons, volunteering" },
	{ href: "#chess", label: "Chess", note: "live from chess.com" },
] as const;
