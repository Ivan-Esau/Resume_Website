export type Chapter = "research" | "it" | "engineering";

export interface EducationAchievement {
  label: string;
  icon: "award" | "external-link";
}

export interface EducationEntry {
  title: string;
  subtitle: string;
  bullets: string[];
  badge?: string;
  achievements?: EducationAchievement[];
}

export interface WorkEntry {
  title: string;
  subtitle: string;
  location: string;
  bullets: string[];
  badge?: string;
  chapter: Chapter;
}

export interface CareerPathPoint {
  dateRange: string;
  education?: EducationEntry;
  work?: WorkEntry;
}

export const careerPath: CareerPathPoint[] = [
  {
    dateRange: "Nov 2025 — Present",
    education: {
      title: "M.Sc. Applied Research",
      subtitle: "Fachhochschule Südwestfalen",
      badge: "Current",
      bullets: [
        "Focus: Applied research in software engineering and agentic AI systems.",
        "Topics: CI/CD, Requirements Engineering, Design Thinking, scientific methods.",
        "Practical orientation: prototypical development, evaluation, and documentation of software solutions.",
      ],
    },
    work: {
      title: "Research Associate & Lecturer",
      subtitle: "Fachhochschule Südwestfalen",
      location: "Hagen, NRW, Germany (Hybrid)",
      badge: "Current",
      chapter: "research",
      bullets: [
        "Lecturer for Fundamentals of Programming and Advanced Programming modules.",
        "Teaching object-oriented programming (OOP) in Java to undergraduate students.",
      ],
    },
  },
  {
    dateRange: "Aug 2022 — Oct 2025",
    education: {
      title: "B.Sc. Wirtschaftsinformatik (Business Informatics)",
      subtitle: "Fachhochschule Südwestfalen",
      achievements: [
        { label: "Thesis: 1.0", icon: "award" },
        { label: "Deutschlandstipendium", icon: "award" },
      ],
      bullets: [
        "Thesis grade: 1.0 | Colloquium: 1.0 | Overall: 2.57.",
        "Core: Software development, data management, algorithms, IT security.",
        "Business informatics: Accounting fundamentals and business process understanding.",
        "Practical orientation: team-based software development and project management.",
      ],
    },
    work: {
      title: "Working Student — IT Network Engineering",
      subtitle: "Rhenus Logistics",
      location: "Holzwickede, NRW, Germany (Hybrid)",
      chapter: "it",
      bullets: [
        "Prepared and configured firewalls (Palo Alto) for enterprise deployment.",
        "Prepared and configured switches (Juniper) across logistics sites.",
        "Handled ticketing and supported day-to-day IT operations.",
        "Maintained documentation and managed assets in Matrix42.",
      ],
    },
  },
  {
    dateRange: "Aug 2019 — Jun 2022",
    work: {
      title: "Apprentice — Technical Product Designer",
      subtitle: "VTI Ventil Technik GmbH",
      location: "Menden, NRW, Germany",
      chapter: "engineering",
      bullets: [
        "Created technical drawings and modeled individual parts and assemblies.",
        "Implemented design modifications to existing products.",
        "Documented components in ERP system; created renderings and animations.",
      ],
    },
  },
];
