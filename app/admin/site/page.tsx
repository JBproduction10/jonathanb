"use client";

import { useEffect, useState } from "react";

export default function AdminSitePage() {
  const [form, setForm] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/site")
      .then((r) => r.json())
      .then(setForm);
  }, []);

  function set(path: string, value: any) {
    setForm((prev: any) => {
      const next = structuredClone(prev);
      const keys = path.split(".");
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/site", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!form) return <p className="text-white/50 text-sm">Loading…</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Site content</h1>
      <p className="mt-1 text-white/50 text-sm">
        Edits here update the hero, about, and contact sections on the live site.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6 max-w-2xl">
        <Section title="Identity">
          <Field label="Full name">
            <input className="input" value={form.name} onChange={(e) => set("name", e.target.value)} />
          </Field>
          <Field label="Short name (navbar)">
            <input className="input" value={form.shortName} onChange={(e) => set("shortName", e.target.value)} />
          </Field>
          <Field label="Role">
            <input className="input" value={form.role} onChange={(e) => set("role", e.target.value)} />
          </Field>
          <Field label="Tagline">
            <input className="input" value={form.tagline} onChange={(e) => set("tagline", e.target.value)} />
          </Field>
          <Field label="Hero subline">
            <textarea
              rows={2}
              className="input resize-none"
              value={form.heroSubline}
              onChange={(e) => set("heroSubline", e.target.value)}
            />
          </Field>
          <label className="flex items-center gap-2 text-sm text-white/70">
            <input
              type="checkbox"
              checked={form.availableForWork}
              onChange={(e) => set("availableForWork", e.target.checked)}
            />
            Available for work
          </label>
        </Section>

        <Section title="About">
          <Field label="Heading">
            <input className="input" value={form.about.heading} onChange={(e) => set("about.heading", e.target.value)} />
          </Field>
          <Field label="Heading accent">
            <input
              className="input"
              value={form.about.headingAccent}
              onChange={(e) => set("about.headingAccent", e.target.value)}
            />
          </Field>
          <Field label="Paragraphs (one per line)">
            <textarea
              rows={5}
              className="input resize-none"
              value={form.about.paragraphs.join("\n")}
              onChange={(e) => set("about.paragraphs", e.target.value.split("\n"))}
            />
          </Field>
          <Field label="Stats (the numbers shown in the About panel, e.g. &quot;5+ / Years experience&quot;)">
            <div className="space-y-3">
              {form.about.stats.map((stat: { value: string; label: string }, i: number) => (
                <div key={i} className="flex gap-2">
                  <input
                    className="input"
                    placeholder="Value (e.g. 5+)"
                    value={stat.value}
                    onChange={(e) => {
                      const next = [...form.about.stats];
                      next[i] = { ...next[i], value: e.target.value };
                      set("about.stats", next);
                    }}
                  />
                  <input
                    className="input"
                    placeholder="Label (e.g. Years experience)"
                    value={stat.label}
                    onChange={(e) => {
                      const next = [...form.about.stats];
                      next[i] = { ...next[i], label: e.target.value };
                      set("about.stats", next);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      set(
                        "about.stats",
                        form.about.stats.filter((_: unknown, idx: number) => idx !== i)
                      )
                    }
                    aria-label="Remove stat"
                    className="shrink-0 rounded-lg card-border px-3 text-white/40 hover:text-red-400 hover:border-red-400/40 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => set("about.stats", [...form.about.stats, { value: "", label: "" }])}
                className="text-sm text-accent hover:text-accent-soft transition-colors"
              >
                + Add stat
              </button>
            </div>
          </Field>
          <Field label="Core values (comma separated)">
            <input
              className="input"
              value={form.about.coreValues.join(", ")}
              onChange={(e) =>
                set("about.coreValues", e.target.value.split(",").map((v: string) => v.trim()).filter(Boolean))
              }
            />
          </Field>
        </Section>

        <Section title="Contact">
          <Field label="Heading">
            <input className="input" value={form.contact.heading} onChange={(e) => set("contact.heading", e.target.value)} />
          </Field>
          <Field label="Body">
            <textarea
              rows={2}
              className="input resize-none"
              value={form.contact.body}
              onChange={(e) => set("contact.body", e.target.value)}
            />
          </Field>
        </Section>

        <Section title="Links">
          <Field label="GitHub URL">
            <input className="input" value={form.links.github} onChange={(e) => set("links.github", e.target.value)} />
          </Field>
          <Field label="LinkedIn URL">
            <input className="input" value={form.links.linkedin} onChange={(e) => set("links.linkedin", e.target.value)} />
          </Field>
          <Field label="Email">
            <input className="input" value={form.links.email} onChange={(e) => set("links.email", e.target.value)} />
          </Field>
        </Section>

        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-accent hover:bg-accent-soft disabled:opacity-60 transition-colors text-white font-medium px-6 py-2.5 text-sm"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
        {saved && <span className="ml-3 text-sm text-emerald-400">Saved.</span>}
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl card-border bg-base-900 p-6 space-y-4">
      <h2 className="font-semibold text-white">{title}</h2>
      {children}
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
