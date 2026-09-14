"use client";

import { useEffect, useState } from "react";

const PROVIDERS = [
  { value: "resend", label: "Resend" },
  { value: "sendgrid", label: "SendGrid" },
  { value: "smtp", label: "SMTP" },
  { value: "outlook", label: "Outlook / Office 365 (SMTP)" },
];

export default function AdminEmailSettingsPage() {
  const [form, setForm] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/email-settings")
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
    setTestResult(null);
    const res = await fetch("/api/admin/email-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      // Clear the secret fields we just sent — GET always returns them blank.
      setForm((prev: any) => ({
        ...prev,
        smtp: { ...prev.smtp, password: "" },
        sendgrid: { apiKey: "" },
        resend: { apiKey: "" },
      }));
      setTimeout(() => setSaved(false), 2000);
    }
  }

  async function handleTest() {
    setTesting(true);
    setTestResult(null);
    const res = await fetch("/api/admin/email-settings/test", { method: "POST" });
    const data = await res.json();
    setTesting(false);
    setTestResult(
      res.ok
        ? { ok: true, message: `Sent to ${form.adminEmail}. Check your inbox.` }
        : { ok: false, message: data.error || "Failed to send test email." }
    );
  }

  if (!form) return <p className="text-white/50 text-sm">Loading…</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Email settings</h1>
      <p className="mt-1 text-white/50 text-sm">
        Controls the notification sent to you (and optionally a confirmation back to the
        sender) when someone submits the contact form. Messages are always saved to the
        database regardless of whether email is configured.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6 max-w-2xl">
        <Section title="Provider">
          <Field label="Email provider">
            <select
              className="input"
              value={form.provider}
              onChange={(e) => set("provider", e.target.value)}
            >
              {PROVIDERS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </Field>

          {form.provider === "resend" && (
            <Field label="Resend API key">
              <input
                type="password"
                className="input"
                placeholder="Leave blank to keep the current key"
                value={form.resend.apiKey}
                onChange={(e) => set("resend.apiKey", e.target.value)}
              />
            </Field>
          )}

          {form.provider === "sendgrid" && (
            <Field label="SendGrid API key">
              <input
                type="password"
                className="input"
                placeholder="Leave blank to keep the current key"
                value={form.sendgrid.apiKey}
                onChange={(e) => set("sendgrid.apiKey", e.target.value)}
              />
            </Field>
          )}

          {(form.provider === "smtp" || form.provider === "outlook") && (
            <>
              <Field label="SMTP host">
                <input
                  className="input"
                  value={form.smtp.host}
                  onChange={(e) => set("smtp.host", e.target.value)}
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Port">
                  <input
                    type="number"
                    className="input"
                    value={form.smtp.port}
                    onChange={(e) => set("smtp.port", Number(e.target.value))}
                  />
                </Field>
                <label className="flex items-center gap-2 text-sm text-white/70 mt-7">
                  <input
                    type="checkbox"
                    checked={form.smtp.secure}
                    onChange={(e) => set("smtp.secure", e.target.checked)}
                  />
                  Use TLS (secure)
                </label>
              </div>
              <Field label="SMTP username">
                <input
                  className="input"
                  value={form.smtp.user}
                  onChange={(e) => set("smtp.user", e.target.value)}
                />
              </Field>
              <Field label="SMTP password">
                <input
                  type="password"
                  className="input"
                  placeholder="Leave blank to keep the current password"
                  value={form.smtp.password || ""}
                  onChange={(e) => set("smtp.password", e.target.value)}
                />
              </Field>
            </>
          )}
        </Section>

        <Section title="Sender">
          <Field label="From name">
            <input className="input" value={form.fromName} onChange={(e) => set("fromName", e.target.value)} />
          </Field>
          <Field label="From email">
            <input className="input" value={form.fromEmail} onChange={(e) => set("fromEmail", e.target.value)} />
          </Field>
          <Field label="Reply-to (optional)">
            <input className="input" value={form.replyTo || ""} onChange={(e) => set("replyTo", e.target.value)} />
          </Field>
        </Section>

        <Section title="Notifications">
          <Field label="Send notifications to">
            <input
              className="input"
              value={form.adminEmail}
              onChange={(e) => set("adminEmail", e.target.value)}
            />
          </Field>
          <Field label="Notification subject (use {name} for the sender's name)">
            <input
              className="input"
              value={form.adminSubject}
              onChange={(e) => set("adminSubject", e.target.value)}
            />
          </Field>
          <label className="flex items-center gap-2 text-sm text-white/70">
            <input
              type="checkbox"
              checked={form.sendConfirmation}
              onChange={(e) => set("sendConfirmation", e.target.checked)}
            />
            Also send a confirmation email to whoever submits the form
          </label>
          {form.sendConfirmation && (
            <Field label="Confirmation subject">
              <input
                className="input"
                value={form.confirmationSubject}
                onChange={(e) => set("confirmationSubject", e.target.value)}
              />
            </Field>
          )}
        </Section>

        <Section title="Test mode">
          <label className="flex items-center gap-2 text-sm text-white/70">
            <input
              type="checkbox"
              checked={form.testMode}
              onChange={(e) => set("testMode", e.target.checked)}
            />
            Test mode — log emails instead of actually sending them
          </label>
          <p className="text-xs text-white/40">
            Turn this off once you&apos;ve confirmed the test email below arrives.
          </p>
        </Section>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-accent hover:bg-accent-soft disabled:opacity-60 transition-colors text-white font-medium px-6 py-2.5 text-sm"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
          <button
            type="button"
            onClick={handleTest}
            disabled={testing}
            className="rounded-full card-border hover:bg-base-800 disabled:opacity-60 transition-colors text-white font-medium px-6 py-2.5 text-sm"
          >
            {testing ? "Sending…" : "Send test email"}
          </button>
          {saved && <span className="text-sm text-emerald-400">Saved.</span>}
        </div>

        {testResult && (
          <p className={`text-sm ${testResult.ok ? "text-emerald-400" : "text-red-400"}`}>
            {testResult.message}
          </p>
        )}
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
