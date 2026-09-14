// Content shapes for everything editable via the admin dashboard. These
// used to live alongside static placeholder data in /data; now that
// content lives only in MongoDB, this file holds just the types.

export type Site = {
  name: string;
  shortName: string;
  role: string;
  tagline: string;
  heroHeadline: string[];
  heroSubline: string;
  availableForWork: boolean;
  description: string;
  about: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    paragraphs: string[];
    stats: { value: string; label: string }[];
    coreValues: string[];
  };
  contact: {
    eyebrow: string;
    heading: string;
    body: string;
  };
  links: {
    github: string;
    githubHandle: string;
    linkedin: string;
    linkedinName: string;
    email: string;
  };
  resumeUrl: string;
  resumeReady: boolean;
};

export type SkillGroup = {
  category: string;
  items: { name: string; icon: string }[];
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  previewUrl?: string;
  githubUrl?: string;
};

export type Strength = {
  title: string;
  description: string;
};

export type TimelineEntry = {
  type: "work" | "education";
  title: string; // role or program name
  place: string; // company or institution
  period: string; // e.g. "2023 — Present"
  description?: string;
};
