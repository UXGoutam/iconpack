"use client";

import { useState, useEffect } from "react";

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  // Prevent layout shift before mount
  if (!mounted) {
    return (
      <div className="flex items-center h-9 w-[148px] rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 opacity-0" />
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex items-center h-9 rounded-full border cursor-pointer select-none overflow-hidden
        bg-gray-100 dark:bg-gray-800
        border-gray-200 dark:border-gray-700
        hover:border-gray-300 dark:hover:border-gray-600
        transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#29294C]/40"
      style={{ width: "148px", padding: "3px" }}
    >
      {/* Sliding active pill */}
      <span
        className="absolute top-[3px] bottom-[3px] rounded-full shadow-sm transition-all duration-300 ease-in-out"
        style={{
          width: "calc(50% - 3px)",
          left: dark ? "calc(50%)" : "3px",
          backgroundColor: dark ? "#29294C" : "#ffffff",
          boxShadow: dark ? "none" : "0 1px 3px rgba(0,0,0,0.12)",
        }}
      />

      {/* Light option */}
      <span
        className="relative z-10 flex items-center justify-center gap-1.5 flex-1 text-xs font-medium transition-colors duration-200"
        style={{ color: !dark ? "#29294C" : "#9ca3af" }}
      >
        <SunIcon />
        Light
      </span>

      {/* Dark option */}
      <span
        className="relative z-10 flex items-center justify-center gap-1.5 flex-1 text-xs font-medium transition-colors duration-200"
        style={{ color: dark ? "#e5e7eb" : "#9ca3af" }}
      >
        <MoonIcon />
        Dark
      </span>
    </button>
  );
}
