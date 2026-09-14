export type SkillGroup = {
  category: string;
  items: { name: string; icon: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Core",
    items: [
      { name: "HTML", icon: "🌐" },
      { name: "CSS", icon: "🎨" },
      { name: "JavaScript", icon: "⚡" },
      { name: "TypeScript", icon: "📘" },
    ],
  },
  {
    category: "Frameworks",
    items: [
      { name: "React", icon: "⚛️" },
      { name: "Next.js", icon: "▲" },
      { name: "Nuxt", icon: "💚" },
      { name: "Vite", icon: "⚡" },
    ],
  },
  {
    category: "State & API",
    items: [
      { name: "Redux Toolkit", icon: "🔄" },
      { name: "React Query", icon: "🔍" },
    ],
  },
  {
    category: "Styling & Tools",
    items: [
      { name: "Tailwind CSS", icon: "🎯" },
      { name: "Git", icon: "📦" },
      { name: "Figma", icon: "🎨" },
      { name: "Three.js", icon: "🧊" },
    ],
  },
];
