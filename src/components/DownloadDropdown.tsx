"use client";

import { useState, useRef, useEffect } from "react";
import { downloadSvg, downloadPng } from "@/lib/svgUtils";

interface Props {
  svgContent: string;
  originalSvg: string;
  slug: string;
}

export default function DownloadDropdown({ svgContent, originalSvg, slug }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = [
    { label: "SVG (original)", description: "Download as-is SVG", onClick: () => { downloadSvg(originalSvg, slug); setOpen(false); } },
    { label: "SVG (customized)", description: "With your color & stroke", onClick: () => { downloadSvg(svgContent, slug); setOpen(false); } },
    { label: "PNG 512×512", description: "Rasterized PNG", onClick: () => { downloadPng(svgContent, slug, 512); setOpen(false); } },
    { label: "PNG 256×256", description: "Rasterized PNG", onClick: () => { downloadPng(svgContent, slug, 256); setOpen(false); } },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors
          bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900
          hover:bg-gray-800 dark:hover:bg-gray-200"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M18 9C18 9 13.5811 15 12 15C10.4188 15 6 9 6 9" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 rounded-xl shadow-lg z-50 overflow-hidden
          bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          {options.map((o) => (
            <button
              key={o.label}
              onClick={o.onClick}
              className="w-full text-left px-4 py-3 border-b last:border-0 transition-colors
                border-gray-100 dark:border-gray-700
                hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <div className="text-sm font-medium text-gray-800 dark:text-gray-100">{o.label}</div>
              <div className="text-xs mt-0.5 text-gray-400 dark:text-gray-500">{o.description}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
