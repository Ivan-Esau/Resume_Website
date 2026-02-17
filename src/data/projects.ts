export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  year: string;
  description: string;
  longDescription: string;
  role: string;
  highlights: string[];
  tech: string[];
  links: ProjectLink[];
  relatedPublication?: {
    citation: string;
    href: string;
  };
}

export const projects: Project[] = [
  {
    title: "SESL — Software Engineering Simulations Lab",
    year: "2025",
    role: "Lead Developer & Researcher",
    description:
      "Research project developing agentic AI workflows for simulations in Requirements Engineering quality assessment.",
    longDescription:
      "Built as part of a published research paper, SESL explores how autonomous AI agents can simulate and evaluate software engineering processes. The project implements a full pipeline of agent/tool integrations — from requirements parsing to quality assessment — orchestrating repeatable simulation runs that produce measurable, comparable results across different RE approaches.",
    highlights: [
      "Designed and implemented agentic AI workflows for RE quality simulations",
      "Built repeatable simulation pipelines with structured evaluation metrics",
      "Published findings in a peer-reviewed arXiv preprint (arXiv:2511.17762)",
    ],
    tech: [
      "Python",
      "AI Agents",
      "Tool-Calling",
      "Orchestration",
      "Requirements Engineering",
    ],
    links: [
      {
        label: "GitLab Repository",
        href: "https://gitlab.nibbler.fh-swf.de/research/sesls/SESL",
      },
      {
        label: "arXiv Paper",
        href: "https://arxiv.org/abs/2511.17762",
      },
    ],
    relatedPublication: {
      citation:
        'H. Femmer, I. Esau, "The Software Engineering Simulations Lab: Agentic AI for RE Quality Simulations," arXiv preprint, 2025. arXiv:2511.17762',
      href: "https://arxiv.org/abs/2511.17762",
    },
  },
];
