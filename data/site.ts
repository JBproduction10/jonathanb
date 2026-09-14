// Central place for site copy. When the MongoDB-backed admin dashboard is
// ready, `lib/data.ts` is the only file that needs to change — swap the
// static exports below for fetch calls and every component keeps working.

export const site = {
  name: "Jonathan Bangala",
  shortName: "Jonathan",
  role: "Frontend Developer",
  tagline: "Crafting modern, fast, and visually perfect web experiences.",
  heroHeadline: [
    "Crafting modern, fast,",
    "and visually perfect",
    "web experiences.",
  ],
  heroSubline:
    "Frontend Developer — React, Next.js, TypeScript. Building pixel-perfect interfaces with exceptional attention to detail.",
  availableForWork: true,
  description:
    "Frontend Developer specializing in React, Next.js, and TypeScript.",
  about: {
    eyebrow: "About Me",
    heading: "A passionate developer focused on",
    headingAccent: "visual precision",
    paragraphs: [
      "Hi, I'm Jonathan, a Frontend Developer from Uzbekistan. I specialize in building modern, responsive web applications with React, Next.js, and TypeScript.",
      "I'm an early riser with a disciplined approach to productivity. My strength lies in clean UI implementation, pixel-perfect designs, and modern frontend architecture.",
      "Every project I take on is crafted with exceptional attention to detail, ensuring visually accurate implementations that match design specifications perfectly.",
    ],
    stats: [
      { value: "1.5+", label: "Years Learning" },
      { value: "5+", label: "Projects Built" },
      { value: "8+", label: "Technologies" },
    ],
    coreValues: [
      "Clean Code",
      "Pixel Perfect",
      "Fast Learner",
      "Discipline",
      "Detail-Oriented",
    ],
  },
  contact: {
    eyebrow: "Contact",
    heading: "Let's work together",
    body: "Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing together.",
  },
  links: {
    github: "https://github.com/JBproduction10",
    githubHandle: "@JBproduction10",
    linkedin: "https://www.linkedin.com/in/jonathan-bangala/",
    linkedinName: "Jonathan Bangala",
    email: "jbangala90@gmail.com",
  },
  // Place resume.pdf in /public/resume/ and update this path when ready.
  resumeUrl: "/resume/resume.pdf",
  resumeReady: false,
} as const;

export type Site = typeof site;
