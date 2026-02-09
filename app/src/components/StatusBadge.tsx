const statusConfig: Record<string, { color: string; label: string }> = {
  completed: { color: "bg-gh-green", label: "Completed" },
  ongoing: { color: "bg-gh-orange", label: "Ongoing" },
  archived: { color: "bg-gh-red", label: "Archived" },
};

export default function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] || {
    color: "bg-gh-muted",
    label: status,
  };

  return (
    <span className="inline-flex items-center gap-2 text-sm text-gh-muted">
      <span className={`inline-block h-2.5 w-2.5 rounded-full ${config.color}`} />
      {config.label}
    </span>
  );
}
