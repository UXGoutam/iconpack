"use client";

import type { Framework } from "@/types";

const FRAMEWORKS: { id: Framework; label: string }[] = [
  { id: "web", label: "Web" },
  { id: "react", label: "React" },
  { id: "vue", label: "Vue" },
  { id: "svelte", label: "Svelte" },
  { id: "flutter", label: "Flutter" },
  { id: "angular", label: "Angular" },
];

interface Props {
  active: Framework;
  onChange: (f: Framework) => void;
}

export default function FrameworkTabs({ active, onChange }: Props) {
  return (
    <div className="flex gap-1 flex-wrap">
      {FRAMEWORKS.map((f) => (
        <button
          key={f.id}
          onClick={() => onChange(f.id)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            active === f.id
              ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
