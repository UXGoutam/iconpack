import type { IconCustomization } from "@/types";

export function normalizeSvg(svgText: string, customization: IconCustomization): string {
  const { size, strokeWidth, color } = customization;

  let svg = svgText
    .replace(/width="[^"]*"/, `width="${size}"`)
    .replace(/height="[^"]*"/, `height="${size}"`);

  // Inject or replace color — convert hardcoded stroke/fill to currentColor then swap
  svg = svg.replace(/stroke="(?!none)[^"]*"/g, `stroke="${color}"`);
  svg = svg.replace(/fill="(?!none)[^"]*"/g, (match) => {
    // keep fill="none" untouched; replace actual fills
    return match.includes("none") ? match : `fill="${color}"`;
  });

  // Adjust stroke-width on all elements
  if (svg.includes("stroke-width=")) {
    svg = svg.replace(/stroke-width="[^"]*"/g, `stroke-width="${strokeWidth}"`);
  } else {
    // inject stroke-width onto path/circle/rect elements
    svg = svg.replace(/<(path|circle|rect|line|polyline|polygon|ellipse)\s/g, (m) => {
      return m + `stroke-width="${strokeWidth}" `;
    });
  }

  return svg;
}

export function downloadSvg(svgText: string, fileName: string): void {
  const blob = new Blob([svgText], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName}.svg`;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadPng(svgText: string, fileName: string, size: number = 512): void {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Scale SVG to 512×512
  const scaledSvg = svgText
    .replace(/width="[^"]*"/, `width="${size}"`)
    .replace(/height="[^"]*"/, `height="${size}"`);

  const blob = new Blob([scaledSvg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.onload = () => {
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(img, 0, 0, size, size);
    URL.revokeObjectURL(url);
    canvas.toBlob((pngBlob) => {
      if (!pngBlob) return;
      const pngUrl = URL.createObjectURL(pngBlob);
      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = `${fileName}.png`;
      a.click();
      URL.revokeObjectURL(pngUrl);
    }, "image/png");
  };
  img.src = url;
}

export function generateCode(
  framework: string,
  iconName: string,
  slug: string,
  customization: IconCustomization,
  rawSvg: string
): string {
  const { size, strokeWidth, color } = customization;
  const componentName = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("")
    .replace(/StrokeRounded$/, "Icon");

  switch (framework) {
    case "web":
      return rawSvg;

    case "react":
      return `import { ${componentName} } from '@/components/icons';

<${componentName}
  size={${size}}
  strokeWidth={${strokeWidth}}
  color="${color}"
/>`;

    case "vue":
      return `<template>
  <${componentName}
    :size="${size}"
    :stroke-width="${strokeWidth}"
    color="${color}"
  />
</template>

<script setup>
import { ${componentName} } from '@/components/icons';
</script>`;

    case "svelte":
      return `<script>
  import { ${componentName} } from '@/components/icons';
</script>

<${componentName}
  size={${size}}
  strokeWidth={${strokeWidth}}
  color="${color}"
/>`;

    case "flutter":
      return `${componentName}(
  size: ${size},
  color: Colors.black,
)`;

    case "angular":
      return `<app-${slug}
  [size]="${size}"
  [strokeWidth]="${strokeWidth}"
  color="${color}">
</app-${slug}>`;

    default:
      return rawSvg;
  }
}
