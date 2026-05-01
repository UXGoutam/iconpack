"use client";

import { useState } from "react";

interface Props {
  code: string;
  language?: string;
}

export default function CopySnippet({ code, language = "css" }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <span className="text-xs font-mono text-gray-400 dark:text-gray-500 uppercase tracking-wider">{language}</span>
        <button
          onClick={copy}
          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md transition-all ${
            copied
              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
              : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
          }`}
        >
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              Copied
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
              Copy
            </>
          )}
        </button>
      </div>
      {/* Code */}
      <pre className="bg-gray-950 text-gray-200 text-sm font-mono leading-relaxed p-4 overflow-x-auto whitespace-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
}
