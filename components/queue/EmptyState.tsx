type EmptyStateProps = {
  onClearFilters: () => void;
};

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-xl text-slate-600">
        ·
      </div>
      <h3 className="mt-4 text-xl font-semibold text-slate-900">No emails match the current filters</h3>
      <p className="mt-2 max-w-md text-sm text-slate-600">
        Try adjusting the search term or clearing the applied status, risk, and priority filters.
      </p>
      <button
        type="button"
        onClick={onClearFilters}
        className="mt-5 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
      >
        Clear filters
      </button>
    </div>
  );
}
