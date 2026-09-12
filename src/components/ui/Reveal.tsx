"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { cx } from "@/lib/utils";

interface RevealProps {
	readonly children: ReactNode;
	readonly as?: ElementType;
	readonly delay?: number;
	readonly className?: string;
}

export function Reveal({ children, as, delay = 0, className }: RevealProps) {
	const Element = as ?? "div";
	const ref = useRef<HTMLElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (node === null) {
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setVisible(true);
						observer.disconnect();
					}
				}
			},
			{ threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	return (
		<Element
			ref={ref}
			data-visible={visible ? "true" : "false"}
			style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
			className={cx("reveal", className)}
		>
			{children}
		</Element>
	);
}
