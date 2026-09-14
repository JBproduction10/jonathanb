"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  Sparkles,
  Trophy,
  History,
  Mail,
  Send,
  LogOut,
  Globe,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/site", label: "Site Content", icon: Settings },
  { href: "/admin/skills", label: "Skills", icon: Sparkles },
  { href: "/admin/strengths", label: "Strengths", icon: Trophy },
  { href: "/admin/timeline", label: "Timeline", icon: History },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/email-settings", label: "Email Settings", icon: Send },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-base-800 bg-base-900 min-h-screen flex flex-col">
      <div className="px-6 py-5 border-b border-base-800">
        <p className="font-bold text-white">
          Admin<span className="text-accent">.</span>
        </p>
        <p className="text-xs text-white/40 mt-1">Portfolio dashboard</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map((link) => {
          const active =
            link.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-accent text-white"
                  : "text-white/60 hover:text-white hover:bg-base-800"
              }`}
            >
              <link.icon size={16} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-base-800 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-base-800 transition-colors"
        >
          <Globe size={16} />
          View site
        </a>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-base-800 transition-colors"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
