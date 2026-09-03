import Link from "next/link";
import type { ReviewEmail } from "./review-types";

export function EmailNavigation({
  previousEmail,
  nextEmail,
}: {
  previousEmail: ReviewEmail | null;
  nextEmail: ReviewEmail | null;
}) {
  return (
    <nav className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {previousEmail ? (
            <Link
              href={`/reviews/${previousEmail.id}`}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
            >
              ← Previous Email
            </Link>
          ) : (
            <span className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-400">
              ← Previous Email
            </span>
          )}

          {nextEmail ? (
            <Link
              href={`/reviews/${nextEmail.id}`}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
            >
              Next Email →
            </Link>
          ) : (
            <span className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-400">
              Next Email →
            </span>
          )}
        </div>

      </div>
    </nav>
  );
}
