"use client";

import { useSyncExternalStore } from "react";

import { Moon, Sun } from "@/components/ui/Icons";
import { cx } from "@/lib/utils";

type Theme = "light" | "dark";

interface ThemeToggleProps {
	readonly className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
	const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

	const toggle = () => {
		const next: Theme = theme === "dark" ? "light" : "dark";
		document.documentElement.classList.toggle("dark", next === "dark");
		window.localStorage.setItem("theme", next);
	};

	return (
		<button
			type="button"
			onClick={toggle}
			aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
			className={cx(
				"grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink",
				className,
			)}
		>
			{theme === undefined ? null : theme === "dark" ? <Sun className="text-[1.05rem]" /> : <Moon className="text-[1.05rem]" />}
		</button>
	);
}

function getSnapshot(): Theme {
	return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerSnapshot(): Theme | undefined {
	return undefined;
}

function subscribe(callback: () => void): () => void {
	const observer = new MutationObserver(callback);
	observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
	return () => observer.disconnect();
}
