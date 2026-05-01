/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  basePath: isProd ? "/iconpack" : "",
  assetPrefix: isProd ? "/iconpack/" : "",
  images: { unoptimized: true },
};

export default nextConfig;
