import { RiskBadge } from "@/components/queue/RiskBadge";
import { formatHumanWords, type ReviewEmail } from "./review-types";

export function ConfidenceIndicator({ value }: { value: number }) {
  const percent = Math.max(0, Math.min(100, Math.round(value * 100)));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
        <span>AI Confidence</span>
        <span>{percent}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export function MissingInformation({ items }: { items: string[] }) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">!</span>
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-amber-800">Missing Information</p>
      </div>
      <ul className="space-y-2 text-sm leading-6 text-amber-900">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function AIAnalysis({ email }: { email: ReviewEmail }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">AI Analysis</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Intent</p>
          <p className="mt-2 text-sm font-semibold text-slate-900">{formatHumanWords(email.aiAnalysis.intent)}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Sentiment</p>
          <p className="mt-2 text-sm font-semibold text-slate-900">{formatHumanWords(email.aiAnalysis.sentiment)}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Risk Level</p>
          <div className="mt-2">
            <RiskBadge risk={email.aiAnalysis.riskLevel} />
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <ConfidenceIndicator value={email.aiAnalysis.confidence} />
      </div>

      <div className="mt-5 space-y-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Recommended Action</p>
          <p className="mt-2 text-base font-semibold text-slate-900">
            {formatHumanWords(email.aiAnalysis.recommendedAction)}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Rationale</p>
          <p className="mt-2 text-sm leading-7 text-slate-700">{email.aiAnalysis.rationale}</p>
        </div>
      </div>

      <div className="mt-6">
        <MissingInformation items={email.aiAnalysis.missingInformation} />
      </div>
    </section>
  );
}
