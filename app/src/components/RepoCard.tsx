import Link from "next/link";
import type { Project } from "@/lib/types";
import TechBadge from "./TechBadge";
import StatusBadge from "./StatusBadge";
import MarkdownRenderer from "./MarkdownRenderer";

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split("-");
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
}

function DurationLocation({ project }: { project: Project }) {
  const hasDates = project.start_date;
  const hasLocation = project.location;
  if (!hasDates && !hasLocation) return null;

  return (
    <span className="text-sm text-gh-muted">
      {hasDates && (
        <>{formatDate(project.start_date!)} – {project.end_date ? formatDate(project.end_date) : "Present"}</>
      )}
      {hasDates && hasLocation && " · "}
      {hasLocation && project.location}
    </span>
  );
}

export default function RepoCard({ project }: { project: Project }) {
  const isProfessional = project.type.toLowerCase() === "professional";
  const heading = isProfessional ? project.role : project.title;

  return (
    <Link
      href={`/projects/${project.id}`}
      className="flex flex-col justify-between rounded-md border border-gh-border bg-gh-card p-5 transition-colors hover:border-gh-muted"
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            {heading && (
              <span className="text-base font-semibold text-gh-text">{heading}</span>
            )}
            {project.company && (
              <span className="text-sm text-gh-muted">{project.company}</span>
            )}
          </div>
          <span className="shrink-0 rounded-full border border-gh-border px-2.5 py-1 text-sm text-gh-muted">
            {project.type}
          </span>
        </div>
        <div className="mt-1.5">
          <DurationLocation project={project} />
        </div>
        <MarkdownRenderer
          content={project.description}
          size="base"
          className="mt-3 prose-muted"
        />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        {project.tech_stack.map((tech) => (
          <TechBadge key={tech} tech={tech} />
        ))}
        <StatusBadge status={project.status} />
      </div>
    </Link>
  );
}
