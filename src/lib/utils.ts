export function cx(...values: readonly (string | false | undefined)[]): string {
	return values.filter(Boolean).join(" ");
}

export function formatDate(iso: string): string {
	return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
		timeZone: "UTC",
	});
}

export function padIndex(index: number): string {
	return String(index + 1).padStart(2, "0");
}
