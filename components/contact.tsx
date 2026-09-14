"use client";

import { useState, type FormEvent } from "react";
import { Github, Linkedin, Mail, ArrowRight, Send } from "lucide-react";
import type { Site } from "@/types/content";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact({ site }: { site: Site }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const links = [
    {
      icon: Github,
      label: "GitHub",
      value: site.links.githubHandle,
      href: site.links.github,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: site.links.linkedinName,
      href: site.links.linkedin,
    },
    {
      icon: Mail,
      label: "Email",
      value: site.links.email,
      href: `mailto:${site.links.email}`,
    },
  ];

  return (
    <section id="contact" className="py-24 border-t border-base-800">
      <div className="section-shell grid md:grid-cols-2 gap-14">
        <div>
          <p className="eyebrow">{site.contact.eyebrow}</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
            {site.contact.heading}
          </h2>
          <p className="mt-4 text-white/50 leading-relaxed max-w-sm">
            {site.contact.body}
          </p>

          <div className="mt-8 space-y-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label === "Email" ? undefined : "_blank"}
                rel="noreferrer"
                className="group flex items-center justify-between rounded-2xl card-border bg-base-900 px-5 py-4 hover:border-white/25 transition-colors"
              >
                <span className="flex items-center gap-4">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-base-800 text-white/80 transition-colors duration-200 group-hover:bg-accent group-hover:text-white">
                    <link.icon size={17} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">
                      {link.label}
                    </span>
                    <span className="block text-xs text-white/45">
                      {link.value}
                    </span>
                  </span>
                </span>
                <ArrowRight
                  size={16}
                  className="text-white/30 group-hover:text-white/70 group-hover:translate-x-0.5 transition-all"
                />
              </a>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl card-border bg-base-900 p-6 sm:p-8 space-y-5 h-fit"
        >
          <div>
            <label htmlFor="name" className="text-sm font-medium text-white">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              required
              className="mt-2 w-full rounded-xl card-border bg-base-800 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-white">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              required
              className="mt-2 w-full rounded-xl card-border bg-base-800 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium text-white">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell me about your project..."
              required
              className="mt-2 w-full rounded-xl card-border bg-base-800 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-accent hover:bg-accent-soft disabled:opacity-60 transition-colors text-white font-medium px-6 py-3.5 text-sm"
          >
            <Send size={15} />
            {status === "loading" ? "Sending…" : "Send Message"}
          </button>

          {status === "success" && (
            <p className="text-sm text-emerald-400">
              Message sent. I&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-400">
              Something went wrong — please try again or email me directly.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
