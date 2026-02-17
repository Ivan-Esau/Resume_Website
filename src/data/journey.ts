export interface JourneyMilestone {
  phase: string;
  title: string;
  period: string;
  description: string;
  icon: "cog" | "network" | "brain";
}

export interface Achievement {
  label: string;
  detail: string;
  icon: "award" | "external-link";
}

export const milestones: JourneyMilestone[] = [
  {
    phase: "01",
    title: "Engineering Foundations",
    period: "2019 — 2022",
    description:
      "Started with precision CAD work and technical product design at VTI Ventil Technik — learning systems thinking, attention to detail, and how complex components fit together.",
    icon: "cog",
  },
  {
    phase: "02",
    title: "IT & Networks",
    period: "2023 — 2025",
    description:
      "Moved into enterprise network infrastructure at Rhenus Logistics — configuring Palo Alto firewalls, Juniper switches, and managing IT operations across logistics sites.",
    icon: "network",
  },
  {
    phase: "03",
    title: "AI Research",
    period: "2025 — Present",
    description:
      "Now building agentic AI systems at FH Südwestfalen — researching how autonomous agents can improve software engineering processes while teaching the next generation of developers.",
    icon: "brain",
  },
];

export const achievements: Achievement[] = [
  {
    label: "Deutschlandstipendium",
    detail: "Scholarship Recipient",
    icon: "award",
  },
  {
    label: "Published Paper",
    detail: "arXiv:2511.17762",
    icon: "external-link",
  },
  {
    label: "Thesis Grade: 1.0",
    detail: "B.Sc. Final Thesis",
    icon: "award",
  },
];
