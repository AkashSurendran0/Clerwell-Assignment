import { formatCompactDate, type EmailThreadItem } from "./review-types";

export function EmailThread({ thread }: { thread: EmailThreadItem[] }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Email Thread</p>
      </div>

      <div className="space-y-4">
        {thread.map((item, index) => (
          <div key={`${item.from}-${item.at}-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div className="font-semibold text-slate-900">{item.from}</div>
              <div className="text-xs font-medium text-slate-500">{formatCompactDate(item.at)}</div>
            </div>
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
