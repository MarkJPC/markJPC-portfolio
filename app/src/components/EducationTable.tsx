"use client";

import { useState } from "react";
import type { Education } from "@/lib/types";

export default function EducationTable({
  initialData,
}: {
  initialData: Education[];
}) {
  const [entries, setEntries] = useState<Education[]>(initialData);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form fields
  const [institution, setInstitution] = useState("");
  const [degree, setDegree] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [gpa, setGpa] = useState("");
  const [description, setDescription] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  function resetForm() {
    setInstitution("");
    setDegree("");
    setFieldOfStudy("");
    setStartDate("");
    setEndDate("");
    setLocation("");
    setGpa("");
    setDescription("");
    setSortOrder(0);
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const res = await fetch("/api/education", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        institution,
        degree,
        field_of_study: fieldOfStudy || null,
        start_date: startDate || null,
        end_date: endDate || null,
        location: location || null,
        gpa: gpa || null,
        description: description || null,
        sort_order: sortOrder,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to create");
    } else {
      const created = await res.json();
      setEntries([...entries, created]);
      resetForm();
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/education/${id}`, { method: "DELETE" });
    if (res.ok) {
      setEntries(entries.filter((e) => e.id !== id));
    } else {
      const data = await res.json();
      setError(data.error || "Failed to delete");
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-md border border-gh-red bg-gh-red/10 px-4 py-3 text-sm text-gh-red">
          {error}
        </div>
      )}

      {/* Existing entries */}
      {entries.length > 0 && (
        <div className="rounded-md border border-gh-border bg-gh-card">
          <div className="border-b border-gh-border px-4 py-3">
            <h2 className="text-sm font-semibold text-gh-text">
              Existing Entries ({entries.length})
            </h2>
          </div>
          <div className="divide-y divide-gh-border">
            {entries.map((edu) => (
              <div
                key={edu.id}
                className="flex items-center justify-between px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-gh-text">
                    {edu.institution}
                  </p>
                  <p className="text-xs text-gh-muted">
                    {edu.degree}
                    {edu.field_of_study && ` in ${edu.field_of_study}`}
                    {edu.start_date && ` (${edu.start_date}`}
                    {edu.end_date && ` — ${edu.end_date}`}
                    {edu.start_date && ")"}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(edu.id)}
                  className="text-sm text-gh-red hover:underline"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create form */}
      <div className="rounded-md border border-gh-border bg-gh-card p-4">
        <h2 className="mb-4 text-base font-semibold text-gh-text">
          Add Education
        </h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-gh-muted">
                Institution *
              </label>
              <input
                className="input"
                required
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gh-muted">
                Degree *
              </label>
              <input
                className="input"
                required
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gh-muted">
                Field of Study
              </label>
              <input
                className="input"
                value={fieldOfStudy}
                onChange={(e) => setFieldOfStudy(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gh-muted">
                Location
              </label>
              <input
                className="input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gh-muted">
                Start Date
              </label>
              <input
                className="input"
                placeholder="e.g. Sep 2020"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gh-muted">
                End Date
              </label>
              <input
                className="input"
                placeholder="e.g. Jun 2024"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gh-muted">GPA</label>
              <input
                className="input"
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gh-muted">
                Sort Order
              </label>
              <input
                className="input"
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm text-gh-muted">
                Description
              </label>
              <textarea
                className="input min-h-[60px] resize-y"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-gh-green px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}
