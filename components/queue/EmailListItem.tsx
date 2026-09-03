import Link from "next/link";
import { PriorityBadge } from "./PriorityBadge";
import { RiskBadge } from "./RiskBadge";
import { StatusBadge } from "./StatusBadge";

export type EmailItem = {
  id: string;
  queuePosition: number;
  status: string;
  priority: string;
  labels: string[];
  sender: {
    name: string;
    email: string;
  };
  subject: string;
  receivedAt: string;
  aiAnalysis: {
    intent: string;
    confidence: number;
    riskLevel: string;
    missingInformation: string[];
  };
  thread: Array<{
    from: string;
    at: string;
    body: string;
  }>;
};

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatIntent(value: string) {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "?";
}

export function EmailListItem({ email }: { email: EmailItem }) {
  const aiConfidence = Math.round(email.aiAnalysis.confidence * 100);
  const missingInfoCount = email.aiAnalysis.missingInformation.length;

  return (
    <Link
      href={`/reviews/${email.id}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-sky-200 hover:shadow-md focus:outline-none focus:ring-3 focus:ring-sky-100"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-xs font-semibold text-sky-700">
            {getInitials(email.sender.name)}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate text-base font-semibold text-slate-900">
                {email.sender.name}
              </p>
              {missingInfoCount > 0 ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-amber-700">
                  <span aria-hidden="true">!</span>
                  Missing info ({missingInfoCount})
                </span>
              ) : null}
            </div>
            <p className="mt-0.5 truncate text-sm text-slate-500">{email.sender.email}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          {/* <RiskBadge risk={email.aiAnalysis.riskLevel} /> */}
          <StatusBadge status={email.status} />
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              Subject
            </p>
            <h2 className="mt-1 text-lg font-semibold text-slate-900">{email.subject}</h2>
          </div>
          <div className="flex items-center gap-2 md:pt-1">
            {/* <PriorityBadge priority={email.priority} /> */}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Received
            </p>
            <p className="mt-1 text-sm font-medium text-slate-700">
              {formatDateTime(email.receivedAt)}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Intent
            </p>
            <p className="mt-1 text-sm font-medium text-slate-700">
              {formatIntent(email.aiAnalysis.intent)}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              AI confidence
            </p>
            <p className="mt-1 text-sm font-medium text-slate-700">{aiConfidence}%</p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Risk level
            </p>
            <div className="mt-1">
              <RiskBadge risk={email.aiAnalysis.riskLevel} />
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Priority
            </p>
            <div className="mt-1">
              <PriorityBadge priority={email.priority} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {email.labels.map((label) => (
          <span
            key={`${email.id}-${label}`}
            className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-slate-600"
          >
            {label}
          </span>
        ))}
      </div>
    </Link>
  );
}
