"use client";

import { useState } from "react";
import type { Profile, Skills } from "@/lib/types";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export default function ProfileEditor({ profile }: { profile: Profile }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Basic fields
  const [name, setName] = useState(profile.name);
  const [role, setRole] = useState(profile.role ?? "");
  const [tagline, setTagline] = useState(profile.tagline);
  const [location, setLocation] = useState(profile.location ?? "");
  const [email, setEmail] = useState(profile.email ?? "");
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url ?? "");
  const [githubUrl, setGithubUrl] = useState(profile.github_url ?? "");
  const [linkedinUrl, setLinkedinUrl] = useState(profile.linkedin_url ?? "");
  const [bio, setBio] = useState(profile.bio ?? "");

  // Skills
  const [skills, setSkills] = useState<Skills>(profile.skills ?? {});
  const [newCategory, setNewCategory] = useState("");
  const [newSkillInputs, setNewSkillInputs] = useState<Record<string, string>>({});

  // About Content
  const [aboutContent, setAboutContent] = useState(profile.about_content ?? "");
  const [aboutTab, setAboutTab] = useState<"write" | "preview">("write");

  // Resume
  const [resumeUrl, setResumeUrl] = useState(profile.resume_url);
  const [uploading, setUploading] = useState(false);

  async function handleSave() {
    setSaving(true);
    setError(null);
    setSuccess(false);

    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        role: role || null,
        tagline,
        location: location || null,
        email: email || null,
        avatar_url: avatarUrl || null,
        github_url: githubUrl || null,
        linkedin_url: linkedinUrl || null,
        bio: bio || null,
        about_content: aboutContent || null,
        skills,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to save");
    } else {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
    setSaving(false);
  }

  function addCategory() {
    const cat = newCategory.trim();
    if (!cat || skills[cat]) return;
    setSkills({ ...skills, [cat]: [] });
    setNewCategory("");
  }

  function removeCategory(category: string) {
    const next = { ...skills };
    delete next[category];
    setSkills(next);
    const inputs = { ...newSkillInputs };
    delete inputs[category];
    setNewSkillInputs(inputs);
  }

  function addSkill(category: string) {
    const val = (newSkillInputs[category] ?? "").trim();
    if (!val || skills[category].includes(val)) return;
    setSkills({ ...skills, [category]: [...skills[category], val] });
    setNewSkillInputs({ ...newSkillInputs, [category]: "" });
  }

  function removeSkill(category: string, index: number) {
    setSkills({
      ...skills,
      [category]: skills[category].filter((_, i) => i !== index),
    });
  }

  async function handleResumeUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/profile/resume", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Upload failed");
    } else {
      const data = await res.json();
      setResumeUrl(data.resume_url);
    }
    setUploading(false);
    e.target.value = "";
  }

  async function handleResumeDelete() {
    setError(null);
    const res = await fetch("/api/profile/resume", { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Delete failed");
    } else {
      setResumeUrl(null);
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-md border border-gh-red bg-gh-red/10 px-4 py-3 text-sm text-gh-red">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-md border border-gh-green bg-gh-green/10 px-4 py-3 text-sm text-gh-green">
          Profile saved successfully
        </div>
      )}

      {/* Basic Info */}
      <div className="rounded-md border border-gh-border bg-gh-card p-4">
        <h2 className="mb-4 text-base font-semibold text-gh-text">Basic Info</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-gh-muted">Name</label>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gh-muted">Role</label>
            <input className="input" value={role} onChange={(e) => setRole(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gh-muted">Tagline</label>
            <input className="input" value={tagline} onChange={(e) => setTagline(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gh-muted">Location</label>
            <input className="input" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gh-muted">Email</label>
            <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gh-muted">Avatar URL</label>
            <input className="input" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gh-muted">GitHub URL</label>
            <input className="input" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm text-gh-muted">LinkedIn URL</label>
            <input className="input" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm text-gh-muted">Bio</label>
            <textarea
              className="input min-h-[80px] resize-y"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* About Content */}
      <div className="rounded-md border border-gh-border bg-gh-card p-4">
        <h2 className="mb-4 text-base font-semibold text-gh-text">About Content</h2>
        <p className="mb-3 text-sm text-gh-muted">
          Markdown content for the About Me section on the homepage. Leave empty to use default content.
        </p>
        <div className="overflow-hidden rounded-md border border-gh-border">
          <div className="flex border-b border-gh-border">
            <button
              onClick={() => setAboutTab("write")}
              className={`px-4 py-2 text-sm font-medium ${
                aboutTab === "write"
                  ? "border-b-2 border-gh-orange text-gh-text"
                  : "text-gh-muted hover:text-gh-text"
              }`}
            >
              Write
            </button>
            <button
              onClick={() => setAboutTab("preview")}
              className={`px-4 py-2 text-sm font-medium ${
                aboutTab === "preview"
                  ? "border-b-2 border-gh-orange text-gh-text"
                  : "text-gh-muted hover:text-gh-text"
              }`}
            >
              Preview
            </button>
          </div>
          <div className="p-4">
            {aboutTab === "write" ? (
              <textarea
                value={aboutContent}
                onChange={(e) => setAboutContent(e.target.value)}
                className="min-h-[300px] w-full resize-y rounded-md border border-gh-border bg-gh-bg p-3 font-mono text-sm text-gh-text placeholder:text-gh-muted focus:border-gh-link focus:outline-none"
                placeholder="Write your About Me content in Markdown..."
              />
            ) : (
              <div className="min-h-[300px]">
                {aboutContent ? (
                  <MarkdownRenderer content={aboutContent} />
                ) : (
                  <p className="text-gh-muted">Nothing to preview</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="rounded-md border border-gh-border bg-gh-card p-4">
        <h2 className="mb-4 text-base font-semibold text-gh-text">Skills</h2>
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="mb-4 rounded-md border border-gh-border bg-gh-bg p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-gh-text">{category}</span>
              <button
                onClick={() => removeCategory(category)}
                className="text-xs text-gh-red hover:underline"
              >
                Remove category
              </button>
            </div>
            {items.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-2">
                {items.map((skill, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 rounded-full border border-gh-border bg-gh-card px-3 py-1 text-xs text-gh-text"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(category, i)}
                      className="ml-1 text-gh-muted hover:text-gh-red"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input
                className="input flex-1"
                placeholder="Add a skill..."
                value={newSkillInputs[category] ?? ""}
                onChange={(e) =>
                  setNewSkillInputs({ ...newSkillInputs, [category]: e.target.value })
                }
                onKeyDown={(e) => e.key === "Enter" && addSkill(category)}
              />
              <button
                onClick={() => addSkill(category)}
                className="rounded-md border border-gh-border bg-gh-card px-3 py-1 text-sm text-gh-text hover:border-gh-link"
              >
                Add
              </button>
            </div>
          </div>
        ))}
        <div className="flex gap-2">
          <input
            className="input flex-1"
            placeholder="New category name..."
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCategory()}
          />
          <button
            onClick={addCategory}
            className="rounded-md border border-gh-border bg-gh-bg px-4 py-1.5 text-sm text-gh-text hover:border-gh-link"
          >
            Add Category
          </button>
        </div>
      </div>

      {/* Resume */}
      <div className="rounded-md border border-gh-border bg-gh-card p-4">
        <h2 className="mb-4 text-base font-semibold text-gh-text">Resume</h2>
        {resumeUrl ? (
          <div className="mb-3 flex items-center gap-3">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gh-link hover:underline"
            >
              Current resume
            </a>
            <button
              onClick={handleResumeDelete}
              className="text-sm text-gh-red hover:underline"
            >
              Delete
            </button>
          </div>
        ) : (
          <p className="mb-3 text-sm text-gh-muted">No resume uploaded</p>
        )}
        <input
          type="file"
          accept=".pdf"
          onChange={handleResumeUpload}
          disabled={uploading}
          className="text-sm text-gh-muted file:mr-3 file:rounded-md file:border file:border-gh-border file:bg-gh-bg file:px-3 file:py-1.5 file:text-sm file:text-gh-text"
        />
        {uploading && <p className="mt-2 text-sm text-gh-muted">Uploading...</p>}
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="rounded-md bg-gh-green px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Profile"}
      </button>
    </div>
  );
}
