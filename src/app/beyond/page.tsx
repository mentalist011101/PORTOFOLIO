import type { Metadata } from "next";
import Link from "next/link";

import { NotebookPage } from "@/components/beyond/NotebookPage";
import { Leaf, PressedFlower } from "@/components/beyond/PoetryOrnaments";
import { Strike } from "@/components/beyond/Scribbles";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ArrowRight, HandArrow } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Tape } from "@/components/ui/Tape";
import { chapters } from "@/data/beyond";
import type { BeyondChapter } from "@/data/beyond";
import { profile } from "@/data/profile";
import { cx } from "@/lib/utils";

export const metadata: Metadata = {
	title: "Beyond the code",
	description: `What ${profile.firstName} does off the clock: events, essays on AI and society, poetry, and chess.`,
	alternates: { canonical: "/beyond" },
};

export default function BeyondPage() {
	return (
		<>
			<a
				href="#chapters"
				className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-btn focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
			>
				Skip to content
			</a>

			<Header />

			<main>
				{/* Une page de carnet : on quitte la partie « dossier » du site. */}
				<NotebookPage className="pb-16 pt-32 sm:pb-20 sm:pt-40">
					<div className="shell relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
						<div className="max-w-2xl pl-4 sm:pl-6">
							<p className="eyebrow">Off the clock — personal notes</p>
							<h1 className="mt-2 text-[clamp(2.6rem,7vw,4.6rem)] leading-[1] text-ink">
								Beyond{" "}
								<span className="font-editorial text-[0.95em] font-normal italic text-rust">the code</span>
							</h1>
							<p className="mt-6 text-[1.0625rem] leading-[28px] text-ink-soft">
								The rest of this site is the version for a jury: what I build, what I studied, what it proves. This is
								the notebook next to it, in two chapters — what goes on in my head, and what I love for no reason.
							</p>

							<nav aria-label="Contents" className="mt-10">
								<p className="label-mono text-ink-faint">Contents</p>
								<ol className="mt-3 space-y-4">
									{chapters.map((chapter, index) => (
										<li key={chapter.slug}>
											<Link href={`/beyond/${chapter.slug}`} className="group flex items-baseline gap-4 text-ink transition-colors hover:text-rust">
												<span className="font-mono text-[0.75rem] text-ink-faint">{String(index + 1).padStart(2, "0")}</span>
												<span className="font-display text-[1.5rem] font-extrabold tracking-tight">{chapter.name}</span>
												<span className="font-hand text-[1.35rem] font-medium text-ink-soft group-hover:text-rust">{chapter.tagline}</span>
											</Link>
											<ul className="ml-[2.6rem] mt-1 flex flex-wrap gap-x-5">
												{chapter.sections.map((section) => (
													<li key={section.id}>
														<Link
															href={`/beyond/${chapter.slug}#${section.id}`}
															className="font-editorial text-[1rem] italic text-ink-soft transition-colors hover:text-rust"
														>
															{section.label}
														</Link>
													</li>
												))}
											</ul>
										</li>
									))}
								</ol>
							</nav>
						</div>

						<div className="relative hidden lg:block">
							<div className="sticky-note on-light relative rotate-[3deg] bg-sun p-6 pt-8">
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
				</NotebookPage>

				<section id="chapters" className="bg-paper-alt py-20 sm:py-24">
					<div className="shell">
						<p className="font-hand text-[1.6rem] font-medium leading-none text-ink-soft">two sides of the same notebook —</p>
						<ul className="mt-10 grid gap-8 md:grid-cols-2">
							{chapters.map((chapter, index) => (
								<Reveal key={chapter.slug} as="li" delay={index * 100}>
									<Door chapter={chapter} index={index} />
								</Reveal>
							))}
						</ul>
					</div>
				</section>
			</main>

			<Footer />
		</>
	);
}

function Door({ chapter, index }: { readonly chapter: BeyondChapter; readonly index: number }) {
	const isMind = chapter.slug === "mind";

	return (
		<Link
			href={`/beyond/${chapter.slug}`}
			className={cx(
				"group relative flex min-h-[22rem] flex-col overflow-hidden rounded-[4px] bg-card p-8 shadow-lift transition-transform duration-500 ease-out-soft hover:-translate-y-1.5 hover:rotate-0 sm:p-10",
				isMind ? "grid-paper -rotate-[1deg]" : "rule-line rotate-[1deg]",
			)}
		>
			<Tape className={isMind ? "-top-3 left-12" : "-top-3 right-12 rotate-[3deg]"} />

			<p className="font-hand text-[1.4rem] font-medium leading-none text-ink-faint">chapter {index + 1}</p>
			<h2 className="mt-3 text-[clamp(2.8rem,6vw,4.2rem)] leading-none text-ink">
				{isMind ? <Strike className="text-ink-faint">Brain</Strike> : null}
				{isMind ? " " : null}
				{chapter.name}
			</h2>
			<p className="mt-3 font-hand text-[1.6rem] font-bold leading-tight text-rust">{chapter.tagline}</p>
			<p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-ink-soft">{chapter.summary}</p>

			<ul className="mt-auto flex flex-wrap gap-2 pt-8">
				{chapter.sections.map((section) => (
					<li key={section.id} className="rounded-full border border-rule-strong bg-card/80 px-3.5 py-1.5 font-editorial text-[0.9375rem] italic text-ink">
						{section.label}
					</li>
				))}
			</ul>

			<span className="absolute bottom-8 right-8 grid h-11 w-11 place-items-center rounded-full bg-ink text-paper transition-transform duration-300 group-hover:translate-x-1 sm:bottom-10 sm:right-10">
				<ArrowRight className="text-[1.1rem]" />
			</span>

			{!isMind && (
				<>
					<PressedFlower className="absolute -right-4 top-4 w-28 rotate-[18deg] opacity-90" />
					<Leaf className="absolute right-28 top-6 w-8 -rotate-[30deg]" />
				</>
			)}
		</Link>
	);
}
