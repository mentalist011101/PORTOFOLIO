import Image from "next/image";

import { ArrowUpRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { credentials } from "@/data/certifications";
import { cx } from "@/lib/utils";
import type { CredentialKind } from "@/types";

export function Credentials() {
	return (
		<section id="credentials" className="bg-paper-alt py-20 sm:py-24">
			<div className="shell">
				<SectionHeader
					eyebrow="The paperwork"
					title="Certifications & achievements"
					description="Kept deliberately compact. The projects and the articles carry the argument; these only confirm it."
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
			</div>
		</section>
	);
}

const KIND_TONES: Record<CredentialKind, string> = {
	certification: "border-rule text-ink-soft",
	programme: "border-azure/35 bg-azure/10 text-azure",
	competition: "border-ember/45 bg-ember/10 text-rust",
	award: "border-ink/15 bg-sun/70 text-ink",
};
