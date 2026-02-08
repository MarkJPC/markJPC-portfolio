"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Overview", href: "/" },
  { label: "Repositories", href: "/projects" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header className="border-b border-gh-border bg-gh-card">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center">
          <Link
            href="/"
            className="font-mono text-lg font-bold text-gh-text hover:text-gh-link"
          >
            markjpc
          </Link>
        </div>
        <nav className="-mb-px flex gap-4">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`relative px-2 pb-3 text-sm font-medium transition-colors ${
                isActive(tab.href)
                  ? "text-gh-text"
                  : "text-gh-muted hover:text-gh-text"
              }`}
            >
              {tab.label}
              {isActive(tab.href) && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gh-orange" />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
