import type { Metadata, Viewport } from "next";
import { Archivo, Inter, JetBrains_Mono, Newsreader } from "next/font/google";

import { profile } from "@/data/profile";

import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-face", display: "swap" });
const newsreader = Newsreader({ subsets: ["latin"], style: ["italic"], variable: "--font-newsreader", display: "swap" });

const description =
	"Portfolio of Luciano Fokouo Saadie, AI Engineer and Data Scientist at ENSPY, Université de Yaoundé I. Work in artificial intelligence, explainable AI, machine learning, data science and AI engineering.";

export const metadata: Metadata = {
	metadataBase: new URL(profile.siteUrl),
	title: {
		default: `${profile.fullName} — ${profile.title}`,
		template: `%s · ${profile.fullName}`,
	},
	description,
	keywords: [
		"Luciano Fokouo Saadie",
		"AI Engineer",
		"Data Scientist",
		"Explainable AI",
		"Machine Learning",
		"Deep Learning",
		"ENSPY",
		"Université de Yaoundé I",
		"RAG",
		"AI Agents",
	],
	authors: [{ name: profile.fullName, url: profile.siteUrl }],
	creator: profile.fullName,
	alternates: { canonical: "/" },
	openGraph: {
		type: "website",
		locale: "en_GB",
		url: profile.siteUrl,
		siteName: profile.fullName,
		title: `${profile.fullName} — ${profile.title}`,
		description,
	},
	twitter: {
		card: "summary_large_image",
		title: `${profile.fullName} — ${profile.title}`,
		description,
	},
	robots: { index: true, follow: true },
};

export const viewport: Viewport = {
	themeColor: "#f7f3ea",
	colorScheme: "light",
};

const personSchema = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: profile.fullName,
	jobTitle: profile.title,
	url: profile.siteUrl,
	email: `mailto:${profile.email}`,
	alumniOf: { "@type": "CollegeOrUniversity", name: profile.school },
	knowsAbout: ["Artificial Intelligence", "Explainable AI", "Machine Learning", "Data Science", "AI Engineering"],
	sameAs: [profile.github, profile.linkedin],
};

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
	return (
		<html lang="en" className={`${archivo.variable} ${inter.variable} ${mono.variable} ${newsreader.variable}`}>
			<head>
				<noscript>
					<style>{".reveal{opacity:1 !important}"}</style>
				</noscript>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
				/>
			</head>
			<body>{children}</body>
		</html>
	);
}
