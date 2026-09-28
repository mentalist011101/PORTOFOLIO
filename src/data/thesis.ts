/**
 * Réel — repris de la page de garde et du projet de mémoire. L'aperçu public ne
 * contient que la couverture et la section 1 : il est recompilé depuis le LaTeX,
 * pas extrait du PDF complet, qui embarquerait toutes les pages.
 */
export const thesis = {
	title:
		"Mesure de l'incertitude structurelle par analyse factorielle des données pour la validation des prédictions d'un modèle de Deep Learning",
	gloss:
		"Measuring structural uncertainty through formal factor analysis of the data (FCA, Boolean matrix factorisation) to validate the predictions of a deep learning model.",
	question:
		"How can structural factors, induced from the data by formal factor analysis, measure the uncertainty of a prediction made by a deep learning model — effectively and interpretably — so that its predictions can be validated?",
	summary:
		"A network's softmax confidence says nothing about whether a prediction is consistent with the regularities actually present in its training data. The thesis builds an ensemble of classifiers from formal factors, runs it alongside the network without modifying it, and turns their disagreement into an uncertainty measure that also names the attributes contradicting the prediction — compared against softmax confidence, temperature scaling, MC dropout and the trust score. The hypothesis may fail; a well-characterised negative result is part of the plan.",
	supervisors: ["Dr TIOGNING Lauraine", "Dr KAMENI Jaurès"],
	institution: "ENSPY, Université de Yaoundé I",
	defence: "August 2027",
	preview: "/research/projet-memoire-apercu.pdf",
	cover: "/images/thesis-cover.jpg",
} as const;
