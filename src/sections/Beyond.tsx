import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { activities } from "@/data/activities";
import { cx } from "@/lib/utils";

export function Beyond() {
	const realActivities = activities.filter((activity) => !activity.demo).length;

	const doors = [
		{
			href: "/beyond/mind#activities",
			kind: "Activities",
			title: "Conferences, hackathons, volunteering",
			note: `${realActivities} logged so far, more as they happen`,
			tone: "bg-sun",
			rotation: "-rotate-[1.2deg]",
		},
		{
			href: "/beyond/mind#reflections",
			kind: "Reflections",
			title: "Thinking out loud about AI and society",
			note: "Essays, in French or English",
			tone: "bg-card border border-rule",
			rotation: "rotate-[0.8deg]",
		},
		{
			href: "/beyond/heart#poetry",
			kind: "Poetry",
			title: "A small book of poems",
			note: "Read one page at a time",
			tone: "bg-paper border border-rule",
			rotation: "-rotate-[0.6deg]",
		},
		{
			href: "/beyond/heart#chess",
			kind: "Chess",
			title: "My chess.com rating, month by month",
			note: "Live from the chess.com API",
			tone: "bg-kraft/70",
			rotation: "rotate-[1deg]",
		},
	] as const;

	return (
		<section id="beyond" className="bg-paper-alt py-20 sm:py-24">
			<div className="shell">
				<SectionHeader
					eyebrow="Off the clock"
					title={
						<>
							Beyond{" "}
							<span className="font-editorial text-[0.95em] font-normal italic">the code</span>
						</>
					}
					description="Everything above is what I build. This is the rest: the events I show up to, what I think, what I write, and chess."
					action={
						<Button href="/beyond" variant="outline">
							Open the page
							<ArrowRight className="text-[0.95rem]" />
						</Button>
					}
				/>

				<ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
					{doors.map((door, index) => (
						<Reveal key={door.href} as="li" delay={index * 80}>
							<a
								href={door.href}
								className={cx(
									"sticky-note flex h-full min-h-44 flex-col justify-between p-6 transition-transform duration-300 ease-out-soft hover:-translate-y-1 hover:rotate-0",
									door.tone,
									door.rotation,
								)}
							>
								<span className="label-mono text-ink/55">{door.kind}</span>
								<span>
									<span className="block font-display text-[1.35rem] font-extrabold leading-tight tracking-tight text-ink">
										{door.title}
									</span>
									<span className="mt-2 block text-[0.875rem] text-ink/70">{door.note}</span>
								</span>
							</a>
						</Reveal>
					))}
				</ul>
			</div>
		</section>
	);
}
