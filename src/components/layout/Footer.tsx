import { Mail, Node } from "@/components/ui/Icons";
import { navigation, profile } from "@/data/profile";
import { cx } from "@/lib/utils";

const ELSEWHERE = [
	{ kind: "code", label: "GitHub", href: profile.github, tone: "bg-sun", rotation: "-rotate-[2deg]" },
	{ kind: "network", label: "LinkedIn", href: profile.linkedin, tone: "bg-card border border-rule", rotation: "rotate-[1.5deg]" },
	{ kind: "writing", label: "IREX blog", href: profile.blog, tone: "bg-kraft/70", rotation: "rotate-[2deg]" },
	{ kind: "pdf", label: "Curriculum vitae", href: profile.cv, tone: "bg-card border border-rule", rotation: "-rotate-[1.2deg]" },
] as const;

export function Footer() {
	return (
		<footer className="relative border-t border-rule bg-paper paper-grain">
			<div aria-hidden className="absolute right-0 top-0 hidden h-full w-2 bg-ember lg:block" />

			<div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
				<div>
					<div className="flex items-center gap-2.5">
						<span className="grid h-9 w-9 place-items-center rounded-[5px] bg-ink shadow-card">
							<Node className="text-[1.15rem] text-paper" />
						</span>
						<span className="font-display text-lg font-extrabold tracking-tight">{profile.fullName}</span>
					</div>
					<p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
						{profile.title}. {profile.school}, {profile.university}.
					</p>
					<a
						href={`mailto:${profile.email}`}
						className="mt-5 inline-flex items-center gap-2 text-sm text-ink underline decoration-rule-strong underline-offset-4 transition-colors hover:decoration-ember"
					>
						<Mail className="text-[1rem] text-rust" />
						{profile.email}
					</a>
				</div>

				<nav aria-label="Footer sections">
					<h2 className="label-mono text-ink-faint">Sections</h2>
					<ul className="mt-4 space-y-2.5">
						{navigation.map((item) => (
							<li key={item.id}>
								<a href={`#${item.id}`} className="text-sm text-ink-soft transition-colors hover:text-ink">
									{item.label}
								</a>
							</li>
						))}
					</ul>
				</nav>

				<div>
					<h2 className="label-mono text-ink-faint">Elsewhere</h2>
					<ul className="mt-5 grid grid-cols-2 gap-3">
						{ELSEWHERE.map((note) => (
							<li key={note.label}>
								<a
									href={note.href}
									target={note.href.startsWith("/") ? undefined : "_blank"}
									rel={note.href.startsWith("/") ? undefined : "noreferrer noopener"}
									download={note.href.startsWith("/cv") || undefined}
									className={cx(
										"sticky-note flex h-24 flex-col justify-between p-3 transition-transform duration-300 ease-out-soft hover:-translate-y-1 hover:rotate-0",
										note.tone,
										note.rotation,
									)}
								>
									<span className="label-mono text-ink/50">{note.kind}</span>
									<span className="font-display text-sm font-bold tracking-tight text-ink">{note.label}</span>
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="border-t border-rule">
				<div className="shell flex flex-col gap-3 py-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
					<p>
						© {new Date().getFullYear()} {profile.fullName}. All rights reserved.
					</p>
					<p className="font-mono">Next.js · TypeScript · Tailwind CSS</p>
				</div>
			</div>
		</footer>
	);
}
