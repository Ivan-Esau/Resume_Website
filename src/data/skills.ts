export interface Skill {
  name: string;
  level: "strong" | "foundational";
}

export type GridSpan = "1x1" | "2x1" | "1x2";

export interface SkillCategoryData {
  title: string;
  skills: Skill[];
  gridSpan: GridSpan;
  icon: string;
}

export const skills: SkillCategoryData[] = [
  {
    title: "AI & Agents",
    icon: "brain",
    gridSpan: "2x1",
    skills: [
      { name: "Agent Development", level: "strong" },
      { name: "Tool-Calling", level: "strong" },
      { name: "Workflow Orchestration", level: "strong" },
      { name: "Agent Evaluation", level: "strong" },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: "terminal",
    gridSpan: "1x1",
    skills: [
      { name: "Git", level: "strong" },
      { name: "Docker", level: "foundational" },
      { name: "Linux", level: "foundational" },
      { name: "CI/CD Pipelines", level: "foundational" },
    ],
  },
  {
    title: "Programming",
    icon: "code",
    gridSpan: "1x1",
    skills: [
      { name: "Java (OOP)", level: "strong" },
      { name: "Python", level: "strong" },
      { name: "SQL", level: "foundational" },
      { name: "JavaScript", level: "foundational" },
    ],
  },
  {
    title: "Web Development",
    icon: "globe",
    gridSpan: "1x1",
    skills: [
      { name: "HTML/CSS", level: "foundational" },
      { name: "REST APIs", level: "foundational" },
      { name: "React", level: "foundational" },
      { name: "Node.js", level: "foundational" },
    ],
  },
  {
    title: "Networking & IT Ops",
    icon: "network",
    gridSpan: "1x1",
    skills: [
      { name: "Palo Alto Firewalls", level: "strong" },
      { name: "Juniper Switching", level: "strong" },
      { name: "Ticketing Systems", level: "strong" },
      { name: "Matrix42", level: "strong" },
    ],
  },
];
