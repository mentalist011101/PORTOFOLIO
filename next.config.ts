import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import type { NextConfig } from "next";

// A stray package-lock.json in the home directory otherwise wins the root inference.
const nextConfig: NextConfig = {
	turbopack: { root: dirname(fileURLToPath(import.meta.url)) },
	reactStrictMode: true,
	// /beyond/heart est revalidée (ISR, pour les échecs) : à chaque rendu serveur elle relit content/poems.
	outputFileTracingIncludes: { "/beyond/heart": ["./content/poems/**/*"] },
	images: {
		formats: ["image/avif", "image/webp"],
	},
};

export default nextConfig;
