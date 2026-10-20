import { Clothesline } from "@/components/beyond/Clothesline";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { activities } from "@/data/activities";

export function Activities() {
	const chronological = [...activities].sort((a, b) => a.start.localeCompare(b.start));

	return (
		<section id="activities" className="overflow-hidden bg-kraft/30 paper-grain pb-10 pt-20 sm:pb-12 sm:pt-24">
			<div className="shell">
				<SectionHeader
					eyebrow="Around the work"
					title={
						<>
							Where I{" "}
							<span className="font-editorial text-[0.95em] font-normal italic">showed up</span>
						</>
					}
					description="Conferences I attend or organise, hackathons, competitions, volunteering — one badge each, pinned to the line in the order they happened. The line gets longer as they do."
				/>
			</div>

			<div className="mt-10">
				<Clothesline activities={chronological} />
			</div>
		</section>
	);
}
