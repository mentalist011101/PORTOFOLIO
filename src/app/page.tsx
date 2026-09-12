import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { About } from "@/sections/About";
import { Ask } from "@/sections/Ask";
import { Contact } from "@/sections/Contact";
import { Credentials } from "@/sections/Credentials";
import { Experience } from "@/sections/Experience";
import { Gallery } from "@/sections/Gallery";
import { Hero } from "@/sections/Hero";
import { Journey } from "@/sections/Journey";
import { Projects } from "@/sections/Projects";
import { Research } from "@/sections/Research";
import { StatsBand } from "@/sections/StatsBand";
import { WhatIBuild } from "@/sections/WhatIBuild";

export default function Home() {
	return (
		<>
			<a
				href="#about"
				className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-btn focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
			>
				Skip to content
			</a>

			<Header />

			<main>
				<Hero />
				<StatsBand />
				<About />
				<WhatIBuild />
				<Projects />
				<Research />
				<Journey />
				<Experience />
				<Credentials />
				<Gallery />
				<Ask />
				<Contact />
			</main>

			<Footer />
		</>
	);
}
