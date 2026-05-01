import type { IconMeta } from "@/types";

function slugToName(slug: string): string {
  return slug
    .replace(/-stroke-rounded$/, "")
    .replace(/-stroke$/, "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function slugToCategory(slug: string): string {
  if (/arrow/.test(slug)) return "Navigation";
  if (/menu/.test(slug)) return "Navigation";
  if (/home/.test(slug)) return "Navigation";
  if (/search/.test(slug)) return "Navigation";
  if (/logout/.test(slug)) return "Navigation";
  if (/mail/.test(slug)) return "Communication";
  if (/comment/.test(slug)) return "Communication";
  if (/notification/.test(slug)) return "Communication";
  if (/share/.test(slug)) return "Communication";
  if (/favourite|thumbs|award|star/.test(slug)) return "Social";
  if (/cart|wallet|gift/.test(slug)) return "Commerce";
  if (/monitor/.test(slug)) return "Technology";
  if (/work|settings/.test(slug)) return "Business";
  if (/user|lock/.test(slug)) return "Account";
  if (/check|close|info|delete|edit|download|calendar|location/.test(slug)) return "Actions";
  return "General";
}

function slugToStyle(slug: string): string {
  if (slug.endsWith("-stroke-rounded")) return "stroke-rounded";
  if (slug.endsWith("-stroke")) return "stroke";
  return "solid";
}

const rawIcons: { slug: string; fileName: string }[] = [
  // Navigation
  { slug: "arrow-down-01-stroke-rounded",  fileName: "arrow-down-01-stroke-rounded.svg" },
  { slug: "arrow-left-01-stroke-rounded",  fileName: "arrow-left-01-stroke-rounded.svg" },
  { slug: "arrow-right-01-stroke-rounded", fileName: "arrow-right-01-stroke-rounded.svg" },
  { slug: "arrow-up-01-stroke-rounded",    fileName: "arrow-up-01-stroke-rounded.svg" },
  { slug: "home-01-stroke-rounded",        fileName: "home-01-stroke-rounded.svg" },
  { slug: "menu-01-stroke-rounded",        fileName: "menu-01-stroke-rounded.svg" },
  { slug: "menu-02-stroke-rounded",        fileName: "menu-02-stroke-rounded.svg" },
  { slug: "menu-08-stroke-rounded",        fileName: "menu-08-stroke-rounded.svg" },
  { slug: "search-01-stroke-rounded",      fileName: "search-01-stroke-rounded.svg" },
  { slug: "logout-stroke-rounded",         fileName: "logout-stroke-rounded.svg" },
  // Communication
  { slug: "mail-02-stroke-rounded",        fileName: "mail-02-stroke-rounded.svg" },
  { slug: "comment-01-stroke-rounded",     fileName: "comment-01-stroke-rounded.svg" },
  { slug: "notification-01-stroke-rounded",fileName: "notification-01-stroke-rounded.svg" },
  { slug: "share-stroke-rounded",          fileName: "share-stroke-rounded.svg" },
  // Social
  { slug: "favourite-stroke-rounded",      fileName: "favourite-stroke-rounded.svg" },
  { slug: "thumbs-up-stroke-rounded",      fileName: "thumbs-up-stroke-rounded.svg" },
  { slug: "award-01-stroke-rounded",       fileName: "award-01-stroke-rounded.svg" },
  { slug: "star-award-01-stroke-rounded",  fileName: "star-award-01-stroke-rounded.svg" },
  // Commerce
  { slug: "shopping-cart-02-stroke-rounded", fileName: "shopping-cart-02-stroke-rounded.svg" },
  { slug: "wallet-01-stroke-rounded",      fileName: "wallet-01-stroke-rounded.svg" },
  { slug: "gift-stroke-rounded",           fileName: "gift-stroke-rounded.svg" },
  // Actions
  { slug: "check-stroke-rounded",          fileName: "check-stroke-rounded.svg" },
  { slug: "check-circle-stroke-rounded",   fileName: "check-circle-stroke-rounded.svg" },
  { slug: "close-stroke-rounded",          fileName: "close-stroke-rounded.svg" },
  { slug: "edit-stroke-rounded",           fileName: "edit-stroke-rounded.svg" },
  { slug: "delete-stroke-rounded",         fileName: "delete-stroke-rounded.svg" },
  { slug: "download-stroke-rounded",       fileName: "download-stroke-rounded.svg" },
  { slug: "info-circle-stroke-rounded",    fileName: "info-circle-stroke-rounded.svg" },
  { slug: "calendar-stroke-rounded",       fileName: "calendar-stroke-rounded.svg" },
  { slug: "location-stroke-rounded",       fileName: "location-stroke-rounded.svg" },
  // Account
  { slug: "user-stroke-rounded",           fileName: "user-stroke-rounded.svg" },
  { slug: "lock-stroke-rounded",           fileName: "lock-stroke-rounded.svg" },
  // Business
  { slug: "work-stroke-rounded",           fileName: "work-stroke-rounded.svg" },
  { slug: "settings-stroke-rounded",       fileName: "settings-stroke-rounded.svg" },
  // Technology
  { slug: "monitor-dot-stroke-rounded",    fileName: "monitor-dot-stroke-rounded.svg" },
];

export const icons: IconMeta[] = rawIcons.map(({ slug, fileName }) => ({
  name: slugToName(slug),
  slug,
  category: slugToCategory(slug),
  style: slugToStyle(slug),
  fileName,
}));

export const categories = ["All", ...Array.from(new Set(icons.map((i) => i.category))).sort()];

export function getIconBySlug(slug: string): IconMeta | undefined {
  return icons.find((i) => i.slug === slug);
}
