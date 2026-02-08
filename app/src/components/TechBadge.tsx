const techColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  "C#": "#178600",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  React: "#61dafb",
  "Next.js": "#e6edf3",
  "Node.js": "#339933",
  PostgreSQL: "#336791",
  MongoDB: "#47A248",
  Redis: "#DC382D",
  Docker: "#2496ED",
  AWS: "#FF9900",
  Supabase: "#3ECF8E",
  "Tailwind CSS": "#06B6D4",
  GraphQL: "#E10098",
};

export default function TechBadge({ tech }: { tech: string }) {
  const color = techColors[tech] || "#8b949e";

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-gh-muted">
      <span
        className="inline-block h-3 w-3 rounded-full"
        style={{ backgroundColor: color }}
      />
      {tech}
    </span>
  );
}
