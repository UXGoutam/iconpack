export interface IconMeta {
  name: string;
  slug: string;
  category: string;
  style: string;
  fileName: string;
}

export interface IconCustomization {
  size: number;
  strokeWidth: number;
  color: string;
}

export type Framework = "web" | "react" | "vue" | "svelte" | "flutter" | "angular";
