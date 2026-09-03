type StatusValue =
  | "pending_review"
  | "pending"
  | "approved"
  | "rejected"
  | "escalated";

const statusConfig: Record<
  StatusValue,
  { label: string; className: string; icon: string }
> = {
  pending_review: {
    label: "Pending",
    className: "border-amber-200 bg-amber-50 text-amber-700",
    icon: "◔",
  },
  pending: {
    label: "Pending",
    className: "border-amber-200 bg-amber-50 text-amber-700",
    icon: "◔",
  },
  approved: {
    label: "Approved",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: "✓",
  },
  rejected: {
    label: "Rejected",
    className: "border-rose-200 bg-rose-50 text-rose-700",
    icon: "×",
  },
  escalated: {
    label: "Escalated",
    className: "border-violet-200 bg-violet-50 text-violet-700",
    icon: "!",
  },
};

export function StatusBadge({ status }: { status: StatusValue | string }) {
  const resolvedStatus = (status || "pending").toLowerCase().replace(/\s+/g, "_") as StatusValue;
  const config = statusConfig[resolvedStatus] ?? statusConfig.pending;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[11px] font-semibold tracking-[0.08em] uppercase ${config.className}`}
      aria-label={`Status ${config.label}`}
    >
      <span aria-hidden="true">{config.icon}</span>
      {config.label}
    </span>
  );
}
