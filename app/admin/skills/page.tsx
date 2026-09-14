"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, X } from "lucide-react";

type SkillGroup = { _id: string; category: string; items: { name: string; icon: string }[] };

const empty = { category: "", itemsText: "" };

// itemsText format: one skill per line as "Name | icon" (icon optional emoji)
function parseItems(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, icon] = line.split("|").map((s) => s.trim());
      return { name, icon: icon || "⚡" };
    });
}

export default function AdminSkillsPage() {
  const [groups, setGroups] = useState<SkillGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/skills");
    setGroups(await res.json());
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
  function startEdit(g: SkillGroup) {
    setEditingId(g._id);
    setForm({ category: g.category, itemsText: g.items.map((i) => `${i.name} | ${i.icon}`).join("\n") });
    setShowForm(true);
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { category: form.category.trim(), items: parseItems(form.itemsText) };
    const res = await fetch(editingId ? `/api/admin/skills/${editingId}` : "/api/admin/skills", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) return setError(data.error || "Something went wrong.");
    setShowForm(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this skill group?")) return;
    await fetch(`/api/admin/skills/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Skills</h1>
          <p className="mt-1 text-white/50 text-sm">Grouped skill categories shown in the Skills section.</p>
        </div>
        <button
          onClick={startCreate}
          className="inline-flex items-center gap-2 rounded-full bg-accent hover:bg-accent-soft transition-colors text-white text-sm font-medium px-5 py-2.5"
        >
          <Plus size={16} /> New group
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-6 rounded-2xl card-border bg-base-900 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-white">{editingId ? "Edit group" : "New group"}</h2>
            <button type="button" onClick={() => setShowForm(false)} className="text-white/50 hover:text-white">
              <X size={18} />
            </button>
          </div>
          <label className="block">
            <span className="text-sm font-medium text-white">Category name</span>
            <input
              required
              className="input mt-2"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="Frameworks"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-white">
              Skills — one per line, as &quot;Name | emoji&quot;
            </span>
            <textarea
              required
              rows={5}
              className="input mt-2 resize-none font-mono"
              value={form.itemsText}
              onChange={(e) => setForm({ ...form, itemsText: e.target.value })}
              placeholder={"React | ⚛️\nNext.js | ▲"}
            />
          </label>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button type="submit" className="rounded-full bg-accent hover:bg-accent-soft transition-colors text-white font-medium px-6 py-2.5 text-sm">
            {editingId ? "Save changes" : "Create group"}
          </button>
        </form>
      )}

      <div className="mt-8 space-y-3">
        {loading && <p className="text-white/50 text-sm">Loading…</p>}
        {!loading && groups.length === 0 && <p className="text-white/50 text-sm">No skill groups yet.</p>}
        {groups.map((g) => (
          <div key={g._id} className="rounded-2xl card-border bg-base-900 p-4">
            <div className="flex items-center justify-between">
              <p className="font-medium text-white">{g.category}</p>
              <div className="flex items-center gap-1">
                <button onClick={() => startEdit(g)} className="text-white/50 hover:text-white p-2"><Pencil size={16} /></button>
                <button onClick={() => handleDelete(g._id)} className="text-white/50 hover:text-red-400 p-2"><Trash2 size={16} /></button>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {g.items.map((i) => (
                <span key={i.name} className="text-xs rounded-full card-border bg-base-800 text-white/60 px-3 py-1.5">
                  {i.icon} {i.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
