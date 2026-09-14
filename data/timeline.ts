export type TimelineEntry = {
  type: "work" | "education";
  title: string; // role or program name
  place: string; // company or institution
  period: string; // e.g. "2023 — Present"
  description?: string;
};

// Fill this in with your real work history and education. The section
// renders automatically once entries exist, and stays hidden while empty.
// Example:
// {
//   type: "work",
//   title: "Frontend Developer",
//   place: "Company Name",
//   period: "2024 — Present",
//   description: "What you did there, briefly.",
// },
export const timeline: TimelineEntry[] = [];
