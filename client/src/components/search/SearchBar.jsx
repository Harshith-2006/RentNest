import React from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({
  className = "",
  defaultLocation = "",
  defaultWhen = "",
  compact = false,
}) {
  const navigate = useNavigate();
  const [location, setLocation] = React.useState(defaultLocation);
  const [when, setWhen] = React.useState(defaultWhen);

  function handleSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location.trim()) params.set("q", location.trim());
    if (when.trim()) params.set("when", when.trim());
    navigate(`/search?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-2 rounded-2xl bg-white/95 p-2 shadow-card ring-1 ring-slate-900/5 backdrop-blur dark:bg-slate-900/90 dark:ring-white/10 sm:flex-row sm:items-center ${compact ? "sm:max-w-xl" : ""} ${className}`}
    >
      <div className="flex flex-1 flex-col gap-1 rounded-xl px-3 py-2 sm:border-r sm:border-slate-200 dark:sm:border-slate-700">
        <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Where
        </label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City, neighborhood, or ZIP"
          className="w-full border-0 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0 dark:text-white"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 rounded-xl px-3 py-2">
        <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Move-in
        </label>
        <input
          type="month"
          value={when}
          onChange={(e) => setWhen(e.target.value)}
          className="w-full border-0 bg-transparent text-sm text-slate-900 focus:outline-none focus:ring-0 dark:text-white"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 hover:shadow-md active:scale-[0.98] sm:shrink-0"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="7" strokeWidth="2" />
          <path d="M20 20l-3-3" strokeWidth="2" strokeLinecap="round" />
        </svg>
        Search
      </button>
    </form>
  );
}
