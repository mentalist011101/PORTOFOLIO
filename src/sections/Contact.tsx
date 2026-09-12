import { Button } from "@/components/ui/Button";
import { Download, Github, HandArrow, Linkedin, Mail } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { TornEdge } from "@/components/ui/TornEdge";
import { profile } from "@/data/profile";

export function Contact() {
	return (
		<section id="contact" className="relative mt-12 bg-rust text-white sm:mt-16">
			<TornEdge position="top" className="text-rust" />

			<div className="shell py-20 text-center sm:py-24">
				<Reveal>
					<p className="eyebrow text-white/60">The part where you write to me</p>
					<h2 className="mx-auto mt-3 max-w-3xl text-[clamp(2.1rem,6vw,3.8rem)] leading-[1.02] text-white">
						Let&rsquo;s build something
						<br className="hidden sm:block" /> worth explaining
					</h2>
					<p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/75">
						Open to research internships, Master&rsquo;s programmes and AI engineering work. If you are reading this for a
						lab, a scholarship jury or a team, the fastest route is an email.
					</p>
				</Reveal>

				<Reveal delay={120} className="relative mt-10 flex flex-wrap items-center justify-center gap-3">
					<HandArrow className="pointer-events-none absolute -top-16 left-[23%] hidden h-20 w-24 rotate-[14deg] text-white/55 lg:block" />
					<Button href={`mailto:${profile.email}`} variant="light">
						<Mail className="text-[1rem]" />
						{profile.email}
					</Button>
					<Button href={profile.cv} download variant="outline-light">
						<Download className="text-[1rem]" />
						Download CV
					</Button>
				</Reveal>

				<Reveal delay={200} className="mt-12">
					<ul className="mx-auto flex max-w-xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
						<li>
							<a
								href={profile.github}
								target="_blank"
								rel="noreferrer noopener"
								className="inline-flex items-center gap-2 text-sm text-white/75 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
							>
								<Github className="text-[1.05rem]" />
								github.com/mentalist011101
							</a>
						</li>
						<li>
							<a
								href={profile.linkedin}
								target="_blank"
								rel="noreferrer noopener"
								className="inline-flex items-center gap-2 text-sm text-white/75 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
							>
								<Linkedin className="text-[1.05rem]" />
								LinkedIn
							</a>
						</li>
					</ul>
				</Reveal>
			</div>
		</section>
	);
}
