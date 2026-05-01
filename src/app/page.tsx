import { readFileSync } from "fs";
import { join } from "path";
import { icons } from "@/lib/icons";
import IconGrid from "@/components/IconGrid";

function loadSvgMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const icon of icons) {
    try {
      const filePath = join(process.cwd(), "public", "icons", icon.fileName);
      const content = readFileSync(filePath, "utf-8");
      // Normalise to 24×24 currentColor for grid thumbnails
      map[icon.slug] = content
        .replace(/width="[^"]*"/, 'width="24"')
        .replace(/height="[^"]*"/, 'height="24"')
        .replace(/stroke="(?!none)[^"]*"/g, 'stroke="currentColor"')
        .replace(/color="[^"]*"/g, 'color="currentColor"');
    } catch {
      map[icon.slug] = "";
    }
  }
  return map;
}

export default function BrowsePage() {
  const svgMap = loadSvgMap();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Vantage Icon</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Browse, customize, and download SVG icons. Click any icon to open the detail page.
        </p>
      </div>
      <IconGrid icons={icons} svgMap={svgMap} />
    </div>
  );
}
