# Théorie du Design — Fondements compositionnels

> Ce fichier enseigne le POURQUOI derrière les décisions de design. Charger quand on a besoin de comprendre les principes, pas juste d'appliquer des recettes.

---

## Vocabulaire de composition

Le skill pense en termes de **composition**, pas en termes de **composants**. Ce vocabulaire remplace la pensée par blocs.

| Terme | Définition | Opposé |
|-------|-----------|--------|
| **Masse** | Zone de densité visuelle : texte dense, image, bloc coloré | Vide |
| **Vide** | Espace intentionnellement non-occupé, matériau actif | Masse |
| **Ancrage** | Élément lourd qui stabilise la composition (image, titre display, stat géante) | Flottement |
| **Flottement** | Élément léger sans point d'attache visuel clair | Ancrage |
| **Tension** | Déséquilibre contrôlé entre deux forces (échelle, poids, position) | Résolution |
| **Résolution** | Moment où la tension se relâche (CTA, conclusion, espace de repos) | Tension |
| **Cadence** | Rythme de la page — alternance prévisible ou surprenante de patterns | Monotonie |
| **Respiration** | Pause visuelle entre deux zones denses — le cerveau digère | Saturation |
| **Ponctuation** | Élément court qui marque une transition : bordure, label mono, icône isolée | Flux continu |
| **Poids** | Force visuelle d'un élément (taille, contraste, saturation, isolation) | Légèreté |
| **Enveloppe** | La forme globale que dessine la composition — même sans lire le contenu | Informe |
| **Parcours** | Trajet que l'œil suit naturellement à travers la page | Errance |

### Comment utiliser ce vocabulaire

Avant de placer un composant, formuler la décision en ces termes :
- "Je place une **masse** ici pour **ancrer** la section"
- "Ce **vide** crée une **respiration** après la **tension** du hero"
- "Ce label mono est une **ponctuation** qui marque la **cadence**"

Si la décision ne peut pas être formulée dans ce vocabulaire, elle n'est probablement pas une décision de composition — c'est un placement par défaut.

---

## Pourquoi l'asymétrie crée l'énergie

### Théorie de la tension Gestalt

L'œil humain cherche l'équilibre. Quand il le trouve immédiatement (symétrie parfaite), il s'arrête — il n'y a plus rien à explorer. Quand l'équilibre est suggéré mais incomplet (asymétrie), l'œil **parcourt** la composition pour le trouver. Ce parcours est l'énergie.

### Application pratique

| Symétrique (mort) | Asymétrique (vivant) |
|---|---|
| H1 centré + sous-titre centré + CTA centré | H1 aligné gauche à 2/5, visuel ancré droite à 3/5 |
| 3 cartes égales | 1 carte large + 2 cartes empilées |
| Image centrée sous le texte | Image qui déborde de sa colonne |

### La règle

L'asymétrie n'est pas le chaos. C'est un équilibre **dynamique** : les masses se compensent par le poids visuel, pas par la position géométrique. Un petit élément très contrasté peut équilibrer un grand élément discret.

---

## Pourquoi le vide est un matériau actif

### Le vide n'est pas de l'absence

Dans la composition, le vide est aussi intentionnel que le plein. Un `py-32` n'est pas "beaucoup d'espace" — c'est une respiration qui donne du poids à ce qui suit. Un élément isolé par du vide est perçu comme plus important qu'un élément dans une grille dense.

### Les fonctions du vide

| Fonction | Effet | Exemple |
|----------|-------|---------|
| **Isolation** | Augmente le poids perçu d'un élément | CTA seul avec 64px de marge autour |
| **Respiration** | Permet au cerveau de digérer avant la suite | Section aérée après une zone dense |
| **Rythme** | Crée la cadence par contraste avec la masse | Alternance dense/aéré/dense |
| **Luxe** | Signale qu'on peut se "permettre" de ne pas remplir | Landing page premium vs dashboard dense |
| **Focus** | Élimine les distractions autour de l'essentiel | Hero minimaliste avec un seul message |

### L'erreur courante

"Ça fait vide" → ajouter plus de contenu. C'est le réflexe inverse de ce qu'il faut. Si ça fait vide, c'est que le contenu existant n'a pas assez de **poids** — renforcez-le (taille, contraste, position) au lieu d'ajouter du bruit autour.

---

## Pourquoi le rythme vertical crée la narration

### La page comme séquence

Une page web n'est pas un poster — c'est une **séquence temporelle**. L'utilisateur la parcourt du haut vers le bas. Chaque section est une "scène". L'enchaînement des scènes crée un récit.

### Les erreurs de rythme

| Erreur | Effet sur l'utilisateur | Correction |
|--------|------------------------|------------|
| Toutes les sections identiques | Ennui, décrochage après la 3ème | Varier la grammaire : dense → aéré → split → plein écran |
| Décroissance linéaire d'effort | "Le haut est bien, le bas est bâclé" | Redistribuer : hero sobre, proof détaillé, conversion soignée |
| Pas de ponctuation | Flux monotone, pas de repères | Insérer des séparateurs visuels : bordure, changement de fond, stat isolée |
| Tout est dense | Fatigue cognitive, rien ne ressort | Insérer des pauses : section avec un seul élément, vide intentionnel |

### La structure narrative idéale

```
1. ACCROCHE    — Tension forte, message clair, un seul focus (hero)
2. PREUVE      — Densité maîtrisée, concret, chiffres (social proof)
3. RESPIRATION — Pause visuelle, un seul élément marquant
4. DÉTAIL      — Exploration, features, contenu riche
5. RESPIRATION — Retour au calme
6. CONVERSION  — Résolution de la tension, CTA final clair
```

Ce n'est pas un template à suivre aveuglément — c'est un **principe narratif** à adapter.

---

## Pourquoi la contrainte chromatique = luxe

### La psychologie de la restriction

Quand tout est coloré, rien n'est accentué. La profusion chromatique signale le "gratuit", le "pour tous", le "pas cher". La restriction signale le "choisi", le "précieux", le "pour initiés".

### Le mécanisme

| Nombre de couleurs | Perception | Usage idéal |
|---|---|---|
| 1 accent + neutres | Luxe, confiance, précision | SaaS premium, outils pro |
| 2-3 couleurs | Énergie, jeunesse, accessibilité | Apps consumer, éducation |
| 4+ couleurs | Bruit, confusion, low-cost | Jamais dans Ares |

### L'accent comme événement

Dans une palette contrainte, chaque apparition de la couleur d'accent est un **événement**. Le CTA est accentué → l'œil le trouve immédiatement. Le lien est accentué → il signale la navigation. Le badge est accentué → il communique l'état.

Si l'accent est partout (titres, bordures, backgrounds, icônes), il perd son pouvoir de signal. **Rareté = impact.**

### Application Ares

- Maximum 1 couleur d'accent par projet
- L'accent n'apparaît que sur les éléments actionnables ou informationnels critiques
- Les états décoratifs utilisent des variations de gris, pas l'accent
- Le ratio visuel : 85% neutres, 10% texte/surfaces secondaires, 5% accent

---

## Pourquoi la hiérarchie d'échelle crée l'autorité

### Le ratio typographique comme statement

Un H1 de 48px avec un body de 16px (ratio 3:1) est lisible mais neutre. Un H1 de 96px avec un body de 14px (ratio ~7:1) est un **statement**. Le ratio d'échelle communique la confiance, l'ambition, la clarté de message.

### Les ratios Ares

| Contexte | Ratio display/body | Effet |
|----------|-------------------|-------|
| Editorial, storytelling | 5:1 à 6:1 | Dramaturgie, immersion |
| SaaS premium, landing | 6:1 à 8:1 | Autorité, impact |
| Dashboard, app dense | 3:1 à 4:1 | Fonctionnalité, lisibilité |

### La règle

Ne jamais avoir une progression **linéaire** dans la typographie (16 → 20 → 24 → 32). Créer des **sauts** : 14 body → 64 display. Le saut crée la hiérarchie. La progression douce crée l'indifférence.
