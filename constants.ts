
import { Project, FAQ } from './types';

export const COLORS = {
  white: '#FFFFFF',
  lavender: '#6B3B8E',
  violet: '#3E1F5A',
  charcoal: '#1E1428',
  midnight: '#0B080E',
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Nova Dashboard",
    description: "A high-performance analytics platform with real-time data visualization.",
    image: "https://picsum.photos/800/600?random=1",
    tags: ["React", "TypeScript", "D3.js"]
  },
  {
    id: 2,
    title: "Aether E-Commerce",
    description: "Premium shopping experience with custom 3D product previews.",
    image: "https://picsum.photos/800/600?random=2",
    tags: ["Next.js", "Three.js", "Tailwind"]
  },
  {
    id: 3,
    title: "Zenith App",
    description: "A productivity suite focused on focus and mindfulness.",
    image: "https://picsum.photos/800/600?random=3",
    tags: ["React Native", "Firebase", "Motion"]
  }
];

export const FAQS: FAQ[] = [
  {
    question: "What services do you offer?",
    answer: "I specialize in premium web development, UI/UX design, and interactive frontend experiences using React and TypeScript."
  },
  {
    question: "Are you available for hire?",
    answer: "Yes, I am currently open to freelance opportunities and full-time collaborations for senior-level roles."
  },
  {
    question: "What is your stack?",
    answer: "My primary stack includes React, TypeScript, Tailwind CSS, Framer Motion, and various backend solutions like Node.js or Firebase."
  },
  {
    question: "How can I contact you?",
    answer: "You can reach me via email at hello@lumina.dev or connect with me on LinkedIn."
  },
  {
    question: "Where are you based?",
    answer: "I work remotely with clients worldwide, currently based in London, UK."
  }
];
