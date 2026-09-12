import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import type { NextConfig } from "next";

// A stray package-lock.json in the home directory otherwise wins the root inference.
const nextConfig: NextConfig = {
	turbopack: { root: dirname(fileURLToPath(import.meta.url)) },
	reactStrictMode: true,
	images: {
		formats: ["image/avif", "image/webp"],
	},
};

export default nextConfig;
