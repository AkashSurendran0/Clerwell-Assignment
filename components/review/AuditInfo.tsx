import { formatDateTime, type ReviewEmail } from "./review-types";

export function AuditInfo({ email }: { email: ReviewEmail }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Audit Information</p>
      </div>

      <dl className="space-y-3 text-sm text-slate-700">
        <div className="flex justify-between gap-4 border-b border-slate-200 pb-2">
          <dt className="font-medium text-slate-500">AI Worker</dt>
          <dd className="text-right font-medium text-slate-900">{email.audit.aiWorker}</dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-slate-200 pb-2">
          <dt className="font-medium text-slate-500">Generated</dt>
          <dd className="text-right font-medium text-slate-900">{formatDateTime(email.audit.generatedAt)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="font-medium text-slate-500">Model</dt>
          <dd className="text-right font-medium text-slate-900">{email.audit.modelVersion}</dd>
        </div>
      </dl>
    </section>
  );
}
