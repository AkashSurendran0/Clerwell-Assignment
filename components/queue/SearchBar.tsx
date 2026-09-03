type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm transition focus-within:border-sky-300 focus-within:ring-3 focus-within:ring-sky-100 md:max-w-xl">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-4 w-4 text-slate-400"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="6" />
        <path d="M16 16L21 21" strokeLinecap="round" />
      </svg>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search sender, subject, or email content"
        className="w-full border-0 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
        aria-label="Search queue"
      />
    </label>
  );
}
