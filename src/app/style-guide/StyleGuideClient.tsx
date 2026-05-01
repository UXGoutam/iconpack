"use client";

import { useState } from "react";
import Link from "next/link";
import CopySnippet from "@/components/CopySnippet";

/* ── Inline SVG previews ── */
const MAIL_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M7 8.5L9.94 10.24C11.66 11.25 12.34 11.25 14.06 10.24L17 8.5"/>
  <path d="M2.02 13.48C2.08 16.54 2.11 18.07 3.24 19.21C4.38 20.34 5.95 20.38 9.1 20.46C11.04 20.51 12.96 20.51 14.9 20.46C18.05 20.38 19.62 20.34 20.76 19.21C21.89 18.07 21.92 16.54 21.98 13.48C22 12.49 22 11.51 21.98 10.52C21.92 7.46 21.89 5.93 20.76 4.79C19.62 3.66 18.05 3.62 14.9 3.54C12.96 3.49 11.04 3.49 9.1 3.54C5.95 3.62 4.38 3.66 3.24 4.79C2.11 5.93 2.08 7.46 2.02 10.52C2 11.51 2 12.49 2.02 13.48Z"/>
</svg>`;

const HOME_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M3 12V14.5C3 17.8 3 19.45 4.03 20.47C5.05 21.5 6.7 21.5 10 21.5H14C17.3 21.5 18.95 21.5 19.97 20.47C21 19.45 21 17.8 21 14.5V12C21 10.31 21 9.47 20.64 8.74C20.29 8.01 19.62 7.5 18.3 6.46L16.3 4.91C14.23 3.3 13.2 2.5 12 2.5C10.8 2.5 9.77 3.3 7.7 4.91L5.7 6.46C4.38 7.5 3.71 8.01 3.36 8.74C3 9.47 3 10.31 3 12Z"/>
  <path d="M15 17C14.2 17.62 13.15 18 12 18C10.85 18 9.8 17.62 9 17"/>
</svg>`;

const SEARCH_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M17 17L21 21"/>
  <path d="M19 11C19 6.58 15.42 3 11 3C6.58 3 3 6.58 3 11C3 15.42 6.58 19 11 19C15.42 19 19 15.42 19 11Z"/>
</svg>`;

const BELL_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M15.5 18C15.5 19.93 13.93 21.5 12 21.5C10.07 21.5 8.5 19.93 8.5 18"/>
  <path d="M19.23 18H4.77C3.79 18 3 17.21 3 16.23C3 15.76 3.19 15.31 3.52 14.98L4.12 14.38C4.68 13.81 5 13.05 5 12.26V9.5C5 5.63 8.13 2.5 12 2.5C15.87 2.5 19 5.63 19 9.5V12.26C19 13.05 19.32 13.81 19.88 14.38L20.48 14.98C20.81 15.31 21 15.76 21 16.23C21 17.21 20.21 18 19.23 18Z"/>
</svg>`;

function InlineSvg({ svg, size = 24, strokeWidth = 1.5, color = "currentColor" }: {
  svg: string; size?: number; strokeWidth?: number; color?: string;
}) {
  const patched = svg
    .replace(/width="[^"]*"/, `width="${size}"`)
    .replace(/height="[^"]*"/, `height="${size}"`)
    .replace(/stroke="currentColor"/g, `stroke="${color}"`)
    .replace(/stroke-width="[^"]*"/g, `stroke-width="${strokeWidth}"`);
  return <span dangerouslySetInnerHTML={{ __html: patched }} className="inline-flex items-center justify-center" />;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">{children}</p>
    </div>
  );
}

function SpecRow({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="flex items-start gap-4 py-3 border-b border-gray-100 dark:border-gray-700/60 last:border-0 px-5">
      <span className="text-sm text-gray-500 dark:text-gray-400 w-44 shrink-0">{label}</span>
      <code className="text-sm font-mono text-gray-900 dark:text-gray-100 flex-1">{value}</code>
      {note && <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0 max-w-[180px] text-right">{note}</span>}
    </div>
  );
}

/* ──────────────── Code snippets ──────────────── */

const SNIPPET_STRUCTURE = `<!-- Every icon is an inline SVG with these attributes: -->
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  width="24"
  height="24"
  fill="none"
  stroke="currentColor"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="..." />
</svg>

<!--
  Key attributes:
  • fill="none"            — icons are stroke-only, never filled
  • stroke="currentColor"  — inherits color from CSS
  • viewBox="0 0 24 24"   — fixed 24×24 grid, scale freely via width/height
  • stroke-linecap="round" — rounded caps on all strokes
  • stroke-linejoin="round"— rounded joins at path corners
-->`;

const SNIPPET_SIZING = `/* ── Icon size system ──
   Always set width and height equally (icons are square).
   The viewBox is 24×24, so any equal px value scales cleanly.
*/

.icon-xs  { width: 16px; height: 16px; }   /* dense lists, tags        */
.icon-sm  { width: 20px; height: 20px; }   /* inline text, buttons     */
.icon-md  { width: 24px; height: 24px; }   /* default — nav, cards     */
.icon-lg  { width: 32px; height: 32px; }   /* section headings         */
.icon-xl  { width: 48px; height: 48px; }   /* empty states, hero       */
.icon-2xl { width: 64px; height: 64px; }   /* illustrations            */

/* ✓ Always use equal width/height — icons are 1:1 */
svg { width: 24px; height: 24px; }

/* ✕ Never set only one dimension without the other */
/* svg { width: 24px; }  — leaves height at intrinsic value */`;

const SNIPPET_COLOR = `/* ── Colouring icons ──
   Icons use stroke="currentColor", so set color on the
   parent element or directly on the svg.
*/

/* Via parent (preferred) */
.icon-container {
  color: #29294C;          /* svg inside inherits this */
}

/* Directly on svg */
svg {
  color: #6b7280;
}

/* Override stroke directly when you need full control */
svg {
  stroke: #ef4444;         /* bypasses currentColor */
}

/* States */
.btn svg         { color: inherit; }
.btn:hover svg   { color: #29294C; }
.btn:disabled svg{ color: #d1d5db; opacity: 0.5; }

/* Dark mode — just change the parent color */
.dark .icon-container { color: #e5e7eb; }`;

const SNIPPET_STROKE = `/* ── Stroke width scale ──
   Default is 1.5. Go thinner for large sizes, thicker for small.
   Apply via the stroke-width SVG attribute or CSS property.
*/

/* CSS override — works on all child paths automatically */
svg { stroke-width: 1.5; }    /* default           */
svg { stroke-width: 1;   }    /* thin / large icons*/
svg { stroke-width: 2;   }    /* bold / small icons*/
svg { stroke-width: 2.5; }    /* heavy emphasis    */

/* Per-size recommendations */
.icon-xs  { stroke-width: 2;   }   /* 16px — thicker for legibility */
.icon-sm  { stroke-width: 1.5; }   /* 20px — default                */
.icon-md  { stroke-width: 1.5; }   /* 24px — default                */
.icon-lg  { stroke-width: 1;   }   /* 32px — thinner looks balanced */
.icon-xl  { stroke-width: 1;   }   /* 48px — thin & airy            */`;

const SNIPPET_BUTTON = `/* ── Icon inside a button ──
   Flex-align the icon with the label, and let color inherit.
*/

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #374151;          /* icon and text share this */
}

.btn svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;          /* prevent icon from squishing */
}

.btn:hover { color: #29294C; }

/* Icon-only button */
.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  color: #6b7280;
  transition: background 150ms, color 150ms;
}

.btn-icon:hover {
  background: #f3f4f6;
  color: #111827;
}

.btn-icon svg {
  width: 20px;
  height: 20px;
}`;

const SNIPPET_TRANSITION = `/* ── Transitions & interaction ──
   Animate color and opacity — never width/height (causes reflow).
*/

svg {
  transition: color 150ms ease, opacity 150ms ease;
}

/* Hover colour shift */
.nav-item svg      { color: #9ca3af; }
.nav-item:hover svg{ color: #111827; }

/* Active / selected state */
.nav-item.active svg { color: #29294C; stroke-width: 2; }

/* Loading / disabled */
.loading svg { opacity: 0.4; }

/* Spin animation — loading indicators only */
@keyframes spin {
  to { transform: rotate(360deg); }
}
.icon-spin { animation: spin 1s linear infinite; }

/* ✕ Never animate stroke-width or viewBox */`;

const SNIPPET_DARK = `/* ── Dark mode ──
   Icons use currentColor, so dark mode is just a color change
   on the ancestor — no per-icon overrides needed.
*/

/* Class-based dark mode (Tailwind "dark" class on <html>) */
.dark body          { color: #f9fafb; }  /* all icons inherit */
.dark .icon-muted   { color: #6b7280; }
.dark .icon-subtle  { color: #4b5563; }

/* media-query based dark mode */
@media (prefers-color-scheme: dark) {
  .icon-container { color: #e5e7eb; }
}

/* Tailwind utility shorthand */
/* <svg class="text-gray-600 dark:text-gray-300"> */`;

const SNIPPET_ACCESSIBILITY = `<!-- ── Accessibility ──
   Decorative icons (next to visible text): hide from screen readers.
   Standalone icons (no visible label): provide aria-label.
-->

<!-- Decorative — aria-hidden="true" -->
<button>
  <svg aria-hidden="true" focusable="false" ...>...</svg>
  Save changes
</button>

<!-- Standalone — aria-label on the button, not the svg -->
<button aria-label="Search">
  <svg aria-hidden="true" focusable="false" ...>...</svg>
</button>

<!-- If you must label the svg directly -->
<svg role="img" aria-label="Notification bell">
  <title>Notification bell</title>
  ...
</svg>`;

const SNIPPET_TAILWIND = `<!-- ── Tailwind CSS utilities ──
   These class patterns map directly to the CSS spec above.
-->

<!-- Size -->
<svg class="w-4 h-4">...</svg>   <!-- 16px -->
<svg class="w-5 h-5">...</svg>   <!-- 20px -->
<svg class="w-6 h-6">...</svg>   <!-- 24px — default -->
<svg class="w-8 h-8">...</svg>   <!-- 32px -->
<svg class="w-12 h-12">...</svg> <!-- 48px -->

<!-- Color via currentColor -->
<svg class="text-gray-500 hover:text-gray-900 transition-colors">...</svg>

<!-- Dark mode -->
<svg class="text-gray-600 dark:text-gray-300">...</svg>

<!-- Stroke width override -->
<svg style="stroke-width: 2">...</svg>

<!-- Icon + label button -->
<button class="inline-flex items-center gap-2 text-gray-700">
  <svg class="w-5 h-5 shrink-0">...</svg>
  <span>Send email</span>
</button>`;

/* ═══════════════════════════════════════════════════════════ */

export default function StyleGuideClient() {
  const [previewStroke, setPreviewStroke] = useState(1.5);
  const [previewColor, setPreviewColor] = useState("#374151");

  const sizes = [
    { label: "XS",  px: 16, cls: "icon-xs",  usage: "Dense lists, tag chips" },
    { label: "SM",  px: 20, cls: "icon-sm",  usage: "Inline text, buttons" },
    { label: "MD",  px: 24, cls: "icon-md",  usage: "Default — nav, cards" },
    { label: "LG",  px: 32, cls: "icon-lg",  usage: "Section headings" },
    { label: "XL",  px: 48, cls: "icon-xl",  usage: "Empty states, hero" },
    { label: "2XL", px: 64, cls: "icon-2xl", usage: "Illustrations" },
  ];

  const strokes = [0.5, 1, 1.5, 2, 2.5];
  const colors = ["#111827", "#374151", "#6b7280", "#29294C", "#3b82f6", "#ef4444", "#22c55e"];

  const navItems = [
    { href: "#structure",    label: "SVG Structure" },
    { href: "#sizing",       label: "Sizing" },
    { href: "#stroke",       label: "Stroke Width" },
    { href: "#color",        label: "Color" },
    { href: "#buttons",      label: "In Buttons" },
    { href: "#interaction",  label: "Interaction" },
    { href: "#dark",         label: "Dark Mode" },
    { href: "#a11y",         label: "Accessibility" },
    { href: "#tailwind",     label: "Tailwind" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

      {/* Page header */}
      <div className="mb-10 pb-8 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-3 uppercase tracking-wider font-medium">
          <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Icons</Link>
          <span>/</span>
          <span className="text-gray-700 dark:text-gray-300">CSS Style Guide</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Icon CSS Style Guide</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-2xl">
          CSS specs for implementing Vantage icons consistently across any project.
          Copy the snippets directly into your stylesheet.
        </p>
      </div>

      <div className="flex gap-10">

        {/* Side nav */}
        <aside className="hidden lg:block w-44 shrink-0">
          <div className="sticky top-20">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">Sections</p>
            <nav className="space-y-0.5">
              {navItems.map((n) => (
                <a key={n.href} href={n.href}
                  className="block text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 py-1.5 transition-colors">
                  {n.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-14">

          {/* ── SVG Structure ── */}
          <section id="structure" className="scroll-mt-20">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">SVG Structure</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">Every icon follows the same markup contract. These attributes must not be removed.</p>

            <Card className="mb-4">
              <CardHeader>Required SVG attributes</CardHeader>
              <SpecRow label="viewBox"           value='viewBox="0 0 24 24"'          note="Fixed 24×24 grid — never change" />
              <SpecRow label="fill"              value='fill="none"'                  note="Icons are stroke-only, no fills" />
              <SpecRow label="stroke"            value='stroke="currentColor"'        note="Inherits color from CSS" />
              <SpecRow label="stroke-width"      value='stroke-width="1.5"'           note="Default — override via CSS" />
              <SpecRow label="stroke-linecap"    value='stroke-linecap="round"'       note="Rounded caps on all strokes" />
              <SpecRow label="stroke-linejoin"   value='stroke-linejoin="round"'      note="Rounded joins at corners" />
            </Card>

            <CopySnippet code={SNIPPET_STRUCTURE} language="html" />
          </section>

          {/* ── Sizing ── */}
          <section id="sizing" className="scroll-mt-20">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">Sizing</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">Icons live on a 24×24 grid and are square — always set <code className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">width</code> and <code className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">height</code> equally.</p>

            <Card className="mb-4">
              <CardHeader>Size scale</CardHeader>
              {sizes.map((s, i) => (
                <div key={s.label} className={`flex items-center gap-5 px-5 py-3.5 ${i < sizes.length - 1 ? "border-b border-gray-100 dark:border-gray-700/60" : ""}`}>
                  <span className="text-xs font-bold text-gray-400 dark:text-gray-500 w-8 uppercase">{s.label}</span>
                  <span className="w-16 flex items-center justify-start">
                    <InlineSvg svg={MAIL_SVG} size={s.px} color="#374151" />
                  </span>
                  <code className="text-xs font-mono text-gray-500 dark:text-gray-400 w-32">{s.px}×{s.px}px</code>
                  <span className="text-xs text-gray-400 dark:text-gray-500">{s.usage}</span>
                </div>
              ))}
            </Card>

            <CopySnippet code={SNIPPET_SIZING} language="css" />
          </section>

          {/* ── Stroke Width ── */}
          <section id="stroke" className="scroll-mt-20">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">Stroke Width</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">Default is <code className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">1.5</code>. Override via CSS — it propagates to all child <code className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">path</code> and <code className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">circle</code> elements automatically.</p>

            {/* Interactive preview */}
            <Card className="mb-4">
              <CardHeader>Live preview — drag to adjust</CardHeader>
              <div className="p-6">
                <div className="flex items-end gap-8 mb-6 flex-wrap">
                  {strokes.map((sw) => (
                    <div key={sw} className="flex flex-col items-center gap-2">
                      <InlineSvg svg={HOME_SVG} size={32} strokeWidth={sw} color="#374151" />
                      <span className="text-xs font-mono text-gray-400 dark:text-gray-500">{sw}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-400 dark:text-gray-500 w-24">stroke-width:</span>
                  <input
                    type="range" min={0.5} max={3} step={0.5}
                    value={previewStroke}
                    onChange={(e) => setPreviewStroke(Number(e.target.value))}
                    className="flex-1 accent-gray-900 dark:accent-gray-100"
                  />
                  <code className="text-sm font-mono text-gray-700 dark:text-gray-300 w-8">{previewStroke}</code>
                  <InlineSvg svg={SEARCH_SVG} size={28} strokeWidth={previewStroke} color="#374151" />
                </div>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-700/60">
                <SpecRow label="Default"      value="stroke-width: 1.5" note="All icons" />
                <SpecRow label="Thin (large)" value="stroke-width: 1"   note="32px and above" />
                <SpecRow label="Bold (small)" value="stroke-width: 2"   note="16px for legibility" />
                <SpecRow label="Heavy"        value="stroke-width: 2.5" note="High-emphasis only" />
              </div>
            </Card>

            <CopySnippet code={SNIPPET_STROKE} language="css" />
          </section>

          {/* ── Color ── */}
          <section id="color" className="scroll-mt-20">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">Color</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">Icons use <code className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">stroke="currentColor"</code> — set <code className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">color</code> on the parent and every icon inside inherits it.</p>

            {/* Color picker preview */}
            <Card className="mb-4">
              <CardHeader>Live preview</CardHeader>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-5 flex-wrap">
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setPreviewColor(c)}
                      title={c}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${previewColor === c ? "scale-110 border-gray-700 dark:border-gray-200" : "border-transparent hover:scale-105"}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                  <label className="w-7 h-7 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer flex items-center justify-center overflow-hidden" title="Custom">
                    <span className="text-xs text-gray-400">+</span>
                    <input type="color" value={previewColor} onChange={(e) => setPreviewColor(e.target.value)} className="absolute opacity-0 w-0 h-0" />
                  </label>
                </div>
                <div className="flex items-center gap-6" style={{ color: previewColor }}>
                  <InlineSvg svg={MAIL_SVG}   size={28} strokeWidth={1.5} color={previewColor} />
                  <InlineSvg svg={HOME_SVG}   size={28} strokeWidth={1.5} color={previewColor} />
                  <InlineSvg svg={SEARCH_SVG} size={28} strokeWidth={1.5} color={previewColor} />
                  <InlineSvg svg={BELL_SVG}   size={28} strokeWidth={1.5} color={previewColor} />
                  <code className="text-xs font-mono ml-2 text-gray-400 dark:text-gray-500">{previewColor}</code>
                </div>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-700/60">
                <SpecRow label="Default"   value="color: #374151"  note="gray-700 — most contexts" />
                <SpecRow label="Muted"     value="color: #9ca3af"  note="gray-400 — placeholders, inactive" />
                <SpecRow label="Emphasis"  value="color: #111827"  note="gray-900 — hover, active, selected" />
                <SpecRow label="Disabled"  value="color: #d1d5db; opacity: 0.5" note="gray-300 + 50% opacity" />
                <SpecRow label="Danger"    value="color: #ef4444"  note="red-500 — destructive actions" />
              </div>
            </Card>

            <CopySnippet code={SNIPPET_COLOR} language="css" />
          </section>

          {/* ── In Buttons ── */}
          <section id="buttons" className="scroll-mt-20">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">Icons in Buttons</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">Align with flexbox, add <code className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">shrink-0</code> so the icon never squishes, and let <code className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">color</code> inherit.</p>

            <Card className="mb-4">
              <CardHeader>Live examples</CardHeader>
              <div className="p-6 flex flex-wrap gap-3 items-center">
                {/* Icon + label */}
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-xl text-sm font-medium">
                  <InlineSvg svg={MAIL_SVG} size={16} strokeWidth={2} color="currentColor" />
                  Send email
                </button>
                {/* Icon-only */}
                <button className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <InlineSvg svg={SEARCH_SVG} size={18} strokeWidth={1.5} color="currentColor" />
                </button>
                {/* Ghost */}
                <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <InlineSvg svg={BELL_SVG} size={16} strokeWidth={2} color="currentColor" />
                  Notifications
                </button>
              </div>
            </Card>

            <CopySnippet code={SNIPPET_BUTTON} language="css" />
          </section>

          {/* ── Interaction ── */}
          <section id="interaction" className="scroll-mt-20">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">Interaction & Transition</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">Animate <code className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">color</code> and <code className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">opacity</code> only. Never animate <code className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">width</code>, <code className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">height</code>, or <code className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">stroke-width</code> — causes reflow.</p>

            <Card className="mb-4">
              <CardHeader>State examples — hover each</CardHeader>
              <div className="p-6 flex items-center gap-8 flex-wrap">
                {[
                  { label: "Default",  color: "#9ca3af", sw: 1.5 },
                  { label: "Hover",    color: "#111827", sw: 1.5 },
                  { label: "Active",   color: "#29294C", sw: 2   },
                  { label: "Disabled", color: "#d1d5db", sw: 1.5 },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col items-center gap-2">
                    <InlineSvg svg={HOME_SVG} size={24} strokeWidth={s.sw} color={s.color} />
                    <span className="text-xs text-gray-400 dark:text-gray-500">{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 dark:border-gray-700/60">
                <SpecRow label="Transition"    value="transition: color 150ms ease, opacity 150ms ease" />
                <SpecRow label="Hover"         value="color: #111827"   note="gray-900" />
                <SpecRow label="Active"        value="color: #29294C"   note="brand primary" />
                <SpecRow label="Disabled"      value="opacity: 0.4; pointer-events: none" />
                <SpecRow label="Never animate" value="width · height · stroke-width" note="causes layout reflow" />
              </div>
            </Card>

            <CopySnippet code={SNIPPET_TRANSITION} language="css" />
          </section>

          {/* ── Dark mode ── */}
          <section id="dark" className="scroll-mt-20">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">Dark Mode</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">No per-icon overrides needed. Change <code className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">color</code> on the ancestor — every icon inside adapts automatically via <code className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">currentColor</code>.</p>

            <Card className="mb-4">
              <CardHeader>Light vs dark</CardHeader>
              <div className="grid grid-cols-2">
                <div className="bg-white p-6 flex flex-col gap-3">
                  <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Light</span>
                  <div className="flex items-center gap-4">
                    {[MAIL_SVG, HOME_SVG, SEARCH_SVG, BELL_SVG].map((svg, i) => (
                      <InlineSvg key={i} svg={svg} size={22} strokeWidth={1.5} color="#374151" />
                    ))}
                  </div>
                  <code className="text-xs font-mono text-gray-400">color: #374151</code>
                </div>
                <div className="bg-gray-900 p-6 flex flex-col gap-3">
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Dark</span>
                  <div className="flex items-center gap-4">
                    {[MAIL_SVG, HOME_SVG, SEARCH_SVG, BELL_SVG].map((svg, i) => (
                      <InlineSvg key={i} svg={svg} size={22} strokeWidth={1.5} color="#d1d5db" />
                    ))}
                  </div>
                  <code className="text-xs font-mono text-gray-500">color: #d1d5db</code>
                </div>
              </div>
            </Card>

            <CopySnippet code={SNIPPET_DARK} language="css" />
          </section>

          {/* ── Accessibility ── */}
          <section id="a11y" className="scroll-mt-20">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">Accessibility</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">Decorative icons must be hidden from screen readers. Standalone icons must have a text label provided by the parent button or an <code className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">aria-label</code>.</p>

            <Card className="mb-4">
              <div className="border-b border-gray-100 dark:border-gray-700/60">
                <SpecRow label="Decorative icon"  value='aria-hidden="true" focusable="false"' note="Always — when next to visible text" />
                <SpecRow label="Standalone icon"  value='aria-label="…" on the <button>'       note="Label the control, not the svg" />
                <SpecRow label="Never"            value='alt="" on svg'                          note="SVG has no alt attribute" />
              </div>
            </Card>

            <CopySnippet code={SNIPPET_ACCESSIBILITY} language="html" />
          </section>

          {/* ── Tailwind ── */}
          <section id="tailwind" className="scroll-mt-20">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">Tailwind CSS Utilities</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">Direct mapping of the CSS spec to Tailwind utility classes.</p>

            <Card className="mb-4">
              <div className="border-b border-gray-100 dark:border-gray-700/60">
                <SpecRow label="16px"  value="w-4 h-4" />
                <SpecRow label="20px"  value="w-5 h-5" />
                <SpecRow label="24px"  value="w-6 h-6" note="Default" />
                <SpecRow label="32px"  value="w-8 h-8" />
                <SpecRow label="48px"  value="w-12 h-12" />
                <SpecRow label="Color" value="text-{color}" note="Sets currentColor" />
                <SpecRow label="Transition" value="transition-colors duration-150" />
                <SpecRow label="No shrink"  value="shrink-0" note="Always on icon inside flex" />
              </div>
            </Card>

            <CopySnippet code={SNIPPET_TAILWIND} language="html — tailwind" />
          </section>

        </div>
      </div>
    </div>
  );
}
