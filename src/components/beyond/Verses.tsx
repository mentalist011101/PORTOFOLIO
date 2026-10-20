import type { CSSProperties } from "react";

import { cx } from "@/lib/utils";
import type { Poem } from "@/types";

interface VersesProps {
	readonly poem: Poem;
	readonly animate?: boolean;
	readonly className?: string;
}

export function Verses({ poem, animate = false, className }: VersesProps) {
	let line = 0;

	return (
		<div lang={poem.lang} className={cx("space-y-[1.1em] font-editorial text-ink", className)}>
			{poem.stanzas.map((stanza, index) => (
				<p key={index}>
					{stanza.map((verse, verseIndex) => (
						<span
							key={verseIndex}
							className={cx("block", animate && "verse")}
							style={animate ? ({ "--line": line++ } as CSSProperties) : undefined}
						>
							{verse}
						</span>
					))}
				</p>
			))}
		</div>
	);
}
