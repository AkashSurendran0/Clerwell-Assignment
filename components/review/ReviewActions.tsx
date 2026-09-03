import { useState } from "react";
import { formatHumanWords, getActionLabel, type ReviewEmail } from "./review-types";

export function ReviewActions({
  email,
  localStatus,
  draft,
  rejectReason,
  setRejectReason,
  onAction,
  draftLocked,
  saveDraft
}: {
  email: ReviewEmail;
  localStatus: string;
  draft: string;
  rejectReason: string;
  setRejectReason: (value: string) => void;
  onAction: (action: string) => void;
  draftLocked: boolean;
  saveDraft: () => void;
}) {
  const [rejectVisible, setRejectVisible] = useState(false);
  const [retryLoading, setRetryLoading] = useState(false);

  const handleActionClick = (action: string) => {
    if (action === "reject") {
      setRejectVisible(true);
      return;
    }

    if (action === "retry") {
      setRetryLoading(true);
      window.setTimeout(() => {
        setRetryLoading(false);
        onAction(action);
      }, 1400);
      return;
    }

    onAction(action);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Review Actions</p>
      </div>

      {retryLoading ? (
        <div className="mb-4 rounded-2xl border border-sky-200 bg-sky-50 p-5">
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-sky-200 border-t-sky-600" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-sky-900">AI is re-evaluating this email</p>
              <p className="text-xs text-sky-700">Checking the latest signals and policy match…</p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        {email.status !== "pending_review" ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
            Review completed: {formatHumanWords(email.status)}
          </div>
        ) : null}
        {email.status === "pending_review" && email.allowedActions.map((action) => {
            if(action === "edit" && !draftLocked) {
                return (
                    <button
                        key={action}
                        type="button"
                        onClick={() => {
                            saveDraft()
                            handleActionClick("save")
                        }}
                        disabled={retryLoading}
                        className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        Save Draft
                    </button>
                )
            } else if(action === "edit" && draftLocked) {
                return (
                    <button
                        key={action}
                        type="button"
                        onClick={() => handleActionClick("edit")}
                        disabled={retryLoading}
                        className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        Edit Draft
                    </button>
                )
            }

            return (
                <button
                    key={action}
                    type="button"
                    onClick={() => handleActionClick(action)}
                    disabled={retryLoading}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {getActionLabel(action)}
                </button>
            )
            
        })}
      </div>

      {rejectVisible ? (
        <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-4">
          <label className="mb-2 block text-sm font-semibold text-rose-800">Reject reason</label>
          <textarea
            value={rejectReason}
            onChange={(event) => setRejectReason(event.target.value)}
            className="min-h-28 w-full rounded-lg border border-rose-200 bg-white px-3 py-2 text-sm text-rose-900 outline-none focus:border-rose-400 focus:ring-3 focus:ring-rose-100"
            placeholder="Explain why this email is being rejected"
          />
          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setRejectVisible(false)}
              className="rounded-lg border border-rose-200 bg-white px-3 py-2 text-sm font-medium text-rose-700"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                setRejectVisible(false);
                onAction("reject");
              }}
              className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white"
            >
              Confirm Reject
            </button>
          </div>
        </div>
      ) : null}

      {localStatus !== email.status ? (
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-emerald-800">
          Local review state: {formatHumanWords(localStatus)}
          {draft !== email.draftResponse ? " • draft updated" : ""}
          {localStatus === "rejected" && rejectReason ? ` • reason: ${rejectReason}` : ""}
        </div>
      ) : null}
    </section>
  );
}
