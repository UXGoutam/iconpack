"use client";

import Link from "next/link";
import type { IconMeta } from "@/types";

interface Props {
  icon: IconMeta;
  svgContent: string;
}

export default function IconCard({ icon, svgContent }: Props) {
  return (
    <Link
      href={`/icon/${icon.slug}`}
      className="group flex flex-col items-center gap-3 p-4 rounded-2xl
        bg-white dark:bg-gray-800/60
        border border-gray-100 dark:border-gray-700/60
        hover:border-gray-300 dark:hover:border-gray-500
        hover:shadow-md dark:hover:shadow-gray-900/40
        transition-all duration-150 cursor-pointer"
    >
      <div className="w-12 h-12 flex items-center justify-center
        text-gray-700 dark:text-gray-300
        group-hover:text-gray-900 dark:group-hover:text-gray-100
        transition-colors">
        <div
          dangerouslySetInnerHTML={{ __html: svgContent }}
          className="[&>svg]:w-6 [&>svg]:h-6"
        />
      </div>
      <span className="text-xs text-center leading-tight font-medium line-clamp-2
        text-gray-500 dark:text-gray-400
        group-hover:text-gray-700 dark:group-hover:text-gray-200
        transition-colors">
        {icon.name}
      </span>
    </Link>
  );
}
