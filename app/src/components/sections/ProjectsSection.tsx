"use client";

import { motion } from "motion/react";
import type { Project } from "@/lib/types";
import ProjectList from "@/components/ProjectList";

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="scroll-mt-16 border-t border-gh-border py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 flex items-center gap-3">
          <svg className="h-6 w-6 text-gh-muted" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8zM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2z" />
          </svg>
          <h2 className="text-xl font-semibold text-gh-text">
            Experience &amp; Projects
          </h2>
        </div>
        <ProjectList projects={projects} />
      </motion.div>
    </section>
  );
}
