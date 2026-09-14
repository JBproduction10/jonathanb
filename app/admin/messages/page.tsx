"use client";

import { useEffect, useState } from "react";
import { Trash2, Mail, MailOpen } from "lucide-react";

type Message = {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function AdminMessagesPage() {
  const [items, setItems] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/messages");
    setItems(await res.json());
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, []);

  async function toggleRead(m: Message) {
    await fetch(`/api/admin/messages/${m._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !m.read }),
    });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Messages</h1>
      <p className="mt-1 text-white/50 text-sm">Submissions from the contact form.</p>

      <div className="mt-6 space-y-3">
        {loading && <p className="text-white/50 text-sm">Loading…</p>}
        {!loading && items.length === 0 && <p className="text-white/50 text-sm">No messages yet.</p>}
        {items.map((m) => (
          <div key={m._id} className={`rounded-2xl card-border p-5 ${m.read ? "bg-base-900" : "bg-base-900 border-accent/40"}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-white">
                  {m.name} <span className="text-white/40 font-normal">· {m.email}</span>
                </p>
                <p className="text-xs text-white/35 mt-0.5">
                  {new Date(m.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => toggleRead(m)} className="text-white/50 hover:text-white p-2" title={m.read ? "Mark unread" : "Mark read"}>
                  {m.read ? <MailOpen size={16} /> : <Mail size={16} />}
                </button>
                <button onClick={() => handleDelete(m._id)} className="text-white/50 hover:text-red-400 p-2">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <p className="mt-3 text-sm text-white/70 whitespace-pre-wrap">{m.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
