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
    link: "https://github.com/jaysonsao/prepdragon",
    stack: [
      "Gemini 2.5 Flash",
      "LangChain",
      "Next.js",
      "MongoDB",
      "Silero TTS",
      "GazeTracking",
      "Pytoon",
    ],
    highlights: [
      "Multi-agent orchestration",
      "Real-time evaluation",
      "Role-aware coaching",
    ],
    detail: {
      intro:
        "PrepDragon is an AI-powered interview practice tool that provides adaptive feedback for both technical and behavioral rounds. I originally built it to help myself after finding I struggled with confidence during HireVue and other interview settings. I often felt nervous when talking about myself and answering questions.\n\nThe main point of an interview is not to rehearse every possible answer; that part can be practiced. Confidence, however, is much harder to develop.\n\nPrepDragon aims to bridge this gap by measuring a user's confidence through eye tracking and tone analysis, then delivering personalized feedback to help improve overall interview performance.\n\nCurrently built on Gemini 2.5 Flash, PrepDragon supports drop-in API switching and can be run locally, provided you supply your own API key.",
      problem:
        "Most interview practice tools are either too generic or too heavy, so users drop off before building confidence.",
      approach:
        "I built a lightweight, structured flow that adapts to role level, then added a feedback layer that turns responses into clear next steps.",
      outcome:
        "Early users reported faster prep sessions and more targeted improvements. This is a placeholder for fuller metrics.",
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
        "LearnGit is an interactive tutorial focused on practical Git habits rather than endless theory. I built LearnGit to teach myself the fundamentals of Git, gradually progressing to more advanced concepts such as merging, rebasing, and core workflows.\n\nThe project features a real-time, integrated terminal running in a sandboxed environment, with properly sanitized input handling and robust error detection. LearnGit enables users to learn through an interactive lesson plan and immediately test commands directly in the terminal.\n\nOnce lessons are complete, users are free to continue experimenting on their own using the hosted sandbox terminal. All terminals are provisioned using Docker containers.",
      problem:
        "New developers often learn Git under pressure, which leads to fragile habits and avoidable mistakes.",
      approach:
        "I built a guided flow that explains each command in context and keeps learners inside a safe sandbox.",
      outcome:
        "Early feedback showed lower drop-off and more confidence with branching. Placeholder for richer data.",
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
        "GrepLab is a guided sandbox designed to help developers learn and practice regular expressions in context through a simulated terminal experience. As a precursor to LearnGit, GrepLab was built after I repeatedly found myself struggling to remember regex syntax and patterns.\n\nWhile it is easy to look things up on the fly these days, I wanted to understand regular expressions thoroughly and apply them confidently in real-world scenarios. GrepLab emphasizes hands-on learning through structured exercises that mirror practical use cases, allowing users to experiment, iterate, and build intuition for regex without the overhead or risk of a real system.",
      problem:
        "Regex and grep are powerful, but the learning curve is steep and tooling feedback is often too abstract.",
      approach:
        "I built a lesson runner that validates commands in real time and provides micro-hints without leaving the terminal.",
      outcome:
        "Learners completed core lessons faster in informal tests. Placeholder for detailed outcomes and usage data.",
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
        "Virtual Photo Albums is a quiet, personal space for storing and sharing memories. I originally built it for a friend who wanted a private place for their photos, something that felt personal rather than performative. The idea was inspired by how my parents kept their own photo collections: meaningful, private, and shared only with people they trusted.\n\nThe app is designed like a digital scrapbook. Users can upload photos, organize them into albums, and decide exactly who gets to see them. There are no feeds, no pressure to share publicly, just a simple space to preserve moments and share them intentionally.\n\nVirtual Photo Albums is meant to be a calmer alternative to social media, focused on ownership, privacy, and the joy of revisiting memories on your own terms.",
      problem:
        "People capture a lot but rarely revisit or curate their archives, so memories are left buried in camera rolls.",
      approach:
        "I focused on prompt-led curation, then built sharing flows that make it easy to invite family without overwhelming them.",
      outcome:
        "Concept testing showed higher engagement when prompts were short and paired with a single action. Placeholder for metrics.",
    },
  },
];
