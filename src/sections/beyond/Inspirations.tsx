import { RetroTv } from "@/components/beyond/RetroTv";
import { Reveal } from "@/components/ui/Reveal";
import { inspirations } from "@/data/inspirations";

export function Inspirations() {
	return (
		<section
			id="inspirations"
			className="relative overflow-hidden py-20 sm:py-24"
			// Papier peint rétro à rayures, dans les tons kraft de la charte.
			style={{ background: "repeating-linear-gradient(90deg, rgba(201,168,124,0.12) 0 22px, transparent 22px 44px), var(--color-paper)" }}
		>
			<div className="shell">
				<Reveal className="max-w-2xl">
					<p className="font-hand text-[1.5rem] font-medium leading-none text-ink-soft">on repeat…</p>
					<h2 className="mt-2 text-[clamp(1.9rem,4.6vw,3.1rem)] leading-[1.05] text-ink">
						Inspirations <span className="font-hand text-[0.8em] font-bold text-rust">what stuck with me</span>
					</h2>
					<p className="mt-5 text-[0.975rem] leading-relaxed text-ink-soft">
						Videos, designers and machines I keep coming back to — design, robotics, science. Pick a channel, or turn
						the knob.
					</p>
				</Reveal>

				<Reveal className="mt-12">
					<RetroTv channels={inspirations} />
				</Reveal>
			</div>
		</section>
	);
}
