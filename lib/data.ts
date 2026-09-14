// Every component reads content through these functions. They now read
// from MongoDB (populated by the admin dashboard) and fall back to the
// static defaults in /data if the database is empty or unreachable — so
// the site still renders before you've seeded/configured a database.

import { connectDB } from "@/lib/mongodb";
import SiteSettings from "@/lib/models/SiteSettings";
import Project from "@/lib/models/Project";
import SkillGroup from "@/lib/models/SkillGroup";
import Strength from "@/lib/models/Strength";
import Timeline from "@/lib/models/Timeline";

import { site as staticSite, type Site } from "@/data/site";
import { skillGroups as staticSkillGroups, type SkillGroup as SkillGroupT } from "@/data/skills";
import { projects as staticProjects, type Project as ProjectT } from "@/data/projects";
import { strengths as staticStrengths, type Strength as StrengthT } from "@/data/strengths";
import { timeline as staticTimeline, type TimelineEntry } from "@/data/timeline";

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.error("[lib/data] falling back to static data:", (err as Error).message);
    return fallback;
  }
}

export async function getSite(): Promise<Site> {
  return safe(async () => {
    await connectDB();
    const doc = await SiteSettings.findOne().lean();
    if (!doc) return staticSite;
    const { _id, __v, createdAt, updatedAt, ...rest } = doc as any;
    return rest as Site;
  }, staticSite);
}

export async function getSkillGroups(): Promise<SkillGroupT[]> {
  return safe(async () => {
    await connectDB();
    const docs = await SkillGroup.find().sort({ order: 1, createdAt: 1 }).lean();
    if (!docs.length) return staticSkillGroups;
    return docs.map((d: any) => ({ category: d.category, items: d.items }));
  }, staticSkillGroups);
}

export async function getProjects(): Promise<ProjectT[]> {
  return safe(async () => {
    await connectDB();
    const docs = await Project.find().sort({ order: 1, createdAt: 1 }).lean();
    if (!docs.length) return staticProjects;
    return docs.map((d: any) => ({
      slug: d.slug,
      title: d.title,
      description: d.description,
      image: d.image,
      tags: d.tags ?? [],
      previewUrl: d.previewUrl,
      githubUrl: d.githubUrl,
    }));
  }, staticProjects);
}

export async function getStrengths(): Promise<StrengthT[]> {
  return safe(async () => {
    await connectDB();
    const docs = await Strength.find().sort({ order: 1, createdAt: 1 }).lean();
    if (!docs.length) return staticStrengths;
    return docs.map((d: any) => ({ title: d.title, description: d.description }));
  }, staticStrengths);
}

export async function getTimeline(): Promise<TimelineEntry[]> {
  return safe(async () => {
    await connectDB();
    const docs = await Timeline.find().sort({ order: 1, createdAt: 1 }).lean();
    if (!docs.length) return staticTimeline;
    return docs.map((d: any) => ({
      type: d.type,
      title: d.title,
      place: d.place,
      period: d.period,
      description: d.description,
    }));
  }, staticTimeline);
}
