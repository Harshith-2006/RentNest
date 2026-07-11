export default function AnalyticsCard({ label, value, hint, icon }) {
  return (
    <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700/80 dark:bg-slate-900 dark:shadow-card-dark">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            {value}
          </p>
          {hint && (
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{hint}</p>
          )}
        </div>
        {icon && (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition group-hover:scale-105 dark:bg-brand-950/40 dark:text-brand-300">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
