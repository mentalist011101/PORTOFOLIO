import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { marked } from "marked";

import type { ContentLang, Explainer, ExplainerLevel, Poem, Reflection } from "@/types";

export async function getReflections(): Promise<readonly Reflection[]> {
	const entries = await readEntries("reflections");

	return entries
		.map(({ slug, meta, body }): Reflection => {
			const title = text(meta, "title", slug);
			return {
				slug,
				demo: meta.demo === "true",
				title,
				short: meta.short ?? title,
				date: text(meta, "date", slug),
				lang: lang(meta, slug),
				summary: text(meta, "summary", slug),
				themes: list(meta.themes),
				readingTime: readingTime(body),
				html: marked.parse(body, { async: false }),
			};
		})
		.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getExplainers(): Promise<readonly Explainer[]> {
	const entries = await readEntries("explainers");

	return entries
		.map(
			({ slug, meta, body }): Explainer => ({
				slug,
				demo: meta.demo === "true",
				title: text(meta, "title", slug),
				date: text(meta, "date", slug),
				lang: lang(meta, slug),
				summary: text(meta, "summary", slug),
				level: level(meta, slug),
				tldr: text(meta, "tldr", slug),
				video: meta.video,
				readingTime: readingTime(body),
				html: marked.parse(body, { async: false }),
			}),
		)
		.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPoems(): Promise<readonly Poem[]> {
	const entries = await readEntries("poems");

	return entries
		.map(
			({ slug, meta, body }): Poem => ({
				slug,
				demo: meta.demo === "true",
				title: text(meta, "title", slug),
				date: text(meta, "date", slug),
				lang: lang(meta, slug),
				author: meta.author,
				stanzas: body
					.trim()
					.split(/\n\s*\n/)
					.map((stanza) => stanza.split("\n").map((line) => line.trimEnd())),
			}),
		)
		.sort((a, b) => b.date.localeCompare(a.date));
}

export class ContentError extends Error {
	constructor(file: string, problem: string) {
		super(`content/${file}: ${problem}`);
		this.name = "ContentError";
	}
}

const CONTENT_DIR = path.join(process.cwd(), "content");

interface Entry {
	readonly slug: string;
	readonly meta: Readonly<Record<string, string>>;
	readonly body: string;
}

async function readEntries(folder: string): Promise<readonly Entry[]> {
	const directory = path.join(CONTENT_DIR, folder);
	const files = (await readdir(directory)).filter((file) => file.endsWith(".md"));

	return Promise.all(
		files.map(async (file) => {
			const source = (await readFile(path.join(directory, file), "utf8")).replace(/\r\n/g, "\n");
			const match = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(source);
			if (match === null) {
				throw new ContentError(`${folder}/${file}`, "missing the --- header block");
			}

			const [, header = "", body = ""] = match;
			return { slug: file.slice(0, -3), meta: parseHeader(header), body };
		}),
	);
}

// Sous-ensemble volontairement minimal du YAML : `clé: valeur` et `clé: [a, b]`.
function parseHeader(header: string): Record<string, string> {
	const meta: Record<string, string> = {};
	for (const line of header.split("\n")) {
		const separator = line.indexOf(":");
		if (separator > 0) {
			meta[line.slice(0, separator).trim()] = line
				.slice(separator + 1)
				.trim()
				.replace(/^"(.*)"$/, "$1");
		}
	}
	return meta;
}

function text(meta: Readonly<Record<string, string>>, key: string, slug: string): string {
	const value = meta[key];
	if (value === undefined || value === "") {
		throw new ContentError(slug, `missing "${key}" in the header`);
	}
	return value;
}

function lang(meta: Readonly<Record<string, string>>, slug: string): ContentLang {
	const value = text(meta, "lang", slug);
	if (value !== "en" && value !== "fr") {
		throw new ContentError(slug, `lang must be "en" or "fr", got "${value}"`);
	}
	return value;
}

function level(meta: Readonly<Record<string, string>>, slug: string): ExplainerLevel {
	const value = text(meta, "level", slug);
	if (value !== "beginner" && value !== "intermediate" && value !== "advanced") {
		throw new ContentError(slug, `level must be "beginner", "intermediate" or "advanced", got "${value}"`);
	}
	return value;
}

function readingTime(body: string): number {
	return Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / 220));
}

function list(value: string | undefined): readonly string[] {
	return (value ?? "")
		.replace(/^\[|\]$/g, "")
		.split(",")
		.map((item) => item.trim())
		.filter(Boolean);
}
