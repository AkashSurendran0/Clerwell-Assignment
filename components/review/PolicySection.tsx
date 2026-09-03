import { allEmails, allPolicies, riskFlagLabel, type ReviewEmail } from "./review-types";

export function PolicySection({ emailId }: { emailId: string }) {
  const email = allEmails.find((item) => item.id === emailId) as ReviewEmail | undefined;
  const policyId = email?.aiAnalysis.policyId;
  const policy = allPolicies.find((item) => item.id === policyId);

  if (!policy) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Applicable Policy</p>
        <p className="mt-3 text-sm text-slate-700">
          No policy could be matched for <span className="font-semibold">{policyId ?? "unknown"}</span> in the policy catalog.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Applicable Policy</p>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-semibold text-slate-900">{policy.name}</h3>
          <p className="mt-2 text-sm text-slate-600">Policy ID: {policy.id}</p>
          <p className="mt-1 text-sm text-slate-600">Category: {policy.category}</p>
        </div>

        <p className="text-sm leading-7 text-slate-700">{policy.summary}</p>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Admin Approval Required</p>
          <p className="mt-2 text-sm font-semibold text-slate-900">{policy.requiresHumanApproval ? "Yes" : "No"}</p>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Risk Flags</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {policy.riskFlags.length ? (
              policy.riskFlags.map((flag) => (
                <li key={flag} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-500" aria-hidden="true" />
                  <span>{riskFlagLabel(flag)}</span>
                </li>
              ))
            ) : (
              <li>No specific risk flags listed.</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
