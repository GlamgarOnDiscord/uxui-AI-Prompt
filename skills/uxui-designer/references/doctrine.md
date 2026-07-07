# Doctrine Ares

> Ce document est le fondement philosophique du skill. Toutes les règles, patterns et décisions en découlent. Chargez-le en premier — il prime sur les recettes, les presets et les inspirations.

---

## Les 5 Axiomes

Chaque règle du skill est une conséquence directe de ces axiomes. Si une règle ne peut pas être rattachée à un axiome, elle n'a pas sa place ici.

### Axiome 1 — La thèse visuelle

> Chaque écran doit avoir une thèse visuelle — une idée de composition qui pourrait être décrite en une phrase.

Un layout sans thèse est un assemblage. Une page qui ne peut pas répondre à "quelle est l'idée ici ?" est une page sans auteur. La thèse précède les composants : on ne place jamais un élément sans savoir ce qu'il sert dans la composition globale.

**Conséquences :** pas de placement par défaut, pas de "j'ai besoin d'une section ici donc je mets des cartes", pas de décision qui ne serve pas la thèse.

### Axiome 2 — La tension précède la résolution

> Un layout sans point de friction est un layout sans énergie. Le confort visuel naît du contraste, pas de l'uniformité.

La tension se crée par le contraste d'échelle, le déséquilibre contrôlé, la rupture de rythme, le vide actif à côté de la masse. Sans tension, le design est plat — techniquement correct mais émotionnellement nul.

**Conséquences :** jamais de sections qui se ressemblent, toujours une hiérarchie de force entre les éléments, le vide est un choix aussi puissant que le plein.

### Axiome 3 — Le design est soustraction

> La qualité se mesure à ce qu'on a retiré, pas à ce qu'on a ajouté. Chaque élément survivant doit justifier sa présence.

Premium n'est pas "beaucoup de choses bien faites" — c'est "peu de choses parfaitement choisies". L'accumulation est le réflexe du débutant. La retenue est la marque du maître. Quand on hésite entre ajouter et retirer, on retire.

**Conséquences :** pas de sections de remplissage, pas d'effets décoratifs sans fonction narrative, pas de composants qui existent "parce qu'il en faut un là".

### Axiome 4 — L'intention perceptible

> L'utilisateur doit sentir qu'un humain a décidé de chaque détail. Rien ne doit sembler "par défaut".

Un padding de 24px n'est pas un padding — c'est une décision de respiration. Une bordure de 1px n'est pas une bordure — c'est un geste de séparation choisi. Un fade-in de 300ms n'est pas une animation — c'est un rythme d'entrée en scène. Si le détail n'a pas été décidé consciemment, il n'a pas sa place.

**Conséquences :** zéro valeur par défaut non-examinée, chaque token justifiable, chaque transition chorégraphiée.

### Axiome 5 — La durabilité formelle

> Un design Ares ne doit pas sembler daté dans 18 mois. Éviter les tendances éphémères au profit de choix structurels intemporels.

Les modes passent : glassmorphism, neumorphism, gradients arc-en-ciel, bornes néon. Les structures restent : la hiérarchie typographique, la tension compositionnelle, le rythme vertical, la contrainte chromatique. Construire sur les structures, pas sur les modes.

**Conséquences :** pas de tendance non-testée par le temps, préférer les gestes de composition aux effets de surface, les choix typographiques et spatiaux priment sur les traitements graphiques.

---

## Définition de l'excellence Ares

L'excellence n'est pas l'absence d'erreurs. Un output est excellent quand :

1. **Il est signé** — impossible de l'attribuer à un autre studio, un autre auteur, ou un template.
2. **Il est tendu** — il y a une énergie compositionnelle, un point de friction qui crée le mouvement de l'œil.
3. **Il est mémorable** — après avoir vu 50 landing pages, celle-ci reste en tête. Pas par excès, mais par justesse.
4. **Il est cohérent** — chaque section raconte le même récit visuel avec des moyens différents.
5. **Il est fini** — les micro-détails (bordures, espacements, transitions, états) sont au même niveau que les macro-décisions.

### Le test ultime

> "Si on masque le logo et le copy, peut-on encore identifier que c'est un output Ares ?"

Si la réponse est non, le travail n'est pas terminé.

---

## Posture offensive

Le skill ne se contente pas d'**éviter** le médiocre. Il **exige** l'excellent.

### L'ancienne posture (défensive)
- "Est-ce que ça évite les anti-patterns ?"
- "Est-ce que le Self-Check passe ?"
- "Est-ce que c'est au moins correct ?"

### La nouvelle posture (offensive)
- "Quel est le **geste de design** ici ?"
- "Quelle est la **thèse visuelle** de cette page ?"
- "Qu'est-ce qui rend cet output **impossible à confondre** avec un template ?"

Chaque production doit répondre à ces trois questions AVANT de commencer à coder.

---

## Le Signature Move

Chaque production Ares contient au minimum un **signature move** — un choix compositionnel fort, spécifique au brief, qui ne peut pas être un template.

### Qu'est-ce qu'un signature move ?

- Un geste de composition qui **ne fonctionnerait pas** dans un autre projet
- Un choix qui demande un **sacrifice** (design = choix, pas accumulation)
- Une décision qui ferait dire à un designer : "tiens, ça c'est un parti pris"

### Exemples de signature moves valides

- Un hero où le produit est montré à une échelle 3x plus grande que la convention, avec le titre en secondaire
- Une section de pricing qui casse la grille et utilise une disposition en escalier
- Un fond qui utilise un pattern géométrique unique dérivé du logo du client
- Une typographie display à un ratio 8:1 par rapport au body, créant une tension d'échelle extrême

### Exemples qui NE SONT PAS des signature moves

- Changer la couleur d'accent (c'est de la personnalisation, pas un geste)
- Ajouter un gradient (c'est de la décoration, pas de la composition)
- Utiliser un composant animé (c'est de l'exécution, pas une thèse)

---

## Signatures Ares — L'identité de studio

Ces gestes récurrents constituent l'ADN visuel Ares. Ils ne sont pas obligatoires à chaque production, mais au moins 2-3 doivent être présents pour que l'output soit reconnaissable.

### 1. Rapport typographique extrême
Le display est 5-8x plus gros que le body. La tension d'échelle crée l'énergie. Pas de progression linéaire douce — un saut brutal entre le titre et le texte.

### 2. Bordures comme matériau narratif
Les `border` ne sont pas décoratives. Elles structurent, séparent, rythment. Un `border-t` fin qui traverse la page est une ponctuation. Un `border-l` épais est un ancrage. Les bordures racontent la hiérarchie.

### 3. Monospace comme ponctuation visuelle
Le `font-mono` n'est pas réservé au code. Utilisé pour les labels, les métriques, les catégories, les timestamps, il crée un contraste textural avec le sans-serif principal. C'est le "trait fin" du typographe.

### 4. Transitions de section comme coupes cinématographiques
Les sections ne se suivent pas passivement. Chaque transition est une "coupe" : changement de densité, inversion de fond, rupture de grille, pause de respiration. La page se lit comme un montage.

### 5. Vide architectural
Le whitespace n'est pas de l'espace "restant". C'est un matériau posé délibérément. Un `py-32` à côté d'un `py-8` crée un rythme. Un bloc isolé par 200px de vide a plus de poids qu'un bloc au milieu d'une grille.

### 6. Densité informationnelle contrôlée
Les zones denses (dashboards, stats, features) sont encadrées par des zones de repos. Jamais deux sections denses consécutives. Le cerveau a besoin de pauses pour hiérarchiser.

### 7. Un seul accent, traité comme précieux
La couleur d'accent apparaît rarement. Quand elle apparaît, c'est un événement. Un CTA, un état actif, un highlight critique. Si l'accent est partout, il n'accentue plus rien.

---

## Anti-références — Ce qu'Ares ne produira jamais

Ce ne sont pas des "anti-patterns" techniques. Ce sont des **postures de design** que le skill refuse fondamentalement.

### 1. Le template habillé
Un template SaaS (hero centré + 3 features + pricing + footer) avec juste des couleurs changées. **Pourquoi refusé :** aucune thèse visuelle, aucune intention compositionnelle, interchangeable avec n'importe quel projet.

### 2. L'accumulation décorative
Glows, gradients, glassmorphism, particles, SVG noise empilés pour "faire premium". **Pourquoi refusé :** la complexité de surface masque l'absence de structure. Premium vient de la retenue, pas de l'accumulation.

### 3. La symétrie confortable
Tout est centré, tout est aligné, tout est équilibré. **Pourquoi refusé :** le confort visuel sans tension est de l'indifférence. L'œil n'a pas de parcours, pas de hiérarchie de lecture.

### 4. Le pastiche Vercel/Linear
Une copie directe de Linear (mauve + dark + blur) ou Vercel (noir + géométrique + monospace). **Pourquoi refusé :** s'inspirer n'est pas copier. Ares a sa propre voix — informée par ces références mais jamais confondue avec elles.

### 5. Le SaaS-by-numbers
Hero avec "The #1 platform for X" + screenshot floue + 3 features icône+titre+description + pricing 3 colonnes. **Pourquoi refusé :** c'est la définition du générique. Zéro auteur, zéro mémoire, zéro différenciation.

### 6. Le design-trend-du-mois
Bento grids parce que tout le monde fait des bento grids. Grain/noise parce que c'est tendance. Mesh gradients parce que Figma les a popularisés. **Pourquoi refusé :** les tendances sans justification structurelle datent instantanément. Axiome 5.

---

## Rapport au temps

### Ce qui vieillit mal (éviter)
- Les effets de surface non-structurels (glassmorphism pur, neumorphism)
- Les palettes mode (neons 2022, pastels 2023, mesh gradients 2024)
- Les layouts copiés d'un site populaire du moment
- Les composants "wow" sans fonction (particles, 3D inutile, scrolljacking)

### Ce qui vieillit bien (privilégier)
- La hiérarchie typographique forte
- Les rapports d'échelle maîtrisés
- Le rythme vertical intentionnel
- La contrainte chromatique (1-2 couleurs, utilisées avec discipline)
- Les compositions asymétriques structurées
- Le vide comme matériau
- La densité informationnelle contrôlée

### Test de durabilité
> "Si ce design était publié il y a 2 ans, aurait-il eu l'air en avance ? S'il est publié dans 2 ans, aura-t-il l'air daté ?"

Si une décision ne passe pas ce test, c'est probablement une tendance, pas un choix structurel.
