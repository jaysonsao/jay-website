export type Project = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  year: string;
  focus: string;
  image?: string;
  imageAlt?: string;
  link?: string;
  stack: string[];
  highlights: string[];
  detail: {
    intro: string;
    problem: string;
    approach: string;
    outcome: string;
  };
};

const PREVIEW_VERSION = "2026-02-13";
const preview = (file: string) => `/previews/${file}?v=${PREVIEW_VERSION}`;

export const projects: Project[] = [
  {
    slug: "prepdragon",
    title: "PrepDragon",
    summary: "AI-powered interview practice with adaptive feedback for technical and behavioral rounds.",
    role: "Product design + engineering",
    year: "Fall 2025",
    focus: "Turns vague prep into structured, confidence-building coaching loops.",
    image: preview("prepdragon_preview.png"),
    imageAlt: "PrepDragon interview prep mobile preview",
    stack: ["Next.js", "OpenAI", "Supabase"],
    highlights: [
      "Multi-agent orchestration",
      "Real-time evaluation",
      "Role-aware coaching",
    ],
    detail: {
      intro:
        "PrepDragon is a focused practice loop for behavioral and technical interviews. The goal is to keep sessions short while improving signal quality.",
      problem:
        "Most interview practice tools are either too generic or too heavy, so users drop off before building confidence.",
      approach:
        "I built a lightweight, structured flow that adapts to role level, then added a feedback layer that turns responses into clear next steps.",
      outcome:
        "Early users reported faster prep sessions and more targeted improvements. This is a placeholder for fuller metrics.",
    },
  },
  {
    slug: "greplab",
    title: "GrepLab",
    summary: "Interactive shell labs for learning regex and grep through real terminal workflows.",
    role: "Product engineering",
    year: "Spring 2026",
    focus: "Makes command-line pattern matching practical, repeatable, and easier to retain.",
    image: preview("greplab_preview.png"),
    imageAlt: "GrepLab shell using regex preview",
    stack: ["Node.js", "xterm.js", "MDX"],
    highlights: ["Progressive lessons", "Inline checks", "Replayable labs"],
    detail: {
      intro:
        "GrepLab is a guided sandbox that helps developers learn regex in context, with an actual terminal.",
      problem:
        "Regex and grep are powerful, but the learning curve is steep and tooling feedback is often too abstract.",
      approach:
        "I built a lesson runner that validates commands in real time and provides micro-hints without leaving the terminal.",
      outcome:
        "Learners completed core lessons faster in informal tests. Placeholder for detailed outcomes and usage data.",
    },
  },
  {
    slug: "learngit",
    title: "LearnGit",
    summary: "A guided, interactive walkthrough for core Git workflows and habits.",
    role: "Product engineering",
    year: "Spring 2026",
    focus: "Reduces onboarding friction by teaching version control in a safe, hands-on flow.",
    image: preview("jithub_preview.png"),
    imageAlt: "LearnGit terminal walkthrough preview",
    stack: ["Node.js", "CLI UX", "Markdown"],
    highlights: ["Guided commits", "Safe sandboxing", "Checkpoint recovery"],
    detail: {
      intro:
        "LearnGit is a bite-sized tutorial that focuses on practical Git habits instead of endless theory.",
      problem:
        "New developers often learn Git under pressure, which leads to fragile habits and avoidable mistakes.",
      approach:
        "I built a guided flow that explains each command in context and keeps learners inside a safe sandbox.",
      outcome:
        "Early feedback showed lower drop-off and more confidence with branching. Placeholder for richer data.",
    },
  },
  {
    slug: "virtual-photo-albums",
    title: "PhotoAlbums",
    summary: "A shared memory space that combines photo albums with lightweight reflection prompts.",
    role: "UX + visual design",
    year: "Summer 2025",
    focus: "Improves long-term engagement by making personal archives easier to revisit and curate.",
    image: preview("photoalbums_preview.png"),
    imageAlt: "Virtual Photo Album personal blog preview",
    stack: ["React", "Firebase", "Framer Motion"],
    highlights: ["Guided prompts", "Shared vaults", "Smart sorting"],
    detail: {
      intro:
        "Virtual Photo Albums explores how lightweight prompts can turn photo libraries into living stories.",
      problem:
        "People capture a lot but rarely revisit or curate their archives, so memories are left buried in camera rolls.",
      approach:
        "I focused on prompt-led curation, then built sharing flows that make it easy to invite family without overwhelming them.",
      outcome:
        "Concept testing showed higher engagement when prompts were short and paired with a single action. Placeholder for metrics.",
    },
  },
];
