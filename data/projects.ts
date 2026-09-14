export type Project = {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  previewUrl?: string;
  githubUrl?: string;
};

// Images referenced below live in /public/project-image/ — copy the
// matching screenshots over from the deployed site (they weren't included
// in either uploaded zip, so this repo ships with placeholders for now).
export const projects: Project[] = [
  {
    slug: "optimum-car-rental-platform",
    title: "Optimum - Car Rental Platform",
    description:
      "Optimum is a car rental platform built with HTML, CSS, and JavaScript. It features a sleek, modern design and allows users to browse and rent cars with ease. The project includes a responsive layout, smooth animations, and an intuitive user interface for a seamless car rental experience.",
    image: "/project-image/optimum.png",
    tags: ["JavaScript", "HTML5", "CSS", "SCSS"],
    previewUrl: "https://carshipment-w6r1.vercel.app/",
    githubUrl: "https://github.com/fenix1409/Carshipment",
  },
  {
    slug: "al-muamalat",
    title: "Al-Muamalat",
    description:
      "Al-Muamalat is a modern web application designed for managing financial transactions and services. It features a user-friendly interface built with React, TypeScript, and Tailwind CSS. The project utilizes React Query for efficient data fetching and state management, and Axios for API requests. The application includes features such as transaction history, account management, and financial analytics.",
    image: "/project-image/al-muamalat.png",
    tags: [
      "React JS",
      "Tailwind CSS",
      "CSS",
      "TypeScript",
      "React-Query",
      "Axios",
      "Framer-motion",
      "Swiper",
    ],
    previewUrl: "https://www.al-muamalat.uz/",
  },
  {
    slug: "movies",
    title: "Movies",
    description:
      "Movies is a website that allows users to search for movies, view details, and explore trending films. Built with React, JavaScript, and Tailwind CSS, it features a responsive design and utilizes the TMDB API for movie data. The project includes viewing details of movies, displaying many categories and etc.",
    image: "/project-image/movies.png",
    tags: ["JavaScript", "React", "Tailwind Css", "Axios", "React-Query", "TMDB API"],
    previewUrl: "https://films-kappa-one.vercel.app/",
    githubUrl: "https://github.com/fenix1409/films",
  },
  {
    slug: "gocart-ecommerce-platform",
    title: "GoCart E-Commerce Platform",
    description:
      "GoCart is a modern e-commerce platform built with Next.js, JavaScript, and Tailwind CSS. It features a sleek, responsive design and utilizes React Query for efficient data fetching and state management. The project includes a product catalog, shopping cart functionality, and user authentication using Clerk. GoCart provides a seamless shopping experience with smooth animations and intuitive UI components.",
    image: "/project-image/gocart.png",
    tags: ["JavaScript", "Next.js", "Tailwind Css", "Redux Toolkit", "React-Query", "Clerk Auth"],
    previewUrl: "https://gocart-shopify-store.vercel.app/",
    githubUrl: "https://github.com/fenix1409/gocart-shopify-store",
  },
  {
    slug: "quickgpt-ai-chatbot-platform",
    title: "QuickGPT - AI Chatbot Platform",
    description:
      "QuickGPT is an AI chatbot platform that allows users to interact with an AI assistant for various tasks. Built with React, TypeScript, and Tailwind CSS, it features a sleek, modern design and utilizes OpenAI's GPT-3.5 API for natural language processing. The project includes real-time chat functionality, conversation history, and user authentication using Firebase.",
    image: "/project-image/gpt.png",
    tags: [
      "JavaScript",
      "React",
      "Tailwind Css",
      "Express.js",
      "MongoDB",
      "OpenAI GPT-3.5",
      "Firebase Auth",
    ],
    previewUrl: "https://quick-gpt-eight-beta.vercel.app/",
    githubUrl: "https://github.com/fenix1409/QuickGPT",
  },
  {
    slug: "codeflex-ai-fitness-trainer-app",
    title: "Codeflex AI - Fitness Trainer App",
    description:
      "Codeflex AI is a fitness trainer app that uses AI to provide personalized workout plans and nutrition advice. It features a sleek, modern design built with Next.js and TypeScript, and utilizes Vapi Voice AI for voice interactions. The app is fully responsive and optimized for both desktop and mobile devices. It integrates Clerk for user authentication and Convex API for backend services, ensuring a seamless user experience.",
    image: "/project-image/codeflex.png",
    tags: [
      "TypeScript",
      "Next.JS",
      "Tailwind Css",
      "Vapi Voice AI",
      "React-Query",
      "Convex API",
      "Gemini AI",
      "Clerk Authication",
    ],
    previewUrl: "https://codeflex-ai-khaki.vercel.app/",
    githubUrl: "https://github.com/fenix1409/codeflex-ai",
  },
  {
    slug: "macbook-pro-platform-3d-showcase",
    title: "Mackbook Pro Platform - 3D Product Showcase",
    description:
      "Apple-style website built with React, Three.js, GSAP, and TailwindCSS. Create immersive 3D product scenes with realistic lighting, scroll-triggered animations, masking effects and smooth animations. Optimized for performance and responsiveness across devices.",
    image: "/project-image/mackbook.png",
    tags: ["JavaScript", "Three.JS", "Tailwind Css", "React.JS 19", "Zustand", "3D"],
    previewUrl: "https://apple-mackbook-platform.vercel.app/",
    githubUrl: "https://github.com/fenix1409/Apple-Mackbook-Platform",
  },
  {
    slug: "nike-ecommerce-platform",
    title: "Nike E-Commerce Platform",
    description:
      "A full-stack Nike-inspired e-commerce platform featuring secure user authentication, dynamic product filtering, shopping cart persistence, and wishlist functionality. Built with Next.js App Router for optimized performance, TypeScript for type safety, and Redux Toolkit for efficient state management. Features a responsive design with seamless animations and modern UI components.",
    image: "/project-image/Nike.png",
    tags: [
      "Next.js",
      "Neon",
      "Better Auth",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Devin AI",
      "Drizzle ORM",
    ],
    previewUrl: "https://e-commerce-nike-ashy.vercel.app/",
    githubUrl: "https://github.com/fenix1409/E-Commerce-Nike",
  },
  {
    slug: "saas-lms-platform",
    title: "SaaS App - LMS Platform",
    description:
      "Saas LMC is a modern AI companion platform built with Next.js where users can create personalized AI assistants, chat with them in real-time, and manage their conversation history. Features secure authentication, role-based permissions, and a responsive design.",
    image: "/project-image/saas.png",
    tags: [
      "Next.js",
      "Supabase",
      "Clerk Auth",
      "TypeScript",
      "Tailwind CSS",
      "Sentry",
      "VAPI Voice AI",
      "OpenAI",
      "Shadcn UI",
    ],
    previewUrl: "https://saas-ai-eight-umber.vercel.app/",
    githubUrl: "https://github.com/fenix1409/Saas-AI",
  },
];
