const HOUSE_TYPES = ["Any", "House", "Apartment", "Townhouse", "Studio", "Loft", "Duplex", "Penthouse"];

export default function FilterSidebar({ filters, onChange, onReset }) {
  return (
    <aside className="space-y-6 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-700/80 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Filters</h2>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-semibold text-brand-700 transition hover:text-brand-800 dark:text-brand-300"
        >
          Reset
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Location</label>
        <input
          type="text"
          value={filters.location}
          onChange={(e) => onChange({ ...filters, location: e.target.value })}
          placeholder="City or neighborhood"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-brand-500/30 transition focus:border-brand-500 focus:bg-white focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
        />
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Rent range</p>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-slate-500 dark:text-slate-400">Min</label>
            <input
              type="number"
              min={0}
              value={filters.minRent}
              onChange={(e) => onChange({ ...filters, minRent: e.target.value })}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
          <div>
            <label className="text-xs text-slate-500 dark:text-slate-400">Max</label>
            <input
              type="number"
              min={0}
              value={filters.maxRent}
              onChange={(e) => onChange({ ...filters, maxRent: e.target.value })}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">House type</label>
        <select
          value={filters.type}
          onChange={(e) => onChange({ ...filters, type: e.target.value })}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          {HOUSE_TYPES.map((t) => (
            <option key={t} value={t === "Any" ? "" : t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-slate-700 dark:text-slate-200">Furnishing</legend>
        <div className="flex gap-3 text-sm">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 transition hover:border-brand-400 dark:border-slate-700">
            <input
              type="radio"
              name="furn"
              checked={filters.furnished === "any"}
              onChange={() => onChange({ ...filters, furnished: "any" })}
            />
            Any
          </label>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 transition hover:border-brand-400 dark:border-slate-700">
            <input
              type="radio"
              name="furn"
              checked={filters.furnished === "yes"}
              onChange={() => onChange({ ...filters, furnished: "yes" })}
            />
            Furnished
          </label>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 transition hover:border-brand-400 dark:border-slate-700">
            <input
              type="radio"
              name="furn"
              checked={filters.furnished === "no"}
              onChange={() => onChange({ ...filters, furnished: "no" })}
            />
            Unfurnished
          </label>
        </div>
      </fieldset>
    </aside>
  );
}

export const defaultFilters = {
  location: "",
  minRent: "",
  maxRent: "",
  type: "",
  furnished: "any",
};
