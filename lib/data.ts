// Every component reads content through these functions. Content lives in
// MongoDB, populated and edited via the admin dashboard. List queries fall
// back to an empty array on a database error (the sections that map over
// them already hide themselves when empty). The singleton site settings
// fall back to `emptySite` so the site shell and the admin form itself
// don't crash before you've saved anything yet.

import { connectDB } from "@/lib/mongodb";
import SiteSettings from "@/lib/models/SiteSettings";
import Project from "@/lib/models/Project";
import SkillGroup from "@/lib/models/SkillGroup";
import Strength from "@/lib/models/Strength";
import Timeline from "@/lib/models/Timeline";

import type {
  Site,
  SkillGroup as SkillGroupT,
  Project as ProjectT,
  Strength as StrengthT,
  TimelineEntry,
} from "@/types/content";

export const emptySite: Site = {
  name: "",
  shortName: "",
  role: "",
  tagline: "",
  heroHeadline: [],
  heroSubline: "",
  availableForWork: false,
  description: "",
  about: {
    eyebrow: "",
    heading: "",
    headingAccent: "",
    paragraphs: [],
    stats: [],
    coreValues: [],
  },
  contact: {
    eyebrow: "",
    heading: "",
    body: "",
  },
  links: {
    github: "",
    githubHandle: "",
    linkedin: "",
    linkedinName: "",
    email: "",
  },
  resumeUrl: "/resume/resume.pdf",
  resumeReady: false,
};

async function safeQuery<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.error("[lib/data] database error, using fallback:", (err as Error).message);
    return fallback;
  }
}

export async function getSite(): Promise<Site> {
  return safeQuery(async () => {
    await connectDB();
    const doc = await SiteSettings.findOne().lean();
    if (!doc) return emptySite;
    const { _id, __v, createdAt, updatedAt, ...rest } = doc as any;
    return rest as Site;
  }, emptySite);
}

export async function getSkillGroups(): Promise<SkillGroupT[]> {
  return safeQuery(async () => {
    await connectDB();
    const docs = await SkillGroup.find().sort({ order: 1, createdAt: 1 }).lean();
    return docs.map((d: any) => ({ category: d.category, items: d.items }));
  }, []);
}

export async function getProjects(): Promise<ProjectT[]> {
  return safeQuery(async () => {
    await connectDB();
    const docs = await Project.find().sort({ order: 1, createdAt: 1 }).lean();
    return docs.map((d: any) => ({
      slug: d.slug,
      title: d.title,
      description: d.description,
      image: d.image,
      tags: d.tags ?? [],
      previewUrl: d.previewUrl,
      githubUrl: d.githubUrl,
    }));
  }, []);
}

export async function getStrengths(): Promise<StrengthT[]> {
  return safeQuery(async () => {
    await connectDB();
    const docs = await Strength.find().sort({ order: 1, createdAt: 1 }).lean();
    return docs.map((d: any) => ({ title: d.title, description: d.description }));
  }, []);
}

export async function getTimeline(): Promise<TimelineEntry[]> {
  return safeQuery(async () => {
    await connectDB();
    const docs = await Timeline.find().sort({ order: 1, createdAt: 1 }).lean();
    return docs.map((d: any) => ({
      type: d.type,
      title: d.title,
      place: d.place,
      period: d.period,
      description: d.description,
    }));
  }, []);
}
