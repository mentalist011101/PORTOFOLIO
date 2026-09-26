import { TechMarquee } from "@/components/ui/TechMarquee";
import { TornEdge } from "@/components/ui/TornEdge";

export function StackBand() {
	return (
		<section aria-label="The stack" className="relative my-12 bg-night night-grid text-white sm:my-16">
			<TornEdge position="top" className="text-night" />
			<TornEdge position="bottom" className="text-night" />

			<div className="shell py-12 lg:py-14">
				<p className="label-mono mb-6 text-white/55">the stack</p>
				<TechMarquee />
			</div>
		</section>
	);
}
