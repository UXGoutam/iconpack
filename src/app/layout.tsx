import type { Metadata } from "next";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vantage Icon",
  description: "Browse, customize, copy, and download Vantage Circle icons",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
        <ThemeProvider>
          <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">

              {/* Logo — CSS mask renders vc-logo.png in brand colour #29294C on any bg */}
              <a href="/" className="flex items-center gap-3 shrink-0">
                <span
                  aria-label="Vantage Circle"
                  style={{
                    display: "block",
                    height: "28px",
                    width: "192px",
                    backgroundColor: "#29294C",
                    WebkitMaskImage: "url(/vc-logo.png)",
                    maskImage: "url(/vc-logo.png)",
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "left center",
                    maskPosition: "left center",
                    flexShrink: 0,
                  }}
                />
                <span className="text-gray-200 dark:text-gray-700 text-lg font-light">|</span>
                <span className="text-xs font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500">
                  Icons
                </span>
              </a>

              {/* Right side: nav + toggle + count */}
              <div className="flex items-center gap-4">
                <nav className="hidden sm:flex items-center gap-1">
                  <a href="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium">
                    Icons
                  </a>
                  <a href="/style-guide" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium">
                    Style Guide
                  </a>
                </nav>
                <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 hidden sm:block" />
                <ThemeToggle />
              </div>

            </div>
          </header>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
