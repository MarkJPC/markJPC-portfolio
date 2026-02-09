"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

const tabs = [
  { label: "Overview", section: "hero" },
  { label: "About", section: "about" },
  { label: "Projects", section: "projects" },
  { label: "Education", section: "education" },
  { label: "Skills", section: "skills" },
  { label: "Contact", section: "contact" },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeSection, setActiveSection] = useState("hero");

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
      if (!isHome) return; // let normal navigation happen
      e.preventDefault();
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    [isHome]
  );

  useEffect(() => {
    if (!isHome) return;

    const sectionIds = tabs.map((t) => t.section);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-10% 0px -40% 0px" }
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [isHome]);

  return (
    <header className="sticky top-0 z-50 border-b border-gh-border bg-gh-card">
      <div className="mx-auto flex max-w-7xl items-center gap-8 px-6">
        <a
          href="/#hero"
          onClick={(e) => handleClick(e, "hero")}
          className="shrink-0 font-mono text-base font-bold text-gh-text hover:text-gh-link"
        >
          markjpc
        </a>
        <nav className="-mb-px flex gap-6 overflow-x-auto">
          {tabs.map((tab) => {
            const active = isHome && activeSection === tab.section;
            return (
              <a
                key={tab.section}
                href={`/#${tab.section}`}
                onClick={(e) => handleClick(e, tab.section)}
                className={`relative whitespace-nowrap px-3 py-4 text-sm font-medium transition-colors ${
                  active
                    ? "text-gh-text"
                    : "text-gh-muted hover:text-gh-text"
                }`}
              >
                {tab.label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gh-orange" />
                )}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
