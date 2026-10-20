import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PlaceholderStamp } from "@/components/beyond/PlaceholderStamp";
import { FloatingLetters, PressedFlower, Ribbon } from "@/components/beyond/PoetryOrnaments";
import { Verses } from "@/components/beyond/Verses";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";
import { getPoems } from "@/lib/content";
import { formatDate } from "@/lib/utils";

interface PageProps {
	readonly params: Promise<{ readonly slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
	return (await getPoems()).map((poem) => ({ slug: poem.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const poem = (await getPoems()).find((entry) => entry.slug === slug);
	if (poem === undefined) {
		return {};
	}

	return {
		title: poem.title,
		description: poem.author === undefined ? `A poem — ${poem.title}.` : `${poem.title}, ${poem.author}.`,
		alternates: { canonical: `/beyond/poetry/${slug}` },
	};
}

export default async function PoemPage({ params }: PageProps) {
	const { slug } = await params;
	// Même ordre que le sommaire du recueil : page 1 = le plus ancien.
	const book = [...(await getPoems())].reverse();
	const index = book.findIndex((entry) => entry.slug === slug);
	const poem = book[index];
	if (poem === undefined) {
		notFound();
	}

	const previous = book[index - 1];
	const next = book[index + 1];

	return (
		<>
			<Header />

			<main className="relative overflow-hidden bg-paper-alt px-5 pb-20 pt-32 sm:pt-40">
				<FloatingLetters />
				<div className="relative mx-auto max-w-xl">
					<Link
						href="/beyond/heart#poetry"
						className="inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-faint transition-colors hover:text-rust"
					>
						<ArrowLeft className="text-[0.9rem]" />
						Heart · Poetry
					</Link>

					<article
						lang={poem.lang}
						className="relative mt-8 rounded-[4px] bg-card px-8 pb-16 pt-12 shadow-lift sm:px-14 sm:pt-16"
						style={{ backgroundImage: "linear-gradient(to right, rgba(22,24,29,0.07), transparent 10%)" }}
					>
						<Ribbon className="-top-2 right-10 h-28" />
						<PressedFlower className="absolute -bottom-10 -left-16 hidden w-24 -rotate-[24deg] sm:block" />
						{poem.demo && <PlaceholderStamp className="absolute right-20 top-6" />}
						<h1 className="font-editorial text-[clamp(1.9rem,5vw,2.5rem)] font-normal italic leading-tight tracking-normal text-ink">
							{poem.title}
						</h1>
						<Verses poem={poem} animate className="mt-9 text-[1.25rem] leading-[1.75]" />
						<p className="mt-10 font-editorial text-[1rem] italic text-ink-soft">
							{poem.author === undefined ? formatDate(poem.date) : `— ${poem.author}`}
						</p>
						<p className="absolute inset-x-0 bottom-5 text-center font-mono text-[0.6875rem] text-ink-faint">{index + 1}</p>
					</article>

					<nav aria-label="Turn the page" className="mt-8 flex items-center justify-between gap-4 text-[0.875rem]">
						{previous === undefined ? (
							<span />
						) : (
							<Link href={`/beyond/poetry/${previous.slug}`} className="inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-rust">
								<ArrowLeft className="text-[0.95rem]" />
								<span lang={previous.lang} className="font-editorial italic">
									{previous.title}
								</span>
							</Link>
						)}
						{next !== undefined && (
							<Link href={`/beyond/poetry/${next.slug}`} className="inline-flex items-center gap-2 text-right text-ink-soft transition-colors hover:text-rust">
								<span lang={next.lang} className="font-editorial italic">
									{next.title}
								</span>
								<ArrowRight className="text-[0.95rem]" />
							</Link>
						)}
					</nav>
				</div>
			</main>

			<Footer />
		</>
	);
}
