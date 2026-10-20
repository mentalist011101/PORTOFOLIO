import type { CSSProperties } from "react";
import { Caveat } from "next/font/google";

// L'écriture manuscrite n'existe que dans l'espace perso : elle n'est pas chargée sur le reste du site.
const caveat = Caveat({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-caveat", display: "swap" });

// --font-hand est redéclaré ici : à la racine, --font-caveat n'existe pas encore et la valeur y serait invalide.
const handFont = { "--font-hand": 'var(--font-caveat), "Segoe Print", cursive' } as CSSProperties;

export default function BeyondLayout({ children }: { readonly children: React.ReactNode }) {
	return (
		<div className={caveat.variable} style={handFont}>
			{children}
		</div>
	);
}
