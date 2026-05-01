"use client";

interface Props {
  svgContent: string;
}

export default function IconPreview({ svgContent }: Props) {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[200px]">
      <div
        dangerouslySetInnerHTML={{ __html: svgContent }}
        className="flex items-center justify-center"
      />
    </div>
  );
}
