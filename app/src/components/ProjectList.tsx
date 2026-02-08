"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/types";
import RepoCard from "./RepoCard";

export default function ProjectList({ projects }: { projects: Project[] }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const types = useMemo(
    () => [...new Set(projects.map((p) => p.type))].sort(),
    [projects]
  );
  const statuses = useMemo(
    () => [...new Set(projects.map((p) => p.status))].sort(),
    [projects]
  );

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.tech_stack.some((t) =>
          t.toLowerCase().includes(search.toLowerCase())
        );
      const matchesType = !typeFilter || p.type === typeFilter;
      const matchesStatus = !statusFilter || p.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [projects, search, typeFilter, statusFilter]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Find a repository..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-md border border-gh-border bg-gh-bg px-3 py-1.5 text-sm text-gh-text placeholder:text-gh-muted focus:border-gh-link focus:outline-none"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-md border border-gh-border bg-gh-card px-3 py-1.5 text-sm text-gh-text focus:border-gh-link focus:outline-none"
        >
          <option value="">Type</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-md border border-gh-border bg-gh-card px-3 py-1.5 text-sm text-gh-text focus:border-gh-link focus:outline-none"
        >
          <option value="">Status</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="text-sm text-gh-muted mb-4">
        <strong className="text-gh-text font-semibold">{filtered.length}</strong>{" "}
        results for repositories
      </div>
      <div className="flex flex-col gap-4">
        {filtered.map((project) => (
          <RepoCard key={project.id} project={project} />
        ))}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-gh-muted">
            No repositories match your filters.
          </p>
        )}
      </div>
    </div>
  );
}
