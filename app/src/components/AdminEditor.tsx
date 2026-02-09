"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Project, ProjectFormData } from "@/lib/types";
import MarkdownRenderer from "./MarkdownRenderer";

function projectToForm(project: Project | null): ProjectFormData {
  if (!project) {
    return {
      title: "",
      company: "",
      role: "",
      location: "",
      type: "personal",
      status: "ongoing",
      start_date: "",
      end_date: "",
      description: "",
      content: "",
      tech_stack: "",
      github_url: "",
      live_url: "",
      is_featured: false,
      sort_order: 0,
    };
  }
  return {
    title: project.title,
    company: project.company || "",
    role: project.role || "",
    location: project.location || "",
    type: project.type,
    status: project.status,
    start_date: project.start_date || "",
    end_date: project.end_date || "",
    description: project.description,
    content: project.content || "",
    tech_stack: project.tech_stack.join(", "),
    github_url: project.github_url || "",
    live_url: project.live_url || "",
    is_featured: project.is_featured,
    sort_order: project.sort_order,
  };
}

export default function AdminEditor({
  project,
}: {
  project: Project | null;
}) {
  const router = useRouter();
  const isNew = !project;
  const [form, setForm] = useState<ProjectFormData>(projectToForm(project));
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [descTab, setDescTab] = useState<"write" | "preview">("write");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function update(field: keyof ProjectFormData, value: string | boolean | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setError("");
    setSaving(true);

    const body = {
      title: form.title,
      company: form.company || null,
      role: form.role || null,
      location: form.location || null,
      type: form.type,
      status: form.status,
      start_date: form.start_date || null,
      end_date: form.end_date || null,
      description: form.description,
      content: form.content || null,
      tech_stack: form.tech_stack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      github_url: form.github_url || null,
      live_url: form.live_url || null,
      is_featured: form.is_featured,
      sort_order: form.sort_order,
    };

    const url = isNew ? "/api/projects" : `/api/projects/${project.id}`;
    const method = isNew ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      const data = await res.json();
      setError(data.error || "Failed to save");
      setSaving(false);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Left: Metadata Form */}
      <div className="flex flex-col gap-4 rounded-md border border-gh-border bg-gh-card p-4">
        <h2 className="text-lg font-semibold text-gh-text">
          {isNew ? "New Project" : "Edit Project"}
        </h2>

        <Field label="Title">
          <input
            type="text"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            className="input"
            required
          />
        </Field>

        <div className="grid grid-cols-3 gap-4">
          <Field label="Company">
            <input
              type="text"
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Role">
            <input
              type="text"
              value={form.role}
              onChange={(e) => update("role", e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Location">
            <input
              type="text"
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              className="input"
              placeholder="e.g. Calgary, AB"
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Type">
            <input
              type="text"
              value={form.type}
              onChange={(e) => update("type", e.target.value)}
              className="input"
              placeholder="e.g. personal, professional, freelance"
            />
          </Field>
          <Field label="Status">
            <select
              value={form.status}
              onChange={(e) => update("status", e.target.value)}
              className="input"
            >
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Start Date">
            <input
              type="date"
              value={form.start_date}
              onChange={(e) => update("start_date", e.target.value)}
              className="input"
            />
          </Field>
          <Field label="End Date">
            <input
              type="date"
              value={form.end_date}
              onChange={(e) => update("end_date", e.target.value)}
              className="input"
            />
          </Field>
        </div>

        <Field label="Description (Markdown supported)">
          <div className="rounded-md border border-gh-border">
            <div className="flex border-b border-gh-border">
              <button
                type="button"
                onClick={() => setDescTab("write")}
                className={`px-3 py-1.5 text-xs font-medium ${
                  descTab === "write"
                    ? "border-b-2 border-gh-orange text-gh-text"
                    : "text-gh-muted hover:text-gh-text"
                }`}
              >
                Write
              </button>
              <button
                type="button"
                onClick={() => setDescTab("preview")}
                className={`px-3 py-1.5 text-xs font-medium ${
                  descTab === "preview"
                    ? "border-b-2 border-gh-orange text-gh-text"
                    : "text-gh-muted hover:text-gh-text"
                }`}
              >
                Preview
              </button>
            </div>
            {descTab === "write" ? (
              <textarea
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                className="min-h-[120px] w-full resize-none bg-gh-bg p-3 font-mono text-sm text-gh-text placeholder:text-gh-muted focus:outline-none"
                placeholder="Write a short project description in Markdown..."
                required
              />
            ) : (
              <div className="min-h-[120px] p-3">
                {form.description ? (
                  <MarkdownRenderer content={form.description} size="sm" />
                ) : (
                  <p className="text-sm text-gh-muted">Nothing to preview</p>
                )}
              </div>
            )}
          </div>
        </Field>

        <Field label="Tech Stack (comma-separated)">
          <input
            type="text"
            value={form.tech_stack}
            onChange={(e) => update("tech_stack", e.target.value)}
            className="input"
            placeholder="TypeScript, React, PostgreSQL"
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="GitHub URL">
            <input
              type="url"
              value={form.github_url}
              onChange={(e) => update("github_url", e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Live URL">
            <input
              type="url"
              value={form.live_url}
              onChange={(e) => update("live_url", e.target.value)}
              className="input"
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Sort Order">
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => update("sort_order", parseInt(e.target.value) || 0)}
              className="input"
            />
          </Field>
          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm text-gh-text">
              <input
                type="checkbox"
                checked={form.is_featured}
                onChange={(e) => update("is_featured", e.target.checked)}
                className="h-4 w-4 rounded border-gh-border bg-gh-bg"
              />
              Featured (pinned)
            </label>
          </div>
        </div>

        {error && <p className="text-sm text-gh-red">{error}</p>}

        <button
          onClick={handleSave}
          disabled={saving || !form.title || !form.description}
          className="rounded-md bg-gh-green px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Saving..." : isNew ? "Create Project" : "Save Changes"}
        </button>
      </div>

      {/* Right: Markdown Editor */}
      <div className="flex flex-col rounded-md border border-gh-border bg-gh-card">
        <div className="flex border-b border-gh-border">
          <button
            onClick={() => setTab("write")}
            className={`px-4 py-2 text-sm font-medium ${
              tab === "write"
                ? "border-b-2 border-gh-orange text-gh-text"
                : "text-gh-muted hover:text-gh-text"
            }`}
          >
            Write
          </button>
          <button
            onClick={() => setTab("preview")}
            className={`px-4 py-2 text-sm font-medium ${
              tab === "preview"
                ? "border-b-2 border-gh-orange text-gh-text"
                : "text-gh-muted hover:text-gh-text"
            }`}
          >
            Preview
          </button>
        </div>
        <div className="flex-1 p-4">
          {tab === "write" ? (
            <textarea
              value={form.content}
              onChange={(e) => update("content", e.target.value)}
              className="h-full min-h-[500px] w-full resize-none rounded-md border border-gh-border bg-gh-bg p-3 font-mono text-sm text-gh-text placeholder:text-gh-muted focus:border-gh-link focus:outline-none"
              placeholder="Write your project content in Markdown..."
            />
          ) : (
            <div className="min-h-[500px]">
              {form.content ? (
                <MarkdownRenderer content={form.content} />
              ) : (
                <p className="text-gh-muted">Nothing to preview</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gh-muted">
        {label}
      </label>
      {children}
    </div>
  );
}
