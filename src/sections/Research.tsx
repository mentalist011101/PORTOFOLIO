import { ArrowUpRight, Sparkle } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tape } from "@/components/ui/Tape";
import { TornEdge } from "@/components/ui/TornEdge";
import { articles } from "@/data/articles";
import { cx, formatDate } from "@/lib/utils";
import type { Article } from "@/types";

const featured = articles.filter((article) => article.featured);
const rest = articles.filter((article) => !article.featured);

export function Research() {
	return (
		<section id="research" className="relative my-12 bg-night night-grid text-white sm:my-16">
			<TornEdge position="top" className="text-night" />
			<TornEdge position="bottom" className="text-night" />

			<Sparkle className="pointer-events-none absolute left-[6%] top-24 text-[1.1rem] text-white/20" />
			<Sparkle className="pointer-events-none absolute right-[10%] top-40 text-[0.8rem] text-sun/40" />
			<Sparkle className="pointer-events-none absolute bottom-28 left-[18%] text-[0.7rem] text-white/15" />

			<div className="shell py-20 sm:py-24">
				<SectionHeader
					tone="light"
					eyebrow="A technical notebook, not a blog"
					title="Research & articles"
					description="Where I work things out in writing: attribution methods, retrieval failure modes, and the structures that let us describe what a model has learned. Some are finished, some are notes in progress — both are labelled."
				/>

				<div className="mt-14 grid gap-5 md:grid-cols-2">
					{featured.map((article, index) => (
						<Reveal key={article.id} delay={index * 90} className="h-full">
							<FeaturedArticle article={article} />
						</Reveal>
					))}
				</div>

				<Reveal className="mt-12">
					<h3 className="label-mono text-white/45">More notes</h3>
					<ul className="mt-3">
						{rest.map((article) => (
							<li key={article.id}>
								<ArticleRow article={article} />
							</li>
						))}
					</ul>
				</Reveal>
			</div>
		</section>
	);
}

function FeaturedArticle({ article }: { readonly article: Article }) {
	return (
		<a
			href={article.url}
			className="group relative flex h-full flex-col rounded-card bg-card p-6 text-ink shadow-lift transition-transform duration-300 ease-out-soft hover:-translate-y-1 sm:p-8"
		>
			<Tape className="-top-3 left-10" />

			<div className="flex items-center gap-3">
				<span className="rounded-full border border-rule px-2.5 py-1 font-mono text-[0.6875rem] leading-none text-ink-soft">
					{article.category}
				</span>
				{article.status === "draft" && (
					<span className="rounded-full bg-sun px-2.5 py-1 font-mono text-[0.6875rem] leading-none text-ink">draft</span>
				)}
			</div>

			<h3 className="mt-5 text-[1.5rem] font-extrabold leading-tight tracking-tight">{article.title}</h3>
			<p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">{article.abstract}</p>

			<footer className="mt-7 flex items-center justify-between border-t border-rule pt-4">
				<p className="font-mono text-[0.6875rem] text-ink-faint">
					{formatDate(article.date)} · {article.readingTime} min read
				</p>
				<span className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-rust">
					Read
					<ArrowUpRight className="text-[0.95rem] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
				</span>
			</footer>
		</a>
	);
}

function ArticleRow({ article }: { readonly article: Article }) {
	return (
		<a
			href={article.url}
			className="group grid grid-cols-1 items-baseline gap-x-6 gap-y-2 border-t border-white/12 py-5 transition-colors duration-200 hover:bg-white/5 sm:grid-cols-[7.5rem_1fr_auto] sm:px-3"
		>
			<span className="font-mono text-[0.6875rem] text-white/45">{formatDate(article.date)}</span>

			<span>
				<span className="flex flex-wrap items-center gap-3">
					<span className="font-display text-[1.0625rem] font-bold tracking-tight text-white transition-colors group-hover:text-sun">
						{article.title}
					</span>
					{article.status === "draft" && (
						<span className="rounded-full border border-sun/50 px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-wider text-sun">
							draft
						</span>
					)}
				</span>
				<span className="mt-1.5 block text-[0.875rem] leading-relaxed text-white/55">{article.abstract}</span>
				<span className="mt-2.5 flex flex-wrap gap-1.5">
					{article.tags.map((tag) => (
						<span key={tag} className={cx("rounded-full border border-white/20 px-2 py-0.5 font-mono text-[0.625rem] text-white/55")}>
							{tag}
						</span>
					))}
				</span>
			</span>

			<span className="flex items-center gap-2 font-mono text-[0.6875rem] text-white/45">
				{article.readingTime} min
				<ArrowUpRight className="text-[0.95rem] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
			</span>
		</a>
	);
}
