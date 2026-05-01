import type { Metadata } from "next";
import StyleGuideClient from "./StyleGuideClient";

export const metadata: Metadata = {
  title: "Logo CSS Style Guide — Vantage Icon",
  description: "Official CSS specs and usage guidelines for the Vantage Circle logo",
};

export default function StyleGuidePage() {
  return <StyleGuideClient />;
}
