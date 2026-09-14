"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, X } from "lucide-react";

type TimelineEntry = {
  _id: string;
  type: "work" | "education";
  title: string;
  place: string;
  period: string;
  description?: string;
};
type TimelineFormState = {
  type: "work" | "education";
  title: string;
  place: string;
  period: string;
  description: string;
};
const empty: TimelineFormState = { type: "work", title: "", place: "", period: "", description: "" };

export default function AdminTimelinePage() {
  const [items, setItems] = useState<TimelineEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TimelineFormState>(empty);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/timeline");
    setItems(await res.json());
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, []);

  function startCreate() {
    setEditingId(null);
    setForm(empty);
    setShowForm(true);
    setError(null);
  }
  function startEdit(t: TimelineEntry) {
    setEditingId(t._id);
    setForm({ type: t.type, title: t.title, place: t.place, period: t.period, description: t.description || "" });
    setShowForm(true);
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(editingId ? `/api/admin/timeline/${editingId}` : "/api/admin/timeline", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) return setError(data.error || "Something went wrong.");
    setShowForm(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this entry?")) return;
    await fetch(`/api/admin/timeline/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Work & Education</h1>
          <p className="mt-1 text-white/50 text-sm">Timeline entries — the section stays hidden while empty.</p>
        </div>
        <button onClick={startCreate} className="inline-flex items-center gap-2 rounded-full bg-accent hover:bg-accent-soft transition-colors text-white text-sm font-medium px-5 py-2.5">
          <Plus size={16} /> New entry
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-6 rounded-2xl card-border bg-base-900 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-white">{editingId ? "Edit entry" : "New entry"}</h2>
            <button type="button" onClick={() => setShowForm(false)} className="text-white/50 hover:text-white"><X size={18} /></button>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-white">Type</span>
            <select
              className="input mt-2"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as "work" | "education" })}
            >
              <option value="work">Work</option>
              <option value="education">Education</option>
            </select>
          </label>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-white">Title (role / program)</span>
              <input required className="input mt-2" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-white">Place (company / school)</span>
              <input required className="input mt-2" value={form.place} onChange={(e) => setForm({ ...form, place: e.target.value })} />
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-medium text-white">Period</span>
            <input required className="input mt-2" placeholder="2024 — Present" value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-white">Description (optional)</span>
            <textarea rows={2} className="input mt-2 resize-none" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </label>

          {error && <p className="text-sm text-red-400">{error}</p>}
          <button type="submit" className="rounded-full bg-accent hover:bg-accent-soft transition-colors text-white font-medium px-6 py-2.5 text-sm">
            {editingId ? "Save changes" : "Create"}
          </button>
        </form>
      )}

      <div className="mt-8 space-y-3">
        {loading && <p className="text-white/50 text-sm">Loading…</p>}
        {!loading && items.length === 0 && <p className="text-white/50 text-sm">No entries yet.</p>}
        {items.map((t) => (
          <div key={t._id} className="flex items-center justify-between rounded-2xl card-border bg-base-900 p-4">
            <div>
              <p className="font-medium text-white">
                {t.title} <span className="text-white/40 font-normal">— {t.place}</span>
              </p>
              <p className="text-xs text-white/40">{t.period} · {t.type}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => startEdit(t)} className="text-white/50 hover:text-white p-2"><Pencil size={16} /></button>
              <button onClick={() => handleDelete(t._id)} className="text-white/50 hover:text-red-400 p-2"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
