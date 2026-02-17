export interface Publication {
  citation: string;
  href: string;
  linkLabel?: string;
}

export const publications: Publication[] = [
  {
    citation:
      'H. Femmer, I. Esau, "The Software Engineering Simulations Lab: Agentic AI for RE Quality Simulations," arXiv preprint, 2025. arXiv:2511.17762',
    href: "https://arxiv.org/abs/2511.17762",
    linkLabel: "Read on arXiv",
  },
];
