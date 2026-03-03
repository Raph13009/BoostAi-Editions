# Guide de style — BoostAI Editions

Ce document définit les conventions visuelles et techniques du projet. **À respecter pour toute nouvelle implémentation.**

---

## 1. Couleurs

Utiliser **uniquement** les couleurs définies dans le design system. Privilégier les tokens Tailwind.

| Token | Valeur hex | Usage |
|-------|-----------|-------|
| `ink` | `#0A0908` | Texte principal, éléments primaires |
| `slate` | `#22333B` | Texte secondaire, footer, infos |
| `parchment` | `#EAE0D5` | Fond principal, backgrounds |
| `sand` | `#C6AC8F` | Accents, éléments tertiaires |
| `umber` | `#5E503F` | Texte tertiaire, bordures, sous-titres |

**En Tailwind :**
```tsx
className="text-ink bg-parchment border-umber"
```

**En CSS inline (si nécessaire) :**
```tsx
style={{ backgroundColor: "#EAE0D5" }}
// ou utiliser les variables : var(--color-parchment)
```

**Bordures :** Utiliser des variantes à faible opacité pour la subtilité :
```tsx
className="border-umber/20"
```

---

## 2. Typographie

### Police display (titres)
- **Font :** Author (serif)
- **Variable CSS :** `--font-display`
- **Classe Tailwind :** `font-display`

```tsx
<h1 className="font-display text-ink">Titre</h1>
```

### Police body (texte courant)
- **Font :** `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto`
- Héritée du `body` par défaut

Pour forcer le body explicitement :
```tsx
style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
```

### Titres
- `font-display`
- `text-ink`
- `lineHeight: 0.95` pour les grands titres
- `letterSpacing: "-0.02em"` pour les titres
- Tailles responsives : `clamp(56px, 7vw, 120px)` pour H1 hero

### Paragraphes
- `text-base md:text-xl` pour le body
- `text-umber` ou `text-slate` pour les sous-textes
- `lineHeight: 1.6` pour la lisibilité
- `max-w-[520px]` ou `max-w-[750px]` pour limiter la largeur de lecture

---

## 3. Espacement et layout

### Container
Utiliser le composant `Container` pour le contenu centré :
```tsx
<Container>
  {children}
</Container>
```
- `max-w-6xl`
- `px-5 sm:px-6 lg:px-8`

### Marges / padding des sections
- **Mobile :** `px-8 pt-8`
- **Desktop :** `md:px-[120px] md:pt-[120px]`
- **Bottom hero :** `pb-[90px]`

### Bordures de section
- `border-b border-umber/20` (header)
- `border-t border-umber/20` (footer)

---

## 4. Composants visuels

### Logo
- Fichier : `/brand/logo-black.svg`
- Tailles courantes : `w-7` (mobile), `md:w-9` (desktop) ou `h-8 w-8 sm:h-10 sm:w-10`

### Vidéos
- **Hero / ambiance :** `autoPlay muted loop playsInline preload="auto"`
- **Scroll-driven :** `muted playsInline preload="metadata"` (pas d’autoplay)
- Toujours : `object-cover` pour remplir le conteneur
- Overlay si besoin : `bg-[#EAE0D5]/20` ou `bg-parchment/20`
- Background des sections vidéo : `bg-[#EAE0D5]` ou `bg-parchment`

### Images
- Utiliser `next/image` avec `priority` pour les images above-the-fold
- `object-contain` pour les logos, `object-cover` pour les visuels pleine largeur

---

## 5. Accessibilité

- `aria-label` sur les liens logo
- `aria-labelledby` sur les sections avec titre
- `aria-hidden` sur les éléments décoratifs (vidéos, overlays)
- `role="presentation"` pour les médias purement décoratifs
- Focus visible : `focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2`

---

## 6. Animations et transitions

- **Principe :** Animations fluides, pas de transitions brusques
- Privilégier `requestAnimationFrame` pour les animations scroll-driven
- Éviter les librairies lourdes ; rester léger et performant

---

## 7. Bonnes pratiques

- **Pas de couleurs hors palette** — pas de `#000`, `#fff` sauf cas exceptionnels
- **Pas de fade in/out brutaux** — transitions douces ou aucune
- **Performance** — `preload="metadata"` pour les vidéos non critiques
- **Pas d’overlay superflu** — seulement si le design le demande
- **Layout stable** — éviter les layout shifts ; dimensions explicites quand possible

---

## Références

| Fichier | Rôle |
|---------|------|
| `app/globals.css` | Variables CSS, font-face, base |
| `tailwind.config.ts` | Couleurs, fontFamily |
| `components/Container.tsx` | Layout centré |
| `components/Hero.tsx` | Exemple de section pleine page |
