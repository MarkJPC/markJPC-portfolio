"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
import TechBadge from "@/components/TechBadge";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export default function FeaturedProject({ project }: { project: Project }) {
  const hasLogo = !!project.logo_url;

  return (
    <div className="rounded-md border border-gh-border bg-gh-card p-6 md:p-8">
      <div
        className={`grid gap-6 md:gap-8 ${
          hasLogo ? "grid-cols-1 md:grid-cols-[280px_1fr]" : "grid-cols-1"
        }`}
      >
        {hasLogo && (
          <div className="flex items-start justify-center">
            <div className="rounded-md border border-gh-border bg-white p-4">
              <Image
                src={project.logo_url!}
                alt={`${project.title} logo`}
                width={248}
                height={248}
                className="aspect-square rounded-sm object-contain"
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-2xl font-bold text-gh-text">{project.title}</h3>
            {project.subtitle && (
              <p className="mt-1 text-base text-gh-muted">{project.subtitle}</p>
            )}
          </div>

          <MarkdownRenderer content={project.description} size="base" />

          {project.tech_stack.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {project.tech_stack.map((tech) => (
                <TechBadge key={tech} tech={tech} />
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/projects/${project.id}`}
              className="inline-flex items-center gap-2 rounded-md bg-gh-green px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              View Project
            </Link>
            {project.live_url && (
              <a
                href={project.live_url.match(/^https?:\/\//) ? project.live_url : `https://${project.live_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-gh-border px-4 py-2 text-sm font-medium text-gh-text hover:border-gh-link"
              >
                Live Site
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
