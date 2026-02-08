"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Project } from "@/lib/types";

export default function AdminProjectTable({
  projects,
}: {
  projects: Project[];
}) {
  const router = useRouter();

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"?`)) return;

    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gh-text">Projects</h2>
        <Link
          href="/admin/editor/new"
          className="rounded-md bg-gh-green px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          New Project
        </Link>
      </div>
      <div className="overflow-x-auto rounded-md border border-gh-border">
        <table className="w-full text-sm">
          <thead className="border-b border-gh-border bg-gh-card">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gh-text">
                Title
              </th>
              <th className="px-4 py-3 text-left font-medium text-gh-text">
                Type
              </th>
              <th className="px-4 py-3 text-left font-medium text-gh-text">
                Status
              </th>
              <th className="px-4 py-3 text-left font-medium text-gh-text">
                Featured
              </th>
              <th className="px-4 py-3 text-right font-medium text-gh-text">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gh-border">
            {projects.map((project) => (
              <tr key={project.id} className="bg-gh-bg hover:bg-gh-card">
                <td className="px-4 py-3 text-gh-link">{project.title}</td>
                <td className="px-4 py-3 text-gh-muted">{project.type}</td>
                <td className="px-4 py-3 text-gh-muted">{project.status}</td>
                <td className="px-4 py-3 text-gh-muted">
                  {project.is_featured ? "Yes" : "No"}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/editor/${project.id}`}
                      className="text-gh-link hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id, project.title)}
                      className="text-gh-red hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-gh-muted"
                >
                  No projects yet. Create your first one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
