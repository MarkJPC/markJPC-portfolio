import Link from "next/link";
import type { Project } from "@/lib/types";
import TechBadge from "./TechBadge";
import StatusBadge from "./StatusBadge";

export default function RepoCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col justify-between rounded-md border border-gh-border bg-gh-card p-4">
      <div>
        <div className="flex items-center gap-2">
          <Link
            href={`/projects/${project.id}`}
            className="text-sm font-semibold text-gh-link hover:underline"
          >
            {project.title}
          </Link>
          <span className="rounded-full border border-gh-border px-2 py-0.5 text-xs text-gh-muted">
            {project.type}
          </span>
        </div>
        <p className="mt-2 text-xs text-gh-muted line-clamp-2">
          {project.description}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {project.tech_stack.slice(0, 3).map((tech) => (
          <TechBadge key={tech} tech={tech} />
        ))}
        <StatusBadge status={project.status} />
      </div>
    </div>
  );
}
