import Link from "next/link";
import { PriorityBadge } from "@/components/queue/PriorityBadge";
import { StatusBadge } from "@/components/queue/StatusBadge";
import { getStatusClasses, type ReviewEmail } from "./review-types";

export function ReviewHeader({
  email,
  status,
}: {
  email: ReviewEmail;
  status: string;
}) {
  return (
    <header className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.06)] sm:p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
            >
              ← Back to Queue
            </Link>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">Clerwell</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">Email Review</h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] ${getStatusClasses(status)}`}>
            <StatusBadge status={status} />
          </span>
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-700">
            Queue #{email.queuePosition}
          </span>
          <PriorityBadge priority={email.priority} />
        </div>
      </div>
    </header>
  );
}
