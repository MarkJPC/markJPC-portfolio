"use client";

import { motion } from "motion/react";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import type { Profile } from "@/lib/types";

const DEFAULT_ABOUT_CONTENT = `
Hey, I'm **Mark Cena** — a Backend Software Engineer based in Calgary, AB.

I specialize in building scalable backend systems, APIs, and data pipelines. My work focuses on clean architecture, performance optimization, and creating great developer experiences.

## What I Do

- **Backend Development** — Designing and building robust APIs and services
- **Database Engineering** — Schema design, query optimization, and data modeling
- **System Architecture** — Making decisions about scalability, reliability, and maintainability
- **DevOps & Infrastructure** — CI/CD pipelines, containerization, and cloud deployments

## About This Site

This portfolio is designed to mirror GitHub's interface. It's built with **Next.js**, **Tailwind CSS**, and **Supabase**, and deployed on **Vercel**.

The source code is available on [GitHub](https://github.com/MarkJPC).
`;

export default function AboutSection({ profile }: { profile: Profile }) {
  return (
    <section id="about" className="scroll-mt-16 border-t border-gh-border py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 flex items-center gap-3">
          <svg className="h-6 w-6 text-gh-muted" fill="currentColor" viewBox="0 0 16 16">
            <path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324.004-5.073-.002-2.253A2.25 2.25 0 0 0 5.003 2.5H1.5v9h3.757a3.75 3.75 0 0 1 1.994.574ZM8.755 4.75l-.004 7.322a3.752 3.752 0 0 1 1.992-.572H14.5v-9h-3.495a2.25 2.25 0 0 0-2.25 2.25Z" />
          </svg>
          <h2 className="text-xl font-semibold text-gh-text">About Me</h2>
        </div>
        <div className="overflow-hidden rounded-md border border-gh-border">
          {/* File header bar */}
          <div className="flex items-center gap-2 border-b border-gh-border bg-gh-card px-5 py-3">
            <svg className="h-5 w-5 text-gh-muted" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3.75 1.5a.25.25 0 0 0-.25.25v11.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25V6H9.75A1.75 1.75 0 0 1 8 4.25V1.5zM9.5 1.63v2.62c0 .138.112.25.25.25h2.62zM2 1.75C2 .784 2.784 0 3.75 0h5.086c.464 0 .909.184 1.237.513l3.414 3.414c.329.328.513.773.513 1.237v8.086A1.75 1.75 0 0 1 12.25 15h-8.5A1.75 1.75 0 0 1 2 13.25z" />
            </svg>
            <span className="text-base font-medium text-gh-text">README.md</span>
          </div>
          {/* Markdown content */}
          <div className="bg-gh-bg p-8">
            <MarkdownRenderer content={profile.about_content ?? DEFAULT_ABOUT_CONTENT} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
