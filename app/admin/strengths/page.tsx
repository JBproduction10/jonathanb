"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, X } from "lucide-react";

type Strength = { _id: string; title: string; description: string };
const empty = { title: "", description: "" };

export default function AdminStrengthsPage() {
  const [items, setItems] = useState<Strength[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/strengths");
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
  function startEdit(s: Strength) {
    setEditingId(s._id);
    setForm({ title: s.title, description: s.description });
    setShowForm(true);
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(editingId ? `/api/admin/strengths/${editingId}` : "/api/admin/strengths", {
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
    if (!confirm("Delete this strength?")) return;
    await fetch(`/api/admin/strengths/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Strengths</h1>
          <p className="mt-1 text-white/50 text-sm">Shown in the Strengths section.</p>
        </div>
        <button onClick={startCreate} className="inline-flex items-center gap-2 rounded-full bg-accent hover:bg-accent-soft transition-colors text-white text-sm font-medium px-5 py-2.5">
          <Plus size={16} /> New strength
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-6 rounded-2xl card-border bg-base-900 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-white">{editingId ? "Edit strength" : "New strength"}</h2>
            <button type="button" onClick={() => setShowForm(false)} className="text-white/50 hover:text-white"><X size={18} /></button>
          </div>
          <label className="block">
            <span className="text-sm font-medium text-white">Title</span>
            <input required className="input mt-2" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-white">Description</span>
            <textarea required rows={2} className="input mt-2 resize-none" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </label>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button type="submit" className="rounded-full bg-accent hover:bg-accent-soft transition-colors text-white font-medium px-6 py-2.5 text-sm">
            {editingId ? "Save changes" : "Create"}
          </button>
        </form>
      )}

      <div className="mt-8 space-y-3">
        {loading && <p className="text-white/50 text-sm">Loading…</p>}
        {!loading && items.length === 0 && <p className="text-white/50 text-sm">No strengths yet.</p>}
        {items.map((s) => (
          <div key={s._id} className="flex items-center justify-between rounded-2xl card-border bg-base-900 p-4">
            <div>
              <p className="font-medium text-white">{s.title}</p>
              <p className="text-sm text-white/50">{s.description}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => startEdit(s)} className="text-white/50 hover:text-white p-2"><Pencil size={16} /></button>
              <button onClick={() => handleDelete(s._id)} className="text-white/50 hover:text-red-400 p-2"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
