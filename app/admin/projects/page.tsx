"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, X } from "lucide-react";
import ImageUploader from "@/components/admin/image-uploader";

type Project = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  imagePublicId?: string;
  tags: string[];
  previewUrl?: string;
  githubUrl?: string;
};

const emptyForm = {
  slug: "",
  title: "",
  description: "",
  image: "",
  imagePublicId: "",
  tags: "",
  previewUrl: "",
  githubUrl: "",
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/projects");
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function startCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
    setError(null);
  }

  function startEdit(p: Project) {
    setEditingId(p._id);
    setForm({
      slug: p.slug,
      title: p.title,
      description: p.description,
      image: p.image,
      imagePublicId: p.imagePublicId || "",
      tags: p.tags.join(", "),
      previewUrl: p.previewUrl || "",
      githubUrl: p.githubUrl || "",
    });
    setShowForm(true);
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      slug: form.slug.trim(),
      title: form.title.trim(),
      description: form.description.trim(),
      image: form.image.trim(),
      imagePublicId: form.imagePublicId.trim() || undefined,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      previewUrl: form.previewUrl.trim() || undefined,
      githubUrl: form.githubUrl.trim() || undefined,
    };

    const res = await fetch(
      editingId ? `/api/admin/projects/${editingId}` : "/api/admin/projects",
      {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      return;
    }

    setShowForm(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="mt-1 text-white/50 text-sm">
            Shown on the site in this order, top to bottom.
          </p>
        </div>
        <button
          onClick={startCreate}
          className="inline-flex items-center gap-2 rounded-full bg-accent hover:bg-accent-soft transition-colors text-white text-sm font-medium px-5 py-2.5"
        >
          <Plus size={16} />
          New project
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-2xl card-border bg-base-900 p-6 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-white">
              {editingId ? "Edit project" : "New project"}
            </h2>
            <button type="button" onClick={() => setShowForm(false)} className="text-white/50 hover:text-white">
              <X size={18} />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Title">
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="input"
              />
            </Field>
            <Field label="Slug">
              <input
                required
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="my-project"
                className="input"
              />
            </Field>
          </div>

          <Field label="Description">
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="input resize-none"
            />
          </Field>

          <Field label="Image">
            <ImageUploader
              value={form.image}
              onChange={(url, publicId) => setForm({ ...form, image: url, imagePublicId: publicId })}
            />
          </Field>

          <Field label="Tags (comma separated)">
            <input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="Next.js, TypeScript, MongoDB"
              className="input"
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Live preview URL">
              <input
                value={form.previewUrl}
                onChange={(e) => setForm({ ...form, previewUrl: e.target.value })}
                className="input"
              />
            </Field>
            <Field label="GitHub URL">
              <input
                value={form.githubUrl}
                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                className="input"
              />
            </Field>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-accent hover:bg-accent-soft disabled:opacity-60 transition-colors text-white font-medium px-6 py-2.5 text-sm"
          >
            {saving ? "Saving…" : editingId ? "Save changes" : "Create project"}
          </button>
        </form>
      )}

      <div className="mt-8 space-y-3">
        {loading && <p className="text-white/50 text-sm">Loading…</p>}
        {!loading && projects.length === 0 && (
          <p className="text-white/50 text-sm">No projects yet — add your first one above.</p>
        )}
        {projects.map((p) => (
          <div
            key={p._id}
            className="flex items-center gap-4 rounded-2xl card-border bg-base-900 p-4"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt="" className="h-14 w-20 rounded-lg object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-white truncate">{p.title}</p>
              <p className="text-xs text-white/40 truncate">{p.tags.join(" · ")}</p>
            </div>
            <button onClick={() => startEdit(p)} className="text-white/50 hover:text-white p-2">
              <Pencil size={16} />
            </button>
            <button onClick={() => handleDelete(p._id)} className="text-white/50 hover:text-red-400 p-2">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-white">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
