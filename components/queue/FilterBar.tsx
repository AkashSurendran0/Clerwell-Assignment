type FilterBarProps = {
  statusFilter: string;
  riskFilter: string;
  priorityFilter: string;
  onStatusChange: (value: string) => void;
  onRiskChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
};

const statusOptions = ["All", "Pending", "Approved", "Rejected", "Escalated"];
const riskOptions = ["All", "Low", "Medium", "High", "Critical"];
const priorityOptions = ["All", "Low", "Normal", "Urgent", "Critical"];

export function FilterBar({
  statusFilter,
  riskFilter,
  priorityFilter,
  onStatusChange,
  onRiskChange,
  onPriorityChange,
}: FilterBarProps) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <label className="flex flex-col gap-1.5 text-xs font-medium text-slate-600">
        <span>Status</span>
        <select
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition focus:border-sky-300 focus:ring-3 focus:ring-sky-100"
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-xs font-medium text-slate-600">
        <span>Risk</span>
        <select
          value={riskFilter}
          onChange={(event) => onRiskChange(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition focus:border-sky-300 focus:ring-3 focus:ring-sky-100"
        >
          {riskOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-xs font-medium text-slate-600">
        <span>Priority</span>
        <select
          value={priorityFilter}
          onChange={(event) => onPriorityChange(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition focus:border-sky-300 focus:ring-3 focus:ring-sky-100"
        >
          {priorityOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
