"use client";

const PRESETS = [
  { label: "Black", value: "#000000" },
  { label: "Gray", value: "#6b7280" },
  { label: "Red", value: "#ef4444" },
  { label: "Orange", value: "#f97316" },
  { label: "Yellow", value: "#eab308" },
  { label: "Green", value: "#22c55e" },
  { label: "Blue", value: "#3b82f6" },
  { label: "Purple", value: "#a855f7" },
  { label: "Pink", value: "#ec4899" },
];

interface Props {
  value: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ value, onChange }: Props) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-500 dark:text-gray-400">
        Color
      </label>
      <div className="flex items-center gap-2 flex-wrap">
        {PRESETS.map((p) => (
          <button
            key={p.value}
            title={p.label}
            onClick={() => onChange(p.value)}
            className={`w-6 h-6 rounded-full border-2 transition-all ${
              value === p.value ? "border-gray-800 dark:border-gray-200 scale-110" : "border-transparent hover:scale-105"
            }`}
            style={{ backgroundColor: p.value }}
          />
        ))}
        <label
          title="Custom color"
          className="relative w-6 h-6 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-400 cursor-pointer flex items-center justify-center overflow-hidden"
        >
          <span className="text-xs text-gray-400">+</span>
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
        </label>
        <div className="flex items-center gap-1.5 ml-1">
          <div className="w-4 h-4 rounded border border-gray-200 dark:border-gray-600" style={{ backgroundColor: value }} />
          <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{value}</span>
        </div>
      </div>
    </div>
  );
}
