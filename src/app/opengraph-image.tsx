import { ImageResponse } from "next/og";

import { profile } from "@/data/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.fullName} — ${profile.title}`;

export default function OpengraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					backgroundColor: "#f7f3ea",
					padding: "72px",
					fontFamily: "sans-serif",
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
					<div style={{ width: "18px", height: "18px", borderRadius: "9px", backgroundColor: "#b4400f", display: "flex" }} />
					<div style={{ fontSize: "22px", letterSpacing: "4px", color: "#5c6069", display: "flex" }}>
						ENSPY · UNIVERSITE DE YAOUNDE I
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column" }}>
					<div style={{ fontSize: "92px", fontWeight: 800, color: "#16181d", lineHeight: 1, display: "flex" }}>Luciano</div>
					<div style={{ fontSize: "92px", fontWeight: 800, color: "#b4400f", lineHeight: 1.1, display: "flex" }}>
						Fokouo Saadie
					</div>
					<div style={{ fontSize: "34px", color: "#16181d", marginTop: "28px", display: "flex" }}>{profile.title}</div>
				</div>

				<div style={{ display: "flex", justifyContent: "space-between", fontSize: "22px", color: "#5c6069" }}>
					<div style={{ display: "flex" }}>Explainable AI · Machine Learning · AI Engineering</div>
					<div style={{ display: "flex" }}>github.com/mentalist011101</div>
				</div>
			</div>
		),
		size,
	);
}
