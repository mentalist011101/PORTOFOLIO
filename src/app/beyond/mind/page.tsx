import type { Metadata } from "next";

import { Chapter } from "@/components/beyond/Chapter";
import { mind } from "@/data/beyond";
import { profile } from "@/data/profile";
import { Activities } from "@/sections/beyond/Activities";
import { Reflections } from "@/sections/beyond/Reflections";

export const metadata: Metadata = {
	title: "Mind — Beyond the code",
	description: `What ${profile.firstName} thinks and does around AI: conferences, hackathons, volunteering, and essays on AI and society.`,
	alternates: { canonical: "/beyond/mind" },
};

export default function MindPage() {
	return (
		<Chapter chapter={mind}>
			<Activities />
			<Reflections />
		</Chapter>
	);
}
