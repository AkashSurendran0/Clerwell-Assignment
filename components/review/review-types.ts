import queueData from "../../mock-data/emails.json";
import policiesData from "../../mock-data/policies.json";

export type EmailThreadItem = {
  from: string;
  at: string;
  body: string;
};

export type EmailAudit = {
  aiWorker: string;
  generatedAt: string;
  modelVersion: string;
};

export type ReviewEmail = {
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
  thread: EmailThreadItem[];
  aiAnalysis: {
    intent: string;
    confidence: number;
    sentiment: string;
    riskLevel: string;
    policyId: string;
    recommendedAction: string;
    rationale: string;
    missingInformation: string[];
  };
  draftResponse: string;
  allowedActions: string[];
  audit: EmailAudit;
};

export type PolicyDefinition = {
  id: string;
  name: string;
  category: string;
  summary: string;
  requiresHumanApproval: boolean;
  riskFlags: string[];
};

export const allEmails: ReviewEmail[] = [...((queueData as { emails?: ReviewEmail[] }).emails ?? [])].sort(
  (a, b) => a.queuePosition - b.queuePosition,
);

export const allPolicies: PolicyDefinition[] = [...((policiesData as { policies?: PolicyDefinition[] }).policies ?? [])];

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatCompactDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatHumanWords(value: string) {
  return value
    .replace(/_/g, " ")
    .replace(/[-/]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function riskFlagLabel(flag: string) {
  const normalized = flag.toLowerCase();
  const lookups: Record<string, string> = {
    amount_over_5000_inr: "Amount over ₹5,000",
    payment_method_mismatch: "Payment method mismatch",
    outside_window: "Outside refund window",
    bank_details: "Bank details",
    tax_document_change: "Tax document change",
    credential_change: "Credential change",
    unknown_device: "Unknown device",
    social_engineering: "Social engineering",
    identity_unverified: "Identity unverified",
    legal_hold: "Legal hold",
    third_party_data: "Third-party data",
    service_credit: "Service credit",
    public_escalation: "Public escalation",
    litigation: "Litigation",
    regulator: "Regulator",
    liability_admission: "Liability admission",
    amount_over_10000_inr: "Amount over ₹10,000",
    missing_documents: "Missing documents",
    incomplete_verification: "Incomplete verification",
  };

  return lookups[normalized] ?? formatHumanWords(normalized);
}

export function getActionLabel(action: string) {
  switch (action) {
    case "approve_send":
      return "Approve & Send";
    case "edit":
      return "Edit";
    case "reject":
      return "Reject";
    case "retry":
      return "Retry";
    case "escalate":
      return "Escalate";
    default:
      return formatHumanWords(action);
  }
}

export function getStatusClasses(status: string) {
  switch ((status || "pending_review").toLowerCase()) {
    case "approved":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "rejected":
      return "border-rose-200 bg-rose-50 text-rose-700";
    case "escalated":
      return "border-violet-200 bg-violet-50 text-violet-700";
    case "pending_review":
    case "pending":
      return "border-amber-200 bg-amber-50 text-amber-700";
    default:
      return "border-slate-200 bg-slate-100 text-slate-700";
  }
}
