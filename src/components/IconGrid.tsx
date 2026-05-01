"use client";

import { useState, useMemo } from "react";
import type { IconMeta } from "@/types";
import IconCard from "./IconCard";
import { categories } from "@/lib/icons";

interface Props {
  icons: IconMeta[];
  svgMap: Record<string, string>;
}

export default function IconGrid({ icons, svgMap }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    return icons.filter((icon) => {
      const matchesSearch =
        !search ||
        icon.name.toLowerCase().includes(search.toLowerCase()) ||
        icon.slug.toLowerCase().includes(search.toLowerCase()) ||
        icon.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || icon.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [icons, search, activeCategory]);

  return (
    <div>
      {/* Search + filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
            width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M17 17L21 21" />
            <path d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z" />
          </svg>
          <input
            type="text"
            placeholder="Search icons…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm
              bg-white dark:bg-gray-800
              border-gray-200 dark:border-gray-700
              text-gray-900 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 focus:border-transparent"
          />
        </div>

        <div className="flex gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                activeCategory === cat
                  ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-gray-900 dark:border-gray-100"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">
        {filtered.length} icon{filtered.length !== 1 ? "s" : ""}
        {activeCategory !== "All" && ` in ${activeCategory}`}
        {search && ` matching "${search}"`}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2">
          {filtered.map((icon) => (
            <IconCard
              key={icon.slug}
              icon={icon}
              svgContent={svgMap[icon.slug] ?? ""}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400 dark:text-gray-600">
          <svg className="mx-auto mb-3 opacity-40" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 17L21 21" /><path d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z" />
          </svg>
          <p className="text-sm">No icons found</p>
        </div>
      )}
    </div>
  );
}
