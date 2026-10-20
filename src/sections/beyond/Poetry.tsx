import Link from "next/link";

import { PlaceholderStamp } from "@/components/beyond/PlaceholderStamp";
import { FloatingLetters, Leaf, PressedFlower, Ribbon } from "@/components/beyond/PoetryOrnaments";
import { Verses } from "@/components/beyond/Verses";
import { ArrowRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getPoems } from "@/lib/content";

export async function Poetry() {
	const poems = await getPoems();
	// Le recueil se lit dans l'ordre d'écriture : page 1 = le plus ancien.
	const book = [...poems].reverse();
	const latest = poems[0];

	return (
		<section id="poetry" className="relative overflow-hidden bg-paper-alt py-20 sm:py-24">
			<FloatingLetters />
			<div className="shell relative">
				<Leaf className="absolute right-10 top-0 hidden w-14 rotate-[28deg] md:block" />
				<Leaf className="absolute right-24 top-10 hidden w-9 -rotate-[18deg] md:block" />
				<SectionHeader
					eyebrow="Between the lines"
					title="Poetry"
					description="Poems, each in the language it came in. The book opens on the most recent one; the contents lead to the rest."
				/>

				{latest !== undefined && (
					<Reveal className="relative mx-auto mt-14 max-w-5xl">
						{/* Tranche et épaisseur du livre, sous les deux pages. */}
						<span aria-hidden className="absolute inset-x-3 -bottom-2 h-4 rounded-b-[6px] bg-kraft-deep/35" />
						<span aria-hidden className="absolute inset-x-1.5 -bottom-1 h-4 rounded-b-[6px] bg-card/70" />
						<Ribbon className="-top-3 right-[14%] h-[calc(100%+3.5rem)]" />

						<div className="relative grid overflow-hidden rounded-[6px] shadow-lift md:grid-cols-2">
							<nav
								aria-label="Contents of the poetry book"
								className="relative bg-card px-7 py-10 sm:px-12 sm:py-14"
								style={{ backgroundImage: "linear-gradient(to left, rgba(22,24,29,0.08), transparent 14%)" }}
							>
								<p className="text-center font-editorial text-[1.375rem] italic text-ink">Contents</p>
								<span aria-hidden className="mx-auto mt-3 block h-px w-16 bg-rule-strong" />

								<ol className="mt-8 space-y-4">
									{book.map((poem, index) => (
										<li key={poem.slug} lang={poem.lang}>
											<Link href={`/beyond/poetry/${poem.slug}`} className="group flex items-baseline gap-3">
												<span className="font-editorial text-[1.125rem] text-ink transition-colors group-hover:text-rust">
													{poem.title}
												</span>
												<span aria-hidden className="mb-1 flex-1 border-b border-dotted border-ink-faint/60" />
												<span className="font-mono text-[0.75rem] tabular-nums text-ink-faint">{index + 1}</span>
											</Link>
											{(poem.author !== undefined || poem.demo) && (
												<p className="mt-1 flex items-center gap-2 font-editorial text-[0.875rem] italic text-ink-faint">
													{poem.author}
													{poem.demo && <PlaceholderStamp className="scale-90" />}
												</p>
											)}
										</li>
									))}
								</ol>

								<PressedFlower className="absolute -bottom-6 right-2 hidden w-32 rotate-[16deg] sm:block" />
								<p className="absolute inset-x-0 bottom-4 text-center font-mono text-[0.6875rem] text-ink-faint">i</p>
							</nav>

							<article
								lang={latest.lang}
								className="relative border-t border-rule bg-card px-7 py-10 sm:px-12 sm:py-14 md:border-l md:border-t-0"
								style={{ backgroundImage: "linear-gradient(to right, rgba(22,24,29,0.1), transparent 12%)" }}
							>
								<h3 className="font-editorial text-[1.625rem] font-normal italic leading-tight tracking-normal text-ink">
									{latest.title}
								</h3>
								<Verses poem={latest} className="mt-6 text-[1.125rem] leading-[1.7]" />
								{latest.author !== undefined && (
									<p className="mt-6 font-editorial text-[0.9375rem] italic text-ink-soft">— {latest.author}</p>
								)}
								<Link
									href={`/beyond/poetry/${latest.slug}`}
									className="mt-8 inline-flex items-center gap-1.5 text-[0.875rem] text-ink transition-colors hover:text-rust"
								>
									Read it on its own page
									<ArrowRight className="text-[0.95rem]" />
								</Link>

								<p className="absolute inset-x-0 bottom-4 text-center font-mono text-[0.6875rem] text-ink-faint">{book.length}</p>
							</article>
						</div>
					</Reveal>
				)}
			</div>
		</section>
	);
}
