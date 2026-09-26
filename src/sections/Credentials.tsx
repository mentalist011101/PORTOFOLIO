import Image from "next/image";

import { ArrowUpRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { badges } from "@/data/badges";
import { credentials } from "@/data/certifications";
import { cx, formatDate } from "@/lib/utils";
import type { Badge, CredentialKind } from "@/types";

export function Credentials() {
	return (
		<section id="credentials" className="bg-paper-alt py-20 sm:py-24">
			<div className="shell">
				<SectionHeader
					eyebrow="The paperwork"
					title="Certifications & achievements"
					description="The projects and the articles carry the argument; these confirm it. Course and learning-path completions are grouped separately below — each one opens its certificate."
				/>

				<Reveal className="mt-12 overflow-hidden rounded-card border border-rule bg-card shadow-card">
					<ul className="divide-y divide-rule">
						{credentials.map((credential) => (
							<li key={credential.id}>
								<div className="flex flex-col gap-3 px-5 py-4 transition-colors duration-200 hover:bg-ink/[0.02] sm:flex-row sm:items-center sm:gap-6 sm:px-7 sm:py-5">
									{credential.image !== undefined && (
										<a
											href={credential.image}
											target="_blank"
											rel="noreferrer noopener"
											className="shrink-0"
											tabIndex={-1}
											aria-hidden
										>
											<Image
												src={credential.image}
												alt=""
												width={220}
												height={140}
												sizes="120px"
												className="h-[3.25rem] w-[4.75rem] rounded-[2px] border border-rule object-cover object-top transition-transform duration-300 hover:scale-105"
											/>
										</a>
									)}
									<span className="font-mono text-[0.6875rem] text-ink-faint sm:w-12">{credential.year}</span>

									<span className="flex-1">
										<span className="block font-display text-[1rem] font-bold leading-snug tracking-tight text-ink">
											{credential.title}
										</span>
										<span className="mt-1 block text-[0.875rem] text-ink-soft">
											{credential.issuer}
											{credential.note !== undefined && <span className="text-ink-faint"> — {credential.note}</span>}
										</span>
									</span>

									<span className="flex items-center gap-3">
										<span
											className={cx(
												"rounded-full border px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em]",
												KIND_TONES[credential.kind],
											)}
										>
											{credential.kind}
										</span>
										{credential.url !== undefined && (
											<a
												href={credential.url}
												target="_blank"
												rel="noreferrer noopener"
												className="text-ink-faint transition-colors hover:text-rust"
												aria-label={`Open the credential ${credential.title}`}
											>
												<ArrowUpRight className="text-[1rem]" />
											</a>
										)}
									</span>
								</div>
							</li>
						))}
					</ul>
				</Reveal>

				<Reveal className="mt-14">
					<h3 className="label-mono text-ink-faint">
						Badges — {badges.length} course and learning-path completions
					</h3>

					<ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{badges.map((badge) => (
							<li key={badge.id}>
								<BadgeCard badge={badge} />
							</li>
						))}
					</ul>
				</Reveal>
			</div>
		</section>
	);
}

function BadgeCard({ badge }: { readonly badge: Badge }) {
	return (
		<article className="group flex h-full flex-col overflow-hidden rounded-card border border-rule bg-card shadow-card transition-transform duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-lift">
			<a
				href={badge.certificate}
				target="_blank"
				rel="noreferrer noopener"
				className="relative block aspect-[4/3] border-b border-rule bg-paper-alt"
				aria-label={`Open the certificate for ${badge.title} (PDF)`}
			>
				<Image
					src={badge.image}
					alt={`${badge.title} — certificate issued by ${badge.issuer}`}
					fill
					sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 23vw"
					className="object-contain p-2 transition-transform duration-500 ease-out-soft group-hover:scale-[1.03]"
				/>
			</a>

			<div className="flex flex-1 flex-col p-4">
				<h4 className="font-display text-[0.9375rem] font-bold leading-snug tracking-tight text-ink">{badge.title}</h4>
				<p className="mt-1.5 font-mono text-[0.6875rem] text-ink-faint">
					{badge.issuer} · {formatDate(badge.date)}
				</p>

				<div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-rule pt-3 text-[0.8125rem]">
					<a
						href={badge.certificate}
						target="_blank"
						rel="noreferrer noopener"
						className="text-ink transition-colors hover:text-rust"
					>
						Certificate
						<span className="sr-only"> for {badge.title}, PDF</span>
					</a>
					{badge.verifyUrl !== undefined && (
						<a
							href={badge.verifyUrl}
							target="_blank"
							rel="noreferrer noopener"
							className="inline-flex items-center gap-1 text-ink-soft transition-colors hover:text-rust"
						>
							Verify
							<span className="sr-only"> {badge.title} with {badge.issuer}</span>
							<ArrowUpRight className="text-[0.9rem]" />
						</a>
					)}
				</div>
			</div>
		</article>
	);
}

const KIND_TONES: Record<CredentialKind, string> = {
	certification: "border-rule text-ink-soft",
	programme: "border-azure/35 bg-azure/10 text-azure",
	competition: "border-ember/45 bg-ember/10 text-rust",
	award: "border-ink/15 bg-sun/70 text-ink",
};
