"use client";

import { useState, useMemo } from "react";
import type { IconMeta, IconCustomization, Framework } from "@/types";
import { normalizeSvg, generateCode } from "@/lib/svgUtils";
import Breadcrumb from "@/components/Breadcrumb";
import IconPreview from "@/components/IconPreview";
import SizeSelector from "@/components/SizeSelector";
import StrokeSelector from "@/components/StrokeSelector";
import ColorPicker from "@/components/ColorPicker";
import FrameworkTabs from "@/components/FrameworkTabs";
import CodePreview from "@/components/CodePreview";
import CopyButton from "@/components/CopyButton";
import DownloadDropdown from "@/components/DownloadDropdown";

const DEFAULTS: IconCustomization = {
  size: 24,
  strokeWidth: 1.5,
  color: "#000000",
};

interface Props {
  icon: IconMeta;
  rawSvg: string;
}

export default function IconDetailClient({ icon, rawSvg }: Props) {
  const [customization, setCustomization] = useState<IconCustomization>(DEFAULTS);
  const [framework, setFramework] = useState<Framework>("web");
  const [previewBg, setPreviewBg] = useState<"white" | "gray" | "dark">("gray");

  const customizedSvg = useMemo(() => normalizeSvg(rawSvg, customization), [rawSvg, customization]);

  const code = useMemo(
    () => generateCode(framework, icon.name, icon.slug, customization, customizedSvg),
    [framework, icon, customization, customizedSvg]
  );

  const update = (patch: Partial<IconCustomization>) =>
    setCustomization((prev) => ({ ...prev, ...patch }));

  const reset = () => setCustomization(DEFAULTS);

  const bgClass =
    previewBg === "white" ? "bg-white" : previewBg === "dark" ? "bg-gray-900" : "bg-gray-100 dark:bg-gray-700";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb
          crumbs={[
            { label: "Icons", href: "/" },
            { label: icon.category },
            { label: icon.name },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
        {/* LEFT — preview card */}
        <div className="space-y-4">
          {/* Large preview */}
          <div className={`rounded-2xl border border-gray-200 dark:border-gray-700 ${bgClass} flex items-center justify-center min-h-[280px] relative transition-colors`}>
            {/* BG toggle */}
            <div className="absolute top-3 right-3 flex gap-1">
              {(["white", "gray", "dark"] as const).map((bg) => (
                <button
                  key={bg}
                  onClick={() => setPreviewBg(bg)}
                  title={bg}
                  className={`w-5 h-5 rounded-full border-2 transition-all ${
                    previewBg === bg ? "border-gray-500 scale-110" : "border-gray-300 dark:border-gray-600"
                  } ${bg === "white" ? "bg-white" : bg === "gray" ? "bg-gray-200" : "bg-gray-900"}`}
                />
              ))}
            </div>

            <div className={previewBg === "dark" ? "text-white" : "text-gray-900"}>
              <IconPreview svgContent={customizedSvg} />
            </div>
          </div>

          {/* Icon meta card */}
          <div className="rounded-2xl p-5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">{icon.name}</h1>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">{icon.slug}</p>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-semibold border border-green-100 dark:border-green-800">
                <span className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full" />
                Available
              </span>
            </div>

            <div className="flex gap-4 mt-4 flex-wrap">
              {[
                { label: "Category", value: icon.category },
                { label: "Style", value: icon.style },
                { label: "Size", value: `${customization.size}px` },
                { label: "Stroke", value: String(customization.strokeWidth) },
              ].map(({ label, value }) => (
                <div key={label} className="text-xs">
                  <span className="text-gray-400 dark:text-gray-500">{label}</span>
                  <p className="font-medium text-gray-700 dark:text-gray-300 mt-0.5">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — controls + code */}
        <div className="space-y-5">
          {/* Customize card */}
          <div className="rounded-2xl p-5 space-y-5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 dark:text-gray-100">Customize</h2>
              <button
                onClick={reset}
                className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                Reset
              </button>
            </div>
            <SizeSelector value={customization.size} onChange={(size) => update({ size })} />
            <StrokeSelector value={customization.strokeWidth} onChange={(strokeWidth) => update({ strokeWidth })} />
            <ColorPicker value={customization.color} onChange={(color) => update({ color })} />
          </div>

          {/* Actions card */}
          <div className="rounded-2xl p-5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <div className="flex flex-wrap items-center gap-2">
              <DownloadDropdown svgContent={customizedSvg} originalSvg={rawSvg} slug={icon.slug} />
              <CopyButton
                text={customizedSvg}
                label="Copy SVG"
                className="!px-4 !py-2 !rounded-xl !text-sm !font-semibold !bg-gray-100 dark:!bg-gray-700 !border-gray-200 dark:!border-gray-600 !text-gray-700 dark:!text-gray-200 hover:!bg-gray-200 dark:hover:!bg-gray-600"
              />
              <CopyButton
                text={code}
                label="Copy code"
                className="!px-4 !py-2 !rounded-xl !text-sm !font-semibold !bg-gray-100 dark:!bg-gray-700 !border-gray-200 dark:!border-gray-600 !text-gray-700 dark:!text-gray-200 hover:!bg-gray-200 dark:hover:!bg-gray-600"
              />
            </div>
          </div>

          {/* Code card */}
          <div className="rounded-2xl p-5 space-y-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <h2 className="font-semibold text-gray-900 dark:text-gray-100">Code</h2>
              <FrameworkTabs active={framework} onChange={setFramework} />
            </div>
            <CodePreview code={code} />
          </div>
        </div>
      </div>
    </div>
  );
}
