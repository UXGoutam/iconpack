"use client";

const SIZES = [16, 20, 24, 32, 48];

interface Props {
  value: number;
  onChange: (size: number) => void;
}

export default function SizeSelector({ value, onChange }: Props) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-500 dark:text-gray-400">
        Size
      </label>
      <div className="flex gap-1.5 flex-wrap">
        {SIZES.map((s) => (
          <button
            key={s}
            onClick={() => onChange(s)}
            className={`px-2.5 py-1 rounded-lg text-sm font-medium border transition-all ${
              value === s
                ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-gray-900 dark:border-gray-100"
                : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-400"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
