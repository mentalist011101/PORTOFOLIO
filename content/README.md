# Écrire dans l'espace Beyond

Un fichier `.md` = un texte. Le nom du fichier devient l'adresse de la page :
`content/reflections/societe-2030.md` → `/beyond/reflections/societe-2030`.
Pas d'espaces ni d'accents dans le nom du fichier.

Chaque fichier commence par un en-tête entre deux lignes `---`, puis le texte.
Après avoir ajouté ou modifié un fichier : commit, push, Vercel publie.

## Réflexions — `content/reflections/`

```md
---
title: Ce que sera la société en 2030
short: La société en 2030
date: 2026-11-02
lang: fr
summary: Une phrase qui donne envie de lire, affichée sous le titre.
themes: [society, future, ai]
---

Le texte, en Markdown.

## Un intertitre

Un paragraphe avec du *italique*, du **gras** et un [lien](https://exemple.org).

> Une citation mise en avant.

- une liste
- à puces
```

- `short` (facultatif) : libellé court affiché dans le graphe des idées.
- `themes` : les thèmes relient les réflexions entre elles dans le graphe.
  Ce sont des clés communes aux deux langues : réutiliser exactement le même mot d'un texte
  à l'autre, même pour un texte en français (`ai`, pas `IA` ici et `ia` là). Thèmes déjà
  utilisés : `ai`, `society`, `future`, `work`, `education`.
- `lang` : `fr` ou `en`, la langue dans laquelle le texte est écrit.
- `demo: true` : marque le texte comme placeholder. Supprimer la ligne pour un vrai texte.

## Poèmes — `content/poems/`

```md
---
title: Titre du poème
date: 2026-11-02
lang: fr
---

Premier vers
deuxième vers

Une ligne vide sépare les strophes.
```

- Chaque retour à la ligne est conservé tel quel : pas de Markdown dans les poèmes.
- `author` (facultatif) : seulement pour un texte qui n'est pas de moi.
