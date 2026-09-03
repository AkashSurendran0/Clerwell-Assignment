export function DraftResponse({
  value,
  onChange,
  readOnly = true,
}: {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Draft Response</p>
        {readOnly ? (
          <span className="rounded-full border border-slate-200 bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-600">
            Locked
          </span>
        ) : null}
      </div>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        readOnly={readOnly}
        className={`min-h-55 w-full rounded-xl border px-4 py-3 text-sm leading-7 text-slate-700 outline-none transition ${
          readOnly
            ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-500"
            : "border-slate-300 bg-slate-50 focus:border-sky-400 focus:ring-3 focus:ring-sky-100"
        }`}
        aria-label="Draft response"
      />
    </section>
  );
}
