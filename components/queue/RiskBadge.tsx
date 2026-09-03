type RiskLevel = "low" | "medium" | "high" | "critical";

const riskConfig: Record<
  RiskLevel,
  { label: string; className: string; icon: string }
> = {
  low: {
    label: "Low",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: "●",
  },
  medium: {
    label: "Medium",
    className: "border-amber-200 bg-amber-50 text-amber-700",
    icon: "▲",
  },
  high: {
    label: "High",
    className: "border-orange-200 bg-orange-50 text-orange-700",
    icon: "◆",
  },
  critical: {
    label: "Critical",
    className: "border-rose-200 bg-rose-50 text-rose-700",
    icon: "✦",
  },
};

export function RiskBadge({ risk }: { risk: RiskLevel | string }) {
  const resolvedRisk = (risk || "low").toLowerCase() as RiskLevel;
  const config = riskConfig[resolvedRisk] ?? riskConfig.low;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[11px] font-semibold tracking-[0.08em] uppercase ${config.className}`}
      aria-label={`Risk level ${config.label}`}
    >
      <span aria-hidden="true">{config.icon}</span>
      {config.label}
    </span>
  );
}
