# Portfolio — Luciano Fokouo Saadie

Portfolio personnel et académique. Next.js 16 (App Router, rendu statique), TypeScript, Tailwind CSS 4, aucune dépendance UI.

```bash
npm run dev        # http://localhost:3000
npm run build      # build de production
npm run lint
npm run typecheck
```

## Où remplacer les placeholders

Toutes les données fictives sont marquées `demo: true` et vivent dans `src/data/`. Aucun composant ne lit autre chose : modifier ces fichiers suffit, il n'y a jamais besoin de toucher au JSX.

| Fichier | État | À faire |
| --- | --- | --- |
| `src/data/projects.ts` | 4 projets réels + 1 emplacement `demo` | relire les textes problem / approach / result, écrits à partir du code et des captures ; remplacer ou supprimer `demo-project-xai` |
| `src/data/certifications.ts` | réel | confirmer l'année de la bourse DCA |
| `src/data/repositories.ts` | réel | `Projet-Audit` n'y est pas : le dépôt répond 404, rends-le public pour l'ajouter |
| `src/data/gallery.ts` | réel | l'ordre des images définit la mosaïque |
| `src/data/profile.ts` | partiellement réel | remplacer `intro`, `email`, `siteUrl` |
| `src/data/articles.ts` | 2 articles réels + 3 sujets annoncés | écrire les brouillons ou supprimer les entrées `demo` |
| `src/data/education.ts` | réel | relevés L3 et M1 ; le M2 se complétera en fin d'année |
| `src/data/experience.ts` | réel | stage Valione Services, dates reprises de l'attestation signée |
| `src/data/skills.ts` | réel | le champ `evidence` doit continuer à pointer vers de vrais projets |
| `src/data/chatbot.ts` | réel | les réponses sont composées à partir des autres fichiers de données, donc elles se mettent à jour seules |

À faire aussi :

- `public/cv/luciano-fokouo-saadie-cv.pdf` — PDF placeholder généré, à écraser par le vrai CV
- `profile.siteUrl` — domaine de production, utilisé par les métadonnées Open Graph et le canonical
- `public/images/` — les quatre fichiers encore nommés `WhatsApp Image …` ne sont pas utilisés (infographie frontend, recaps YouTube, illustration « LAW ») : à supprimer ou à employer ailleurs

Les compteurs de la bande orange (`src/sections/StatsBand.tsx`) sont calculés à partir des données : ils ne peuvent pas mentir sur le contenu du site.

## Chatbot « Ask Luciano »

Aucun appel réseau, aucun LLM : la question est normalisée, tokenisée puis scorée contre la base locale.

```
src/data/chatbot.ts       base de connaissances + questions suggérées + réponse par défaut
src/lib/chatbot.ts        type ChatEngine + implémentation locale (createLocalEngine)
src/components/ask-luciano/AskLuciano.tsx   interface, ne connaît que le type ChatEngine
```

Pour brancher un LLM, un RAG ou un agent plus tard, il suffit de fournir une autre implémentation de :

```ts
type ChatEngine = (question: string, history: readonly ChatTurn[]) => Promise<ChatReply>;
```

et de la passer en prop : `<AskLuciano engine={myRagEngine} />`. Aucun composant ne change.

## Design system

Les tokens (couleurs, typographies, ombres, rayons, easing) sont définis dans le bloc `@theme` de `src/app/globals.css`, avec les utilitaires maison : `paper-grain`, `grid-paper`, `night-grid`, `eyebrow`, `label-mono`, `shell`, `reveal`.

Les animations passent par `.reveal` (IntersectionObserver, une seule fois par élément) et sont entièrement désactivées sous `prefers-reduced-motion`.
