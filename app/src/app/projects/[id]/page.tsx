import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabase/server";
import type { Project } from "@/lib/types";
import TechBadge from "@/components/TechBadge";
import StatusBadge from "@/components/StatusBadge";
import MarkdownRenderer from "@/components/MarkdownRenderer";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { data } = await supabaseAdmin
    .from("projects")
    .select("title, description")
    .eq("id", id)
    .single();

  if (!data) return { title: "Not Found" };

  return {
    title: data.title,
    description: data.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const { data } = await supabaseAdmin
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();

  const project = data as Project;

  return (
    <div>
      <div className="mb-8 rounded-md border border-gh-border bg-gh-card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gh-text">
              {project.title}
            </h1>
            {project.company && (
              <p className="mt-1 text-sm text-gh-muted">
                {project.role} at {project.company}
              </p>
            )}
            <p className="mt-2 text-sm text-gh-muted">{project.description}</p>
          </div>
          <StatusBadge status={project.status} />
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          {project.tech_stack.map((tech) => (
            <TechBadge key={tech} tech={tech} />
          ))}
        </div>

        <div className="mt-4 flex gap-4">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gh-link hover:underline"
            >
              View on GitHub
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gh-link hover:underline"
            >
              Live Demo
            </a>
          )}
        </div>

        {(project.start_date || project.end_date) && (
          <p className="mt-3 text-xs text-gh-muted">
            {project.start_date} — {project.end_date || "Present"}
          </p>
        )}
      </div>

      {project.content && (
        <div className="rounded-md border border-gh-border bg-gh-card p-6">
          <MarkdownRenderer content={project.content} />
        </div>
      )}
    </div>
  );
}
