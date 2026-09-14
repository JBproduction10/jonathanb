import { connectDB } from "@/lib/mongodb";
import Project from "@/lib/models/Project";
import SkillGroup from "@/lib/models/SkillGroup";
import Strength from "@/lib/models/Strength";
import Timeline from "@/lib/models/Timeline";
import Message from "@/lib/models/Message";
import { FolderKanban, Sparkles, Trophy, History, Mail } from "lucide-react";
import Link from "next/link";

async function getCounts() {
  await connectDB();
  const [projects, skills, strengths, timeline, messages, unread] = await Promise.all([
    Project.countDocuments(),
    SkillGroup.countDocuments(),
    Strength.countDocuments(),
    Timeline.countDocuments(),
    Message.countDocuments(),
    Message.countDocuments({ read: false }),
  ]);
  return { projects, skills, strengths, timeline, messages, unread };
}

export default async function AdminOverviewPage() {
  const counts = await getCounts();

  const cards = [
    { label: "Projects", value: counts.projects, href: "/admin/projects", icon: FolderKanban },
    { label: "Skill groups", value: counts.skills, href: "/admin/skills", icon: Sparkles },
    { label: "Strengths", value: counts.strengths, href: "/admin/strengths", icon: Trophy },
    { label: "Timeline entries", value: counts.timeline, href: "/admin/timeline", icon: History },
    {
      label: "Messages",
      value: counts.messages,
      href: "/admin/messages",
      icon: Mail,
      badge: counts.unread > 0 ? `${counts.unread} unread` : undefined,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Overview</h1>
      <p className="mt-1 text-white/50 text-sm">
        Manage your portfolio&apos;s content, projects, and incoming messages.
      </p>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl card-border bg-base-900 p-6 hover:border-white/25 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-base-800 text-accent">
                <card.icon size={18} />
              </span>
              {card.badge && (
                <span className="text-xs rounded-full bg-accent/20 text-accent px-2.5 py-1">
                  {card.badge}
                </span>
              )}
            </div>
            <p className="mt-4 text-3xl font-bold text-white">{card.value}</p>
            <p className="text-sm text-white/50">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
