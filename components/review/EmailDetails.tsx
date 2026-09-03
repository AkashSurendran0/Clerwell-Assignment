import { formatDateTime, type ReviewEmail } from "./review-types";

export function EmailDetails({ email }: { email: ReviewEmail }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Sender</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">{email.sender.name}</h2>
            <p className="mt-1 text-sm text-slate-600">{email.sender.email}</p>
          </div>
          <div className="rounded-full border border-sky-200 bg-sky-50 px-3 py-2 text-sm font-medium text-sky-700">
            {email.labels.length > 0 ? email.labels.join(" • ") : "No labels"}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Subject</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{email.subject}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Received</p>
            <p className="mt-2 text-base font-medium text-slate-700">{formatDateTime(email.receivedAt)}</p>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Labels</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {email.labels.length ? (
            email.labels.map((label) => (
              <span
                key={`${email.id}-${label}`}
                className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-600"
              >
                {label}
              </span>
            ))
          ) : (
            <span className="text-sm text-slate-500">No labels on this email.</span>
          )}
        </div>
      </div>
    </section>
  );
}
