const iconPaths: Record<string, string> = {
  award: "M12 8a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z M8.21 13.89L7 23l5-3 5 3-1.21-9.12",
  "external-link": "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6 M15 3h6v6 M10 14L21 3",
};

interface AchievementBadgeProps {
  label: string;
  icon: string;
}

export default function AchievementBadge({ label, icon }: AchievementBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-accent-muted text-accent border border-accent/20 achievement-shimmer">
      <svg
        width={14}
        height={14}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={iconPaths[icon] ?? ""} />
      </svg>
      {label}
    </span>
  );
}
