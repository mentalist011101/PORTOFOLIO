import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { ArrowDown, ArrowRight, Download } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Tape } from "@/components/ui/Tape";
import { profile } from "@/data/profile";

export function Hero() {
	return (
		<section id="top" className="relative overflow-hidden bg-paper paper-grain pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-36">
			<div className="shell grid items-center gap-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
				<div>
					<Reveal className="flex items-center gap-3">
						<span className="label-mono text-ink-faint">{profile.schoolShort} · Yaoundé</span>
						<span aria-hidden className="h-px w-10 bg-rule-strong" />
						<span className="label-mono text-rust">AI · XAI · Data</span>
					</Reveal>

					<Reveal delay={80}>
						<h1 className="mt-6 text-[clamp(2.6rem,8.5vw,5.2rem)] font-extrabold leading-[0.92] tracking-[-0.035em]">
							<span className="block text-ink">Luciano</span>
							<span className="block text-rust">Fokouo Saadie</span>
						</h1>
					</Reveal>

					<Reveal delay={140} className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
						<p className="font-display text-lg font-bold tracking-tight text-ink sm:text-xl">{profile.title}</p>
						<span aria-hidden className="hidden h-4 w-px bg-rule-strong sm:block" />
						<p className="flex items-center gap-2 text-sm text-ink-soft">
							<Image
								src={profile.enspyLogo}
								alt=""
								width={34}
								height={34}
								className="h-[34px] w-[34px] mix-blend-multiply"
							/>
							{profile.schoolShort} — {profile.university}
						</p>
					</Reveal>

					<Reveal delay={200}>
						<p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft">{profile.positioning}</p>
					</Reveal>

					<Reveal delay={260} className="mt-9 flex flex-wrap items-center gap-3">
						<Button href="#projects">
							Explore my work
							<ArrowRight className="text-[1rem] transition-transform duration-200 group-hover:translate-x-0.5" />
						</Button>
						<Button href="#research" variant="outline">
							Read my research
						</Button>
						<Button
							href={profile.cv}
							download
							variant="outline"
							className="border-transparent bg-transparent shadow-none hover:translate-x-0 hover:translate-y-0 hover:bg-ink/5 hover:shadow-none"
						>
							<Download className="text-[1rem]" />
							Download CV
						</Button>
					</Reveal>

					<Reveal delay={320} className="mt-12 hidden items-center gap-3 text-ink-faint lg:flex">
						<ArrowDown className="text-[1rem] drift-slow" />
						<span className="label-mono">Scroll — the story starts here</span>
					</Reveal>
				</div>

				<Reveal delay={160} className="relative">
					<DeskCollage />
				</Reveal>
			</div>
		</section>
	);
}

function DeskCollage() {
	return (
		<div className="relative mx-auto max-w-lg lg:max-w-none">
			<div className="pointer-events-none absolute -inset-4 -z-10 grid-paper opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000_35%,transparent_78%)] sm:-inset-8" />

			<div className="flex flex-col gap-5 sm:flex-row sm:items-start">
				<figure className="relative w-full -rotate-[2deg] bg-card p-2.5 pb-10 shadow-lift sm:w-[46%]">
					<Tape className="-top-3 left-1/2 w-20 -translate-x-1/2 rotate-[2deg]" />
					<Image
						src={profile.portrait}
						alt={`${profile.fullName} on the ENSPY campus`}
						width={813}
						height={1080}
						sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
						priority
						className="aspect-[4/5] w-full object-cover"
					/>
					<figcaption className="absolute inset-x-3 bottom-3 font-editorial text-[0.9rem] italic text-ink-soft">
						ENSPY, Yaoundé
					</figcaption>
				</figure>

				<div className="flex w-full flex-col gap-5 sm:w-[54%]">
					<figure className="relative rotate-[1.4deg] rounded-card border border-rule bg-card p-2 shadow-card">
						<Tape className="-top-3 right-6 w-16" />
						<Image
							src="/images/project-lesson-assistant.jpeg"
							alt="The lesson planning assistant prototype"
							width={1234}
							height={585}
							sizes="(max-width: 640px) 90vw, 26vw"
							className="aspect-[16/10] w-full rounded-[2px] object-cover object-top"
						/>
						<figcaption className="flex items-center justify-between px-1 pb-0.5 pt-2 font-mono text-[0.625rem] text-ink-faint">
							<span>lesson assistant</span>
							<span className="text-rust">in progress</span>
						</figcaption>
					</figure>

					<div aria-hidden className="-rotate-[1deg] rounded-card bg-night p-4 shadow-lift">
						<p className="font-mono text-[0.625rem] leading-relaxed text-white/70 sm:text-[0.6875rem]">
							<span className="text-white/35">$</span> python -m app.ingestion.ingest \
							<br />
							<span className="pl-3 text-white/80">curriculum.pdf --niveau SIL_CP</span>
							<br />
							<span className="text-sun">parse</span> <span className="text-white/35">→</span>{" "}
							<span className="text-sun">embed</span> <span className="text-white/35">→</span>{" "}
							<span className="text-sun">pgvector</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
