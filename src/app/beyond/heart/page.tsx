import type { Metadata } from "next";

import { Chapter } from "@/components/beyond/Chapter";
import { heart } from "@/data/beyond";
import { profile } from "@/data/profile";
import { Chess } from "@/sections/beyond/Chess";
import { Inspirations } from "@/sections/beyond/Inspirations";
import { Poetry } from "@/sections/beyond/Poetry";

export const metadata: Metadata = {
	title: "Heart — Beyond the code",
	description: `What ${profile.firstName} loves for no reason: a small book of poems, chess, and the videos and ideas that inspire ${profile.firstName}.`,
	alternates: { canonical: "/beyond/heart" },
};

export default function HeartPage() {
	return (
		<Chapter chapter={heart}>
			<Poetry />
			<Chess />
			<Inspirations />
		</Chapter>
	);
}
