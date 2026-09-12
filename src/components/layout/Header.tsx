"use client";

import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Close, Download, Github, Linkedin, Menu, Node } from "@/components/ui/Icons";
import { navigation, profile } from "@/data/profile";
import { cx } from "@/lib/utils";

export function Header() {
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState<string>();
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const onScroll = () => {
			const max = document.documentElement.scrollHeight - window.innerHeight;
			setScrolled(window.scrollY > 10);
			setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
		};

		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		const sections = ["top", ...navigation.map((item) => item.id)]
			.map((id) => document.getElementById(id))
			.filter((element): element is HTMLElement => element !== null);

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

				if (visible !== undefined) {
					setActive(visible.target.id === "top" ? undefined : visible.target.id);
				}
			},
			{ rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
		);

		for (const section of sections) {
			observer.observe(section);
		}

		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (!open) {
			return;
		}

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setOpen(false);
			}
		};

		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", onKeyDown);

		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [open]);

	const close = useCallback(() => setOpen(false), []);

	return (
		<header
			className={cx(
				"fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out-soft",
				scrolled ? "border-b border-rule bg-paper/85 backdrop-blur-md" : "border-b border-transparent",
			)}
		>
			<div
				aria-hidden
				className="absolute inset-x-0 top-0 h-0.5 origin-left bg-ember transition-transform duration-150 ease-linear"
				style={{ transform: `scaleX(${progress})` }}
			/>

			<div className="shell flex items-center justify-between gap-4 py-3">
				<a href="#top" className="flex items-center gap-2.5" onClick={close}>
					<span className="grid h-9 w-9 place-items-center rounded-[5px] bg-ink shadow-card">
						<Node className="text-[1.15rem] text-paper" />
					</span>
					<span className="flex flex-col leading-none">
						<span className="font-display text-[0.95rem] font-extrabold tracking-tight">Luciano Fokouo</span>
						<span className="label-mono mt-1 text-ink-faint">AI Engineer</span>
					</span>
				</a>

				<nav aria-label="Sections" className="hidden lg:block">
					<ul className="flex items-center gap-1">
						{navigation.map((item) => (
							<li key={item.id}>
								<a
									href={`#${item.id}`}
									aria-current={active === item.id ? "true" : undefined}
									className={cx(
										"rounded-full px-3.5 py-2 text-[0.8125rem] transition-colors duration-200",
										active === item.id
											? "bg-ink text-paper"
											: "text-ink-soft hover:bg-ink/5 hover:text-ink",
									)}
								>
									{item.label}
								</a>
							</li>
						))}
					</ul>
				</nav>

				<div className="flex items-center gap-2">
					<a
						href={profile.github}
						target="_blank"
						rel="noreferrer noopener"
						aria-label="GitHub profile"
						className="hidden h-9 w-9 place-items-center rounded-full text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink sm:grid"
					>
						<Github className="text-[1.05rem]" />
					</a>
					<a
						href={profile.linkedin}
						target="_blank"
						rel="noreferrer noopener"
						aria-label="LinkedIn profile"
						className="hidden h-9 w-9 place-items-center rounded-full text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink sm:grid"
					>
						<Linkedin className="text-[1.05rem]" />
					</a>
					<span className="hidden sm:inline-flex">
						<Button href={profile.cv} download size="sm">
							<Download className="text-[0.95rem]" />
							CV
						</Button>
					</span>

					<button
						type="button"
						onClick={() => setOpen((value) => !value)}
						aria-expanded={open}
						aria-controls="mobile-navigation"
						aria-label={open ? "Close menu" : "Open menu"}
						className="grid h-10 w-10 place-items-center rounded-[6px] border border-rule-strong bg-card text-ink lg:hidden"
					>
						{open ? <Close className="text-[1.15rem]" /> : <Menu className="text-[1.15rem]" />}
					</button>
				</div>
			</div>

			<div
				id="mobile-navigation"
				hidden={!open}
				className="fixed inset-x-0 bottom-0 top-[68px] z-40 overflow-y-auto border-t border-rule bg-paper paper-grain lg:hidden"
			>
				<nav aria-label="Sections" className="shell flex flex-col py-6">
					{navigation.map((item, index) => (
						<a
							key={item.id}
							href={`#${item.id}`}
							onClick={close}
							className="flex items-baseline gap-4 border-b border-rule py-4 font-display text-2xl font-extrabold tracking-tight text-ink"
						>
							<span className="label-mono text-ink-faint">{String(index + 1).padStart(2, "0")}</span>
							{item.label}
						</a>
					))}

					<div className="mt-8 flex flex-wrap gap-3">
						<Button href={profile.cv} download>
							<Download className="text-[0.95rem]" />
							Download CV
						</Button>
						<Button href={profile.github} external variant="outline">
							<Github className="text-[0.95rem]" />
							GitHub
						</Button>
						<Button href={profile.linkedin} external variant="outline">
							<Linkedin className="text-[0.95rem]" />
							LinkedIn
						</Button>
					</div>
				</nav>
			</div>
		</header>
	);
}
