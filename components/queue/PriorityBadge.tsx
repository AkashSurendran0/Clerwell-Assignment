type PriorityValue = "low" | "normal" | "urgent" | "critical";

const priorityConfig: Record<
  PriorityValue,
  { label: string; className: string; icon: string }
> = {
  low: {
    label: "Low",
    className: "border-slate-200 bg-slate-100 text-slate-700",
    icon: "▾",
  },
  normal: {
    label: "Normal",
    className: "border-sky-200 bg-sky-50 text-sky-700",
    icon: "•",
  },
  urgent: {
    label: "Urgent",
    className: "border-amber-200 bg-amber-50 text-amber-700",
    icon: "!",
  },
  critical: {
    label: "Critical",
    className: "border-rose-200 bg-rose-50 text-rose-700",
    icon: "✦",
  },
};

export function PriorityBadge({ priority }: { priority: PriorityValue | string }) {
  const resolvedPriority = (priority || "normal").toLowerCase() as PriorityValue;
  const config = priorityConfig[resolvedPriority] ?? priorityConfig.normal;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[11px] font-semibold tracking-[0.08em] uppercase ${config.className}`}
      aria-label={`Priority ${config.label}`}
    >
      <span aria-hidden="true">{config.icon}</span>
      {config.label}
    </span>
  );
}
