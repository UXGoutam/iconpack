# Vantage Circle — Logo Style Guide

CSS specifications and usage rules for implementing the Vantage Circle logo consistently across all surfaces.

---

## Table of Contents

1. [Logo Asset](#logo-asset)
2. [Colors](#colors)
3. [Sizing & Clear Space](#sizing--clear-space)
4. [CSS Implementation](#css-implementation)
5. [Usage on Backgrounds](#usage-on-backgrounds)
6. [Do's and Don'ts](#dos-and-donts)
7. [Accessibility](#accessibility)

---

## Logo Asset

| Property      | Value                                  |
|---------------|----------------------------------------|
| File          | `vc-logo.png`                          |
| Format        | PNG, 8-bit RGBA                        |
| Dimensions    | 713 × 104 px                           |
| Aspect ratio  | 6.86 : 1 (width : height)             |
| Asset type    | White silhouette on transparent bg     |
| Location      | `public/vc-logo.png`                   |

> **Important:** The PNG asset is a white silhouette. It is not meant to be rendered as-is on light backgrounds. Always apply the brand color via the CSS `mask-image` technique described below.

---

## Colors

### Primary brand color

```
#29294C
```

| Role              | Hex       | Usage                                      |
|-------------------|-----------|--------------------------------------------|
| Primary (dark)    | `#29294C` | Logo on white or light gray backgrounds    |
| White             | `#FFFFFF` | Logo on dark or brand-colored backgrounds  |

No other colors are permitted for the logo.

---

## Sizing & Clear Space

### Recommended sizes

| Context             | Height | Width (auto) |
|---------------------|--------|--------------|
| Top-bar / header    | 28 px  | ~192 px      |
| Compact header      | 22 px  | ~151 px      |
| Footer              | 20 px  | ~137 px      |
| Email / documents   | 32 px  | ~219 px      |
| Minimum size        | 18 px  | ~123 px      |

Width is calculated from the 6.86:1 aspect ratio — always maintain it.

```css
/* Always set height; let aspect ratio drive width */
.logo {
  height: 28px;
  width: 192px; /* 28 × 6.86 */
}
```

### Clear space

Maintain a minimum clear space equal to the cap-height of the logo on all four sides. As a practical rule, leave at least **16 px** around the logo at standard header sizes.

```
┌──────────────────────────┐
│   ← 16px →               │
│         [LOGO]            │
│   ← 16px →               │
└──────────────────────────┘
```

---

## CSS Implementation

The logo PNG is a white silhouette on a transparent background. Use the CSS `mask-image` technique to render it in any color on any background — no separate color variants of the asset are needed.

### How it works

The PNG acts as a transparency stencil. The element's `background-color` fills through the stencil, producing the logo in exactly that color.

```css
.logo {
  display: block;
  height: 28px;
  width: 192px;

  /* Brand color fills the stencil */
  background-color: #29294C;

  /* PNG provides the shape mask */
  -webkit-mask-image: url(/vc-logo.png);
          mask-image: url(/vc-logo.png);

  -webkit-mask-size: contain;
          mask-size: contain;

  -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;

  -webkit-mask-position: left center;
          mask-position: left center;

  flex-shrink: 0; /* prevent squishing inside flex containers */
}
```

### Full HTML snippet

```html
<a href="/" aria-label="Vantage Circle — home">
  <span
    class="logo"
    role="img"
    aria-label="Vantage Circle"
  ></span>
</a>
```

### White variant (for dark or brand-colored backgrounds)

```css
.logo--white {
  background-color: #FFFFFF;
}
```

### Dark mode

```css
/* Class-based (e.g., Tailwind "dark" on <html>) */
.dark .logo {
  background-color: #FFFFFF;
}

/* Media query */
@media (prefers-color-scheme: dark) {
  .logo {
    background-color: #FFFFFF;
  }
}
```

---

## Usage on Backgrounds

| Background                | Logo color    | CSS value              |
|---------------------------|---------------|------------------------|
| White `#FFFFFF`           | Brand primary | `background-color: #29294C` |
| Light gray `#F3F4F6`      | Brand primary | `background-color: #29294C` |
| Dark `#111827`            | White         | `background-color: #FFFFFF` |
| Brand `#29294C`           | White         | `background-color: #FFFFFF` |
| Any photo / image         | White with drop shadow | See below     |

### Logo on image backgrounds

When the logo sits on a photograph or gradient, add a semi-transparent backing layer instead of changing the logo color:

```css
.logo-on-image-wrapper {
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.90);
  border-radius: 6px;
  backdrop-filter: blur(4px);
}

/* Logo inside uses brand primary as usual */
.logo-on-image-wrapper .logo {
  background-color: #29294C;
}
```

---

## Do's and Don'ts

### Do

```css
/* ✓ Correct: mask technique, brand color */
.logo {
  background-color: #29294C;
  mask-image: url(/vc-logo.png);
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: left center;
}
```

```css
/* ✓ Correct: white variant on dark bg */
.logo {
  background-color: #ffffff;
  mask-image: url(/vc-logo.png);
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: left center;
}
```

```css
/* ✓ Correct: maintain aspect ratio */
.logo {
  height: 28px;
  width: 192px; /* 28 × 6.86 */
}
```

### Don't

```css
/* ✕ Never render the PNG directly on a light background */
/* — the white silhouette becomes invisible */
img.logo { src: "vc-logo.png"; } /* invisible on white */
```

```css
/* ✕ Never use CSS filter to colorize */
/* — filter: hue-rotate() produces inaccurate colors */
.logo { filter: hue-rotate(240deg) saturate(2); }
```

```css
/* ✕ Never distort the aspect ratio */
.logo {
  width: 100%;   /* ← without a fixed height, this stretches */
  height: auto;
}
```

```css
/* ✕ Never use unofficial colors */
.logo { background-color: #000000; }  /* pure black — not brand */
.logo { background-color: #333333; }  /* off-brand dark */
```

```css
/* ✕ Never add drop shadows directly to the logo */
.logo { box-shadow: 0 2px 4px rgba(0,0,0,0.3); } /* use wrapper instead */
```

```css
/* ✕ Never scale below minimum size */
.logo { height: 14px; } /* too small — minimum is 18px */
```

---

## Accessibility

The logo is a meaningful image and must always have an accessible name.

```html
<!-- Option 1 — aria-label on the wrapping link (preferred) -->
<a href="/" aria-label="Vantage Circle — home">
  <span class="logo" role="img" aria-label="Vantage Circle"></span>
</a>

<!-- Option 2 — visually hidden text sibling -->
<a href="/">
  <span class="logo" aria-hidden="true"></span>
  <span class="sr-only">Vantage Circle</span>
</a>
```

```css
/* Screen-reader-only utility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

| Rule                                               | Reason                                    |
|----------------------------------------------------|-------------------------------------------|
| Always provide `aria-label` or `.sr-only` text     | Screen readers skip content-less elements |
| Use `role="img"` on the mask `<span>`              | Identifies the element as an image        |
| Do not use `aria-hidden="true"` on the logo link   | Hides the brand link from keyboard users  |

---

## Framework Quick Reference

### React / Next.js

```tsx
function VCLogo({ className = "" }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Vantage Circle"
      className={className}
      style={{
        display: "block",
        height: "28px",
        width: "192px",
        backgroundColor: "#29294C",
        WebkitMaskImage: "url(/vc-logo.png)",
        maskImage: "url(/vc-logo.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "left center",
        maskPosition: "left center",
        flexShrink: 0,
      }}
    />
  );
}
```

### Angular

```html
<!-- logo.component.html -->
<span
  role="img"
  aria-label="Vantage Circle"
  class="vc-logo"
></span>
```

```scss
// logo.component.scss
.vc-logo {
  display: block;
  height: 28px;
  width: 192px;
  background-color: #29294C;
  -webkit-mask-image: url('/assets/images/vc-logo.png');
          mask-image: url('/assets/images/vc-logo.png');
  -webkit-mask-size: contain;
          mask-size: contain;
  -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
  -webkit-mask-position: left center;
          mask-position: left center;
  flex-shrink: 0;
}
```

### Tailwind CSS

```html
<span
  role="img"
  aria-label="Vantage Circle"
  class="block shrink-0"
  style="
    height: 28px;
    width: 192px;
    background-color: #29294C;
    -webkit-mask-image: url(/vc-logo.png);
    mask-image: url(/vc-logo.png);
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: left center;
    mask-position: left center;
  "
></span>

<!-- Dark mode variant -->
<span
  class="block shrink-0 [background-color:#29294C] dark:[background-color:#ffffff]"
  style="..."
></span>
```

### Vue 3

```vue
<template>
  <span
    role="img"
    aria-label="Vantage Circle"
    :style="logoStyle"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ dark?: boolean }>()

const logoStyle = computed(() => ({
  display: 'block',
  height: '28px',
  width: '192px',
  backgroundColor: props.dark ? '#ffffff' : '#29294C',
  WebkitMaskImage: 'url(/vc-logo.png)',
  maskImage: 'url(/vc-logo.png)',
  WebkitMaskSize: 'contain',
  maskSize: 'contain',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskPosition: 'left center',
  maskPosition: 'left center',
  flexShrink: 0,
}))
</script>
```

---

## Browser Support

The `mask-image` property requires the `-webkit-` prefix for Safari and older Chrome. Always include both the prefixed and unprefixed declarations.

| Browser          | Support         |
|------------------|-----------------|
| Chrome 120+      | `mask-image` ✓  |
| Safari 15.4+     | `-webkit-mask-image` ✓ |
| Firefox 113+     | `mask-image` ✓  |
| Edge 120+        | `mask-image` ✓  |
| Safari < 15.4    | `-webkit-mask-image` ✓ |

Always write both:

```css
-webkit-mask-image: url(/vc-logo.png); /* Safari, older Chrome */
        mask-image: url(/vc-logo.png); /* Standard */
```
