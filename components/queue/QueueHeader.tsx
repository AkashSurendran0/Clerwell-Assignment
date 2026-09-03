type QueueHeaderProps = {
  totalCount: number;
  pendingCount: number;
};

export function QueueHeader({ totalCount, pendingCount }: QueueHeaderProps) {
  return (
    <header className="flex flex-col gap-5 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
          Clerwell operations
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
          Clerwell — Admin Approval Queue
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Total
          </p>
          <p className="mt-1 text-xl font-semibold text-slate-900">{totalCount}</p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-700">
            Pending
          </p>
          <p className="mt-1 text-xl font-semibold text-amber-800">{pendingCount}</p>
        </div>
      </div>
    </header>
  );
}
