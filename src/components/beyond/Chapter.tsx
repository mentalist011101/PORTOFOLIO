import Link from "next/link";
import type { ReactNode } from "react";

import { NotebookPage } from "@/components/beyond/NotebookPage";
import { PressedFlower } from "@/components/beyond/PoetryOrnaments";
import { Underline } from "@/components/beyond/Scribbles";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";
import { chapters } from "@/data/beyond";
import type { BeyondChapter } from "@/data/beyond";

interface ChapterProps {
	readonly chapter: BeyondChapter;
	readonly children: ReactNode;
}

// Gabarit d'un chapitre de Beyond : en-tête de carnet, sections, puis passage à l'autre chapitre.
export function Chapter({ chapter, children }: ChapterProps) {
	const index = chapters.indexOf(chapter);
	const other = chapters.find((entry) => entry.slug !== chapter.slug);
	const first = chapter.sections[0];

	return (
		<>
			{first !== undefined && (
				<a
					href={`#${first.id}`}
					className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-btn focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
				>
					Skip to content
				</a>
			)}

			<Header />

			<main>
				<NotebookPage className="pb-12 pt-28 sm:pb-14 sm:pt-36">
					<div className="shell relative pl-9 sm:pl-14">
						<Link
							href="/beyond"
							className="inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-faint transition-colors hover:text-rust"
						>
							<ArrowLeft className="text-[0.9rem]" />
							Beyond the code
						</Link>

						<p className="mt-8 font-hand text-[1.5rem] font-medium leading-none text-ink-soft">chapter {index + 1}</p>
						<h1 className="mt-2 text-[clamp(3rem,9vw,5.5rem)] leading-[0.95] text-ink">
							{chapter.name}
							<span className="ml-3 font-hand text-[0.42em] font-bold text-rust sm:ml-5">{chapter.tagline}</span>
						</h1>

						<nav aria-label={`Sections of ${chapter.name}`} className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
							{chapter.sections.map((section) => (
								<a key={section.id} href={`#${section.id}`} className="group font-display text-[1.125rem] font-extrabold tracking-tight text-ink">
									<Underline>{section.label}</Underline>
									<span className="ml-2 font-editorial text-[0.9375rem] font-normal italic text-ink-soft group-hover:text-rust">
										— {section.note}
									</span>
								</a>
							))}
						</nav>

						{chapter.slug === "heart" && (
							<PressedFlower className="absolute -top-6 right-6 hidden w-32 rotate-[14deg] md:block" />
						)}
					</div>
				</NotebookPage>

				{children}

				{other !== undefined && (
					<section className="border-t border-rule bg-card rule-line py-16">
						<div className="shell flex flex-col items-start gap-3 pl-9 sm:pl-14">
							<p className="font-hand text-[1.5rem] font-medium leading-none text-ink-soft">turn the page…</p>
							<Link href={`/beyond/${other.slug}`} className="group inline-flex flex-wrap items-baseline gap-x-4 gap-y-1 text-ink transition-colors hover:text-rust">
								<span className="font-display text-[clamp(2rem,5vw,3rem)] font-extrabold leading-none tracking-tight">{other.name}</span>
								<span className="font-hand text-[1.6rem] font-bold text-rust">{other.tagline}</span>
								<ArrowRight className="self-center text-[1.5rem] transition-transform group-hover:translate-x-1" />
							</Link>
							<p className="max-w-xl text-[0.9375rem] text-ink-soft">{other.summary}</p>
						</div>
					</section>
				)}
			</main>

			<Footer />
		</>
	);
}
