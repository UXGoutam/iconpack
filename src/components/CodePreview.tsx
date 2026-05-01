"use client";

import CopyButton from "./CopyButton";

interface Props {
  code: string;
}

export default function CodePreview({ code }: Props) {
  return (
    <div className="relative rounded-xl bg-gray-950 border border-gray-800">
      <div className="absolute top-3 right-3">
        <CopyButton text={code} label="Copy" className="!bg-gray-800 !border-gray-700 !text-gray-300 hover:!bg-gray-700" />
      </div>
      <pre className="overflow-x-auto p-4 pt-10 text-sm text-gray-200 font-mono leading-relaxed whitespace-pre-wrap break-all">
        <code>{code}</code>
      </pre>
    </div>
  );
}
