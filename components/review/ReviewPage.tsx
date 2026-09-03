"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AIAnalysis } from "./AIAnalysis";
import { AuditInfo } from "./AuditInfo";
import { DraftResponse } from "./DraftResponse";
import { EmailDetails } from "./EmailDetails";
import { EmailNavigation } from "./EmailNavigation";
import { EmailThread } from "./EmailThread";
import { PolicySection } from "./PolicySection";
import { ReviewActions } from "./ReviewActions";
import { ReviewHeader } from "./ReviewHeader";
import { allEmails } from "./review-types";

export function EmailReviewPage({ emailId, editEmailStatus }: { emailId: string, editEmailStatus?: (emailId: string, status: string) => void }) {
  const email = useMemo(() => allEmails.find((item) => item.id === emailId) ?? null, [emailId]);
  const [localStatus, setLocalStatus] = useState<string>(() => email?.status ?? "pending_review");
  const [localDraft, setLocalDraft] = useState<string>(() => email?.draftResponse ?? "");
  const [rejectReason, setRejectReason] = useState("");
  const [draftLocked, setDraftLocked] = useState(true);

  if (!email) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">Clerwell</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">Email Not Found</h1>
          <p className="mt-3 text-slate-600">The requested review could not be found in the queue.</p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Return to Queue
          </Link>
        </div>
      </main>
    );
  }

  const currentIndex = allEmails.findIndex((item) => item.id === email.id);
  const previousEmail = currentIndex > 0 ? allEmails[currentIndex - 1] : null;
  const nextEmail =
    currentIndex >= 0 && currentIndex < allEmails.length - 1 ? allEmails[currentIndex + 1] : null;

  const handleAction = (action: string) => {
    if(action === "edit") {
        setDraftLocked(false);
        return
    } else if(action === 'save'){
        setDraftLocked(true);
        return
    }


    switch (action) {
      case "approve_send":
        setLocalStatus("approved");
        editEmailStatus?.(email.id, "approved");
        break;
      case "reject":
        setLocalStatus("rejected");
        editEmailStatus?.(email.id, "rejected");
        break;
      case "retry":
        setLocalStatus("pending_review");
        editEmailStatus?.(email.id, "pending_review");
        break;
      case "escalate":
        setLocalStatus("escalated");
        editEmailStatus?.(email.id, "escalated");
        break;
      default:
        break;
    }
  };

  const saveDraft = () => {
    email.draftResponse = localDraft;
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <ReviewHeader email={email} status={localStatus} />

        <EmailNavigation previousEmail={previousEmail} nextEmail={nextEmail} />

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <div className="space-y-6">
            <EmailDetails email={email} />
            <EmailThread thread={email.thread} />
            <DraftResponse value={localDraft} onChange={setLocalDraft} readOnly={draftLocked} />
          </div>

          <div className="space-y-6">
            <AIAnalysis email={{ ...email, status: localStatus }} />
            <PolicySection emailId={email.id} />
            <ReviewActions
              email={email}
              localStatus={localStatus}
              draft={localDraft}
              rejectReason={rejectReason}
              setRejectReason={setRejectReason}
              onAction={handleAction}
              draftLocked={draftLocked}
              saveDraft={saveDraft}
            />
            <AuditInfo email={email} />
          </div>
        </div>
      </div>
    </main>
  );
}
