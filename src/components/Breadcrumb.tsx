import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

interface Props {
  crumbs: Crumb[];
}

export default function Breadcrumb({ crumbs }: Props) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6C9 6 15 10.4189 15 12C15 13.5812 9 18 9 18" />
            </svg>
          )}
          {crumb.href ? (
            <Link href={crumb.href} className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-gray-700 dark:text-gray-300 font-medium">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
