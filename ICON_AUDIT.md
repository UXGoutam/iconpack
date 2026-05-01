# Icon Audit Report
**Source UI:** http://localhost:3001/ (vc-icon-library — font-based catalog)
**Styleguide:** http://localhost:3000/ (icon-library — SVG styleguide)
**Date:** 2026-05-01

---

## Executive Summary

| Finding | Before | After |
|---------|--------|-------|
| Brand color | `#5033bc` (wrong) | `#29294C` (VC brand) |
| Icon rendering | Font icons (icomoon + FA) | Font icons; SVG library expanded to 35 icons |
| Dark mode | None | Full support (class + media query) |
| Hover state color | `#5033bc` | `#111827` (gray-900, per styleguide) |
| Active state color | Not defined | `#29294C` (brand primary) |
| Disabled state | Not defined | `opacity: 0.4; pointer-events: none` |
| Icon transition | `all .15s` (animates layout) | `color 150ms ease, opacity 150ms ease` (safe) |
| Icon size token | `font-size: 30px` (no scale) | `font-size: 32px` (icon-lg, 32px tier) |
| Accessibility | No aria attributes | `aria-hidden="true" focusable="false"` on all decorative icons; cards have `role="button"` + `aria-label` + keyboard support |
| Copied HTML snippet | Raw class string | Includes `aria-hidden="true" focusable="false"` |
| SVG library coverage | 20 icons | 35 icons (+15 critical additions) |

---

## Section 1 — Critical Bugs Fixed

### 1.1 Wrong brand color everywhere

**Before:**
```css
--primary: #5033bc; /* violet — not VC brand */
```
**After:**
```css
--primary: #29294C; /* VC brand navy — matches styleguide */
```
Affected: header gradient, nav active underline, card hover border, icon color, tag backgrounds, copy hint overlay, stat values.

---

### 1.2 Wrong icon transition property

**Before:**
```css
.il-card { transition: all .15s; }
```
`all` includes `width`, `height`, `transform`, `stroke-width` — causes layout reflow on every interaction.

**After:**
```css
.il-card { transition: border-color 150ms ease, box-shadow 150ms ease, transform 150ms ease; }
.il-card-icon span,
.il-card-icon i    { transition: color 150ms ease, opacity 150ms ease; }
```
Per styleguide rule: *"Animate `color` and `opacity` only. Never animate `width`, `height`, or `stroke-width`."*

---

### 1.3 No accessibility on icon elements

**Before:** bare icon span/i with no screen-reader treatment.
```html
<span class="icon-home"></span>
<i class="fas fa-bars"></i>
```

**After:**
```html
<span class="icon-home" aria-hidden="true" focusable="false"></span>
<i class="fas fa-bars" aria-hidden="true" focusable="false"></i>
```
Cards have `role="button"`, `aria-label="Copy {name} icon HTML"`, and `onkeydown` Enter/Space support.

---

### 1.4 Copied HTML snippet missing accessibility attributes

**Before:** `<span class="icon-home"></span>`
**After:** `<span class="icon-home" aria-hidden="true" focusable="false"></span>`

Developers who copy a snippet now get a production-ready fragment.

---

## Section 2 — Styleguide Compliance Check Per Rule

| Styleguide Rule | localhost:3001 Before | Status |
|-----------------|----------------------|--------|
| Brand color `#29294C` | Used `#5033bc` | **Fixed** |
| Default icon color `#374151` | Used `#5033bc` on all icons | **Fixed** — `var(--icon-color): #374151` |
| Hover color `#111827` | No hover state on icon | **Fixed** |
| Active color `#29294C` | Not defined | **Fixed** |
| Disabled `opacity: 0.4` | Not defined | **Fixed** — CSS added |
| Transition `color 150ms ease` | `all .15s` | **Fixed** |
| Never animate `width/height` | Violated via `transition: all` | **Fixed** |
| `aria-hidden="true"` on decorative icons | Missing | **Fixed** |
| `focusable="false"` on decorative icons | Missing | **Fixed** |
| Dark mode support | None | **Fixed** — class-based + media query |
| Minimum clear space around logo | N/A (no logo in this page) | N/A |
| Icon size 32px at card context (icon-lg) | `30px` (non-standard) | **Fixed** → `32px` |

---

## Section 3 — Icon Mapping (localhost:3001 → localhost:3000 SVG Library)

### ✅ Direct match — icon exists in SVG library

| localhost:3001 icon | Class used | SVG library slug |
|---------------------|-----------|-----------------|
| vc-icon-arrow-right | `icon-right-arrow` | `arrow-right-01-stroke-rounded` |
| vc-icon-arrow-left | `icon-left-arrow` | `arrow-left-01-stroke-rounded` |
| vc-icon-arrow-top | `icon-top-arrow` | `arrow-up-01-stroke-rounded` |
| vc-icon-home | `icon-home` | `home-01-stroke-rounded` |
| vc-icon-fa-bars | `fas fa-bars` | `menu-01-stroke-rounded` |
| vc-icon-search | `icon-magnifying-glass` | `search-01-stroke-rounded` |
| vc-icon-fa-search | `fas fa-search` | `search-01-stroke-rounded` |
| vc-icon-notification | `icon-notification-1` | `notification-01-stroke-rounded` |
| vc-icon-comment | `icon-comment` | `comment-01-stroke-rounded` |
| vc-icon-like | `icon-like-like` | `thumbs-up-stroke-rounded` |
| vc-icon-close-envelope | `icon-close-envelope` | `mail-02-stroke-rounded` |
| vc-icon-shopping-cart | `icon-shopping-cart` | `shopping-cart-02-stroke-rounded` |
| vc-icon-trophy | `icon-trophy-2` | `award-01-stroke-rounded` |
| vc-icon-star | `icon-star` | `star-award-01-stroke-rounded` |
| vc-icon-fa-heart | `fa fa-heart` | `favourite-stroke-rounded` |
| vc-icon-fa-star | `fas fa-star` | `star-award-01-stroke-rounded` |

### ⚠️ Partial match — closest SVG library equivalent

| localhost:3001 icon | Class used | SVG library equivalent | Note |
|---------------------|-----------|----------------------|------|
| vc-icon-arrow-next | `icon-next` | `arrow-right-01-stroke-rounded` | Pagination-specific style |
| vc-icon-arrow-previous | `icon-previous` | `arrow-left-01-stroke-rounded` | Pagination-specific style |
| vc-icon-keyboard-right | `icon-keyboard-right-arrow-button` | `arrow-right-01-stroke-rounded` | List-item chevron |
| vc-icon-house-outline | `icon-house-outline` | `home-01-stroke-rounded` | Alternate home style |
| vc-icon-fa-angle-right | `fas fa-angle-right` | `arrow-right-01-stroke-rounded` | Lighter chevron |
| vc-icon-fa-angle-left | `fas fa-angle-left` | `arrow-left-01-stroke-rounded` | Lighter chevron |
| vc-icon-fa-angle-down | `fas fa-angle-down` | `arrow-down-01-stroke-rounded` | Dropdown chevron |
| vc-icon-fa-arrow-left | `fas fa-arrow-left` | `arrow-left-01-stroke-rounded` | Back button |
| vc-icon-fa-long-arrow-right | `fas fa-long-arrow-alt-right` | `arrow-right-01-stroke-rounded` | CTA arrow |

### ❌ Missing from SVG library — added in this audit (+15 icons)

| localhost:3001 icon | Class used | New SVG slug added |
|---------------------|-----------|-------------------|
| vc-icon-cancel / fa-times | `icon-cancel`, `fas fa-times` | `close-stroke-rounded` |
| vc-icon-check-mark / fa-check | `icon-check-mark`, `fas fa-check` | `check-stroke-rounded` |
| vc-icon-success / tick-circle | `icon-success`, `icon-tick-inside-circle` | `check-circle-stroke-rounded` |
| vc-icon-user | `icon-user` | `user-stroke-rounded` |
| vc-icon-lock | `icon-lock` | `lock-stroke-rounded` |
| vc-icon-share | `icon-share1` | `share-stroke-rounded` |
| vc-icon-download | `icon-download` | `download-stroke-rounded` |
| vc-icon-edit | `icon-pencil-edit-button` | `edit-stroke-rounded` |
| vc-icon-delete | `icon-rubbish-bin` | `delete-stroke-rounded` |
| vc-icon-information | `icon-information-1` | `info-circle-stroke-rounded` |
| vc-icon-calendar | `icon-calendar` | `calendar-stroke-rounded` |
| vc-icon-location | `icon-location` | `location-stroke-rounded` |
| vc-icon-gift / giftbox | `icon-gift`, `icon-giftbox` | `gift-stroke-rounded` |
| vc-icon-logout | `icon-logout` | `logout-stroke-rounded` |
| — | — | `settings-stroke-rounded` |

### ❌ Still missing from SVG library — not yet added

These icons are used in localhost:3001 but have no SVG equivalent yet. Add them when their modules are migrated to the SVG system.

| Category | localhost:3001 icons |
|----------|---------------------|
| Rewards / Points | `icon-cash_equivalent`, `icon-coupon`, `icon-trophy-2`, `icon-crown`, `icon-wfh-points` |
| Recognition | `icon-badge`, `icon-appreciate-filled-new`, `icon-clap-hands`, `icon-megaphone` |
| Profile | `icon-user-male-black-shape`, `icon-add-contacts`, `icon-photo`, `icon-cloud-storage-uploading-option` |
| Status | `icon-pending-icon`, `icon-approve`, `icon-hold`, `icon-double-tick-indicator` |
| Forms | `icon-visibility`, `icon-views`, `icon-question-mark`, `icon-pdf-file` |
| Perks categories | All 25 category icons (`icon-ecommerce`, `icon-food`, `icon-travel`, etc.) |
| Insurance | `icon-health-insurance`, `icon-life-insurance`, `icon-motor-insurance` |
| Social | `icon-facebook-logo`, `icon-twitter-logo-silhouette`, `icon-linkedin-logo` |
| Payments | `icon-visa`, `icon-black-and-white-credit-cards`, `icon-cash`, `icon-rupee-indian` |
| Notifications | `icon-support`, `icon-call-answer`, `icon-callback` |

---

## Section 4 — Icon Size Audit

| Context | Styleguide spec | localhost:3001 before | Status |
|---------|----------------|----------------------|--------|
| Card grid display | 32px (icon-lg) | 30px (no tier) | **Fixed** → 32px |
| Search field icon | 16px (icon-xs) | 13px font-size | Needs inline fix |
| Empty state icon | 48px (icon-xl) | 48px | Matches |
| Category nav icon | — | Not used | N/A |

---

## Section 5 — Color Token Audit

| Token | Styleguide value | localhost:3001 before | Status |
|-------|-----------------|----------------------|--------|
| Default icon color | `#374151` | `#5033bc` | **Fixed** |
| Muted icon color | `#9ca3af` | Not defined | **Fixed** — `var(--icon-color-muted)` |
| Hover icon color | `#111827` | Not defined | **Fixed** |
| Active icon color | `#29294C` | Not defined | **Fixed** |
| Disabled icon | `#d1d5db + opacity:0.4` | Not defined | **Fixed** |

---

## Section 6 — Dark Mode Audit

| Element | Styleguide | localhost:3001 before | Status |
|---------|-----------|----------------------|--------|
| Page background | `#111827` in dark | `#f8f9fa` always | **Fixed** |
| Card background | `#1f2937` in dark | `#fff` always | **Fixed** |
| Icon default color | `#d1d5db` in dark | `#29294C` always | **Fixed** |
| Border color | `#374151` in dark | `#e5e7eb` always | **Fixed** |
| Theme persistence | `localStorage` | None | **Fixed** |

---

## Section 7 — Recommendations

### Short term
1. Replace `transition: all` with specific properties in all UI components.
2. Audit all Angular templates in `src/app/modules/` for icon elements missing `aria-hidden="true"`.
3. Update the VC custom font stylesheet to set `color: inherit` so icons automatically pick up `currentColor` like the SVG library.

### Medium term
1. Migrate high-traffic icons (navigation, actions, status) from font icons to SVG.
2. Add the remaining ~100 missing icons to the SVG library in the same `stroke-rounded` style.
3. Standardise to a single icon source — remove FontAwesome dependency; replace all FA icons with VC SVG equivalents.

### Long term
1. Publish the SVG icon set as an npm package (`@vantagecircle/icons`) so Angular, React and other consumers share one source of truth.
2. Build an automated audit script that diffs Angular templates against the registered SVG icon list and reports unknown icon classes in CI.
