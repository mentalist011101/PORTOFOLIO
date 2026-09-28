"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";
import type { ThesisRequestResult } from "@/types";

type Status = "idle" | "sending" | "sent" | "invalid" | "unavailable";

const FIELD =
	"mt-1.5 w-full rounded-btn border border-rule-strong bg-paper px-3 py-2 text-[0.9375rem] text-ink placeholder:text-ink-faint";
const MAILTO = `mailto:${profile.email}?subject=${encodeURIComponent("Projet de mémoire — demande")}`;

export function ThesisRequestForm() {
	const [status, setStatus] = useState<Status>("idle");

	const submit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		setStatus("sending");

		const result = await postRequest(Object.fromEntries(new FormData(form)));
		if (result.ok) {
			form.reset();
		}
		setStatus(result.ok ? "sent" : result.reason);
	};

	if (status === "sent") {
		return (
			<p role="status" className="mt-4 rounded-card border border-rule bg-paper-alt px-4 py-3 text-[0.9375rem] text-ink">
				Request sent. I will email you the full proposal shortly.
			</p>
		);
	}

	return (
		<form onSubmit={submit} className="mt-4 grid gap-4 sm:grid-cols-2">
			<label className="block">
				<span className="label-mono text-ink-faint">Name</span>
				<input name="name" required minLength={2} maxLength={120} autoComplete="name" className={FIELD} />
			</label>

			<label className="block">
				<span className="label-mono text-ink-faint">Email</span>
				<input name="email" type="email" required maxLength={254} autoComplete="email" className={FIELD} />
			</label>

			<label className="block sm:col-span-2">
				<span className="label-mono text-ink-faint">Institution (optional)</span>
				<input name="affiliation" maxLength={160} autoComplete="organization" className={FIELD} />
			</label>

			<label className="block sm:col-span-2">
				<span className="label-mono text-ink-faint">Message (optional)</span>
				<textarea name="message" rows={3} maxLength={2000} className={FIELD} />
			</label>

			{/* Champ piège : invisible pour un humain, rempli par les robots. */}
			<div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
				<label>
					Website
					<input name="website" tabIndex={-1} autoComplete="off" />
				</label>
			</div>

			<div className="flex flex-wrap items-center gap-4 sm:col-span-2">
				<Button type="submit" size="sm" disabled={status === "sending"}>
					{status === "sending" ? "Sending…" : "Request the full proposal"}
				</Button>

				<p aria-live="polite" className="text-[0.8125rem] text-ink-soft">
					{status === "invalid" && "Please enter your name and a valid email address."}
					{status === "unavailable" && (
						<>
							Automatic sending is unavailable right now —{" "}
							<a href={MAILTO} className="text-rust underline underline-offset-4">
								email me
							</a>{" "}
							and I will send it.
						</>
					)}
				</p>
			</div>
		</form>
	);
}

async function postRequest(data: Record<string, FormDataEntryValue>): Promise<ThesisRequestResult> {
	try {
		const response = await fetch("/api/thesis-request", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		const body: unknown = await response.json();
		return isResult(body) ? body : { ok: false, reason: "unavailable" };
	} catch {
		return { ok: false, reason: "unavailable" };
	}
}

function isResult(value: unknown): value is ThesisRequestResult {
	if (typeof value !== "object" || value === null || !("ok" in value)) {
		return false;
	}
	const candidate = value as { ok: unknown; reason?: unknown };
	return candidate.ok === true || (candidate.ok === false && (candidate.reason === "invalid" || candidate.reason === "unavailable"));
}
