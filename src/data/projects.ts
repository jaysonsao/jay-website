export type Project = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  year: string;
  focus: string;
  image?: string;
  imageAlt?: string;
  stack: string[];
  highlights: string[];
  detail: {
    intro: string;
    problem: string;
    approach: string;
    outcome: string;
  };
};

export const projects: Project[] = [
  {
    slug: "prepdragon",
    title: "PrepDragon",
    summary: "Interview practice that adapts to role level and gives crisp feedback.",
    role: "Product design + engineering",
    year: "2024",
    focus: "Adaptive interview coaching",
    image: "/previews/prepdragon_preview.png",
    imageAlt: "PrepDragon interview prep mobile preview",
    stack: ["Next.js", "OpenAI", "Supabase"],
    highlights: ["Daily drills", "Signal-driven feedback", "Role-specific decks"],
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
    slug: "virtual-photo-albums",
    title: "Virtual Photo Albums",
    summary: "A memory space that blends journal prompts with shared albums.",
    role: "UX + visual design",
    year: "2023",
    focus: "Storytelling for personal archives",
    image: "/previews/prepdragon_preview.png",
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
  {
    slug: "greplab",
    title: "GrepLab",
    summary: "An interactive shell lesson plan for regex and grep workflows.",
    role: "Product engineering",
    year: "2024",
    focus: "Learning through live terminals",
    image: "/previews/greplab_preview.png",
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
    summary: "A guided, interactive walkthrough for core Git workflows.",
    role: "Product engineering",
    year: "2023",
    focus: "Hands-on onboarding for version control",
    image: "/previews/greplab_preview.png",
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
    slug: "flash-cards-ai",
    title: "Flash Cards AI",
    summary: "Smart cards that pull definitions and examples on demand.",
    role: "Prototype design + build",
    year: "2025",
    focus: "AI-assisted vocabulary retention",
    stack: ["Next.js", "Dictionary API", "OpenAI"],
    highlights: ["Instant definitions", "Contextual examples", "Daily review"],
    detail: {
      intro:
        "Flash Cards AI is an experiment in reducing friction between curiosity and recall.",
      problem:
        "Traditional flash cards require manual setup, which adds enough friction that many users never start.",
      approach:
        "I built a flow that generates cards from a single word, then layers in short practice sessions.",
      outcome:
        "Prototype users spent more time per session when cards included short examples. Placeholder for future metrics.",
    },
  },
  {
    slug: "this-website",
    title: "This Website",
    summary: "A living portfolio with evolving experiments and UI studies.",
    role: "Design + engineering",
    year: "2025",
    focus: "Iterative personal brand system",
    image: "/previews/greplab_preview.png",
    imageAlt: "Portfolio site interface preview",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    highlights: ["Modular sections", "Fast iteration", "Content-ready layouts"],
    detail: {
      intro:
        "This site is a flexible canvas for experiments, case studies, and new UI explorations.",
      problem:
        "Most portfolio sites freeze after launch, making it hard to show work-in-progress and new ideas.",
      approach:
        "I built a composable layout system that lets me swap sections and publish quickly.",
      outcome:
        "Updates now take minutes instead of days. Placeholder for future metrics and learnings.",
    },
  },
];
