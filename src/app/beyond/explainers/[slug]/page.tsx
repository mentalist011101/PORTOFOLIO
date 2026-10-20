import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Chalkboard, LevelMarks } from "@/components/beyond/Chalkboard";
import { VideoFacade } from "@/components/beyond/VideoFacade";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ArrowLeft } from "@/components/ui/Icons";
import { Tape } from "@/components/ui/Tape";
import { getExplainers } from "@/lib/content";
import { formatDate } from "@/lib/utils";

interface PageProps {
	readonly params: Promise<{ readonly slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
	return (await getExplainers()).map((explainer) => ({ slug: explainer.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const explainer = (await getExplainers()).find((entry) => entry.slug === slug);
	if (explainer === undefined) {
		return {};
	}

	return {
		title: explainer.title,
		description: explainer.summary,
		alternates: { canonical: `/beyond/explainers/${slug}` },
	};
}

export default async function ExplainerPage({ params }: PageProps) {
	const { slug } = await params;
	const explainers = await getExplainers();
	const explainer = explainers.find((entry) => entry.slug === slug);
	if (explainer === undefined) {
		notFound();
	}

	const others = explainers.filter((entry) => entry.slug !== slug).slice(0, 3);

	return (
		<>
			<Header />

			<main className="bg-paper">
				<section className="bg-paper-alt px-5 pb-12 pt-28 sm:pt-36">
					<div className="mx-auto max-w-4xl">
						<Chalkboard className="px-6 pb-10 pt-8 sm:px-12 sm:pb-12 sm:pt-10">
							<div lang={explainer.lang}>
								<Link
									href="/beyond/mind#explainers"
									lang="en"
									className="chalk inline-flex items-center gap-2 font-hand text-[1.3rem] font-medium text-ink-soft transition-colors hover:text-sun"
								>
									<ArrowLeft className="text-[1rem]" />
									Mind · Explainers
								</Link>

								<p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-faint">
									<LevelMarks level={explainer.level} />
									<span>{formatDate(explainer.date)}</span>
									<span>{explainer.readingTime} min</span>
									<span className="rounded-full border border-rule-strong px-2 py-0.5">{explainer.lang}</span>
								</p>

								<h1 className="chalk mt-4 font-hand text-[clamp(2.8rem,8vw,4.75rem)] font-bold leading-[0.98] tracking-normal text-ink">
									{explainer.title}
								</h1>
								<p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft">{explainer.summary}</p>
								{explainer.demo && (
									<p className="mt-4 rotate-[-1.5deg] font-hand text-[1.4rem] font-bold text-sun">placeholder — to write</p>
								)}
							</div>
						</Chalkboard>
					</div>
				</section>

				<article lang={explainer.lang} className="mx-auto max-w-[44rem] px-5 pb-20 pt-12 sm:px-8">
					<aside className="sticky-note on-light relative rotate-[-0.8deg] bg-sun px-6 pb-6 pt-7">
						<Tape className="-top-3 left-8" />
						<p className="font-hand text-[1.3rem] font-bold leading-none text-ink/60" lang="en">
							in one sentence
						</p>
						<p className="mt-3 font-editorial text-[1.3rem] leading-snug text-ink">{explainer.tldr}</p>
					</aside>

					<div className="mt-10">
						{explainer.video === undefined ? (
							<p className="rounded-[4px] border-2 border-dashed border-rule-strong px-5 py-4 font-hand text-[1.4rem] font-medium text-ink-soft" lang="en">
								The video version is coming — the written one is below.
							</p>
						) : (
							<VideoFacade id={explainer.video} title={explainer.title} />
						)}
					</div>

					<div className="essay mt-12" dangerouslySetInnerHTML={{ __html: explainer.html }} />
				</article>

				{others.length > 0 && (
					<aside className="border-t border-rule bg-paper-alt py-14">
						<div className="mx-auto max-w-[44rem] px-5 sm:px-8">
							<h2 className="label-mono text-ink-faint">Other explainers</h2>
							<ul className="mt-5 divide-y divide-rule">
								{others.map((other) => (
									<li key={other.slug} lang={other.lang}>
										<Link href={`/beyond/explainers/${other.slug}`} className="group block py-4">
											<span className="block font-display text-[1.125rem] font-extrabold tracking-tight text-ink transition-colors group-hover:text-rust">
												{other.title}
											</span>
											<span className="mt-1 block font-editorial text-[1rem] italic text-ink-soft">{other.summary}</span>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</aside>
				)}
			</main>

			<Footer />
		</>
	);
}
