import { readFileSync } from "fs";
import { join } from "path";
import { notFound } from "next/navigation";
import { getIconBySlug, icons } from "@/lib/icons";
import IconDetailClient from "./IconDetailClient";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return icons.map((icon) => ({ slug: icon.slug }));
}

export function generateMetadata({ params }: Props) {
  const icon = getIconBySlug(params.slug);
  if (!icon) return { title: "Icon not found" };
  return { title: `${icon.name} — Vantage Icon` };
}

export default function IconDetailPage({ params }: Props) {
  const icon = getIconBySlug(params.slug);
  if (!icon) notFound();

  let rawSvg = "";
  try {
    const filePath = join(process.cwd(), "public", "icons", icon.fileName);
    rawSvg = readFileSync(filePath, "utf-8");
  } catch {
    notFound();
  }

  return <IconDetailClient icon={icon} rawSvg={rawSvg} />;
}
