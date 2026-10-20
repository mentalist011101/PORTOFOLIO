import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PlaceholderStamp } from "@/components/beyond/PlaceholderStamp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ArrowLeft } from "@/components/ui/Icons";
import { getReflections } from "@/lib/content";
import { formatDate } from "@/lib/utils";

interface PageProps {
	readonly params: Promise<{ readonly slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
	return (await getReflections()).map((reflection) => ({ slug: reflection.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const reflection = (await getReflections()).find((entry) => entry.slug === slug);
	if (reflection === undefined) {
		return {};
	}

	return {
		title: reflection.title,
		description: reflection.summary,
		alternates: { canonical: `/beyond/reflections/${slug}` },
	};
}

export default async function ReflectionPage({ params }: PageProps) {
	const { slug } = await params;
	const reflections = await getReflections();
	const reflection = reflections.find((entry) => entry.slug === slug);
	if (reflection === undefined) {
		notFound();
	}

	const others = reflections.filter((entry) => entry.slug !== slug).slice(0, 3);

	return (
		<>
			<Header />

			<main className="bg-paper">
				<article lang={reflection.lang} className="mx-auto max-w-[44rem] px-5 pb-20 pt-32 sm:px-8 sm:pt-40">
					<Link
						href="/beyond/mind#reflections"
						lang="en"
						className="inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-faint transition-colors hover:text-rust"
					>
						<ArrowLeft className="text-[0.9rem]" />
						Mind · Reflections
					</Link>

					<p className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.75rem] text-ink-faint">
						<span>{formatDate(reflection.date)}</span>
						<span aria-hidden>·</span>
						<span>{reflection.readingTime} min</span>
						<span className="rounded-[3px] border border-rule-strong px-1.5 py-0.5 uppercase">{reflection.lang}</span>
						{reflection.demo && <PlaceholderStamp />}
					</p>

					<h1 className="mt-5 text-[clamp(2.3rem,6vw,3.6rem)] leading-[1.04] text-ink">{reflection.title}</h1>
					<p className="mt-6 font-editorial text-[1.375rem] italic leading-snug text-ink-soft">{reflection.summary}</p>

					<span aria-hidden className="mt-10 block h-px w-20 bg-ember" />

					<div className="essay mt-10" dangerouslySetInnerHTML={{ __html: reflection.html }} />

					<p className="mt-14 flex flex-wrap gap-2 border-t border-rule pt-6" lang="en">
						{reflection.themes.map((theme) => (
							<span key={theme} className="rounded-full border border-rule-strong px-3 py-1 font-editorial text-[0.9375rem] italic text-ink-soft">
								{theme}
							</span>
						))}
					</p>
				</article>

				{others.length > 0 && (
					<aside className="border-t border-rule bg-paper-alt py-14">
						<div className="mx-auto max-w-[44rem] px-5 sm:px-8">
							<h2 className="label-mono text-ink-faint">Other reflections</h2>
							<ul className="mt-5 divide-y divide-rule">
								{others.map((other) => (
									<li key={other.slug} lang={other.lang}>
										<Link href={`/beyond/reflections/${other.slug}`} className="group block py-4">
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
