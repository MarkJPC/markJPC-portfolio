"use client";

import { motion } from "motion/react";
import type { Skills } from "@/lib/types";

const categoryColors: Record<string, string> = {
  Languages: "bg-gh-purple",
  Frameworks: "bg-gh-link",
  Databases: "bg-gh-green",
  Cloud: "bg-gh-orange",
  Tools: "bg-gh-red",
  DevOps: "bg-gh-red",
  Testing: "bg-[#f778ba]",
};

function getDotColor(category: string) {
  return categoryColors[category] ?? "bg-gh-muted";
}

export default function SkillsSection({ skills }: { skills: Skills }) {
  const categories = Object.entries(skills);

  if (categories.length === 0) return null;

  return (
    <section id="skills" className="scroll-mt-16 border-t border-gh-border py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 flex items-center gap-3">
          <svg className="h-6 w-6 text-gh-muted" fill="currentColor" viewBox="0 0 16 16">
            <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25Zm7.47 3.97a.75.75 0 0 1 1.06 0l2 2a.75.75 0 0 1 0 1.06l-2 2a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L10.44 8 9.22 6.78a.75.75 0 0 1 0-1.06m-3.44 0a.75.75 0 0 1 0 1.06L4.56 8l1.22 1.22a.751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018l-2-2a.75.75 0 0 1 0-1.06l2-2a.75.75 0 0 1 1.06 0" />
          </svg>
          <h2 className="text-xl font-semibold text-gh-text">Skills</h2>
        </div>

        <div className="space-y-6">
          {categories.map(([category, items]) => (
            <div key={category}>
              <div className="mb-2 flex items-center gap-2">
                <span className={`inline-block h-3.5 w-3.5 rounded-full ${getDotColor(category)}`} />
                <span className="text-base font-medium text-gh-text">
                  {category}
                </span>
                <span className="text-sm text-gh-muted">({items.length})</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-gh-border bg-gh-bg px-3.5 py-1.5 text-sm text-gh-muted transition-colors hover:border-gh-muted hover:text-gh-text"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
