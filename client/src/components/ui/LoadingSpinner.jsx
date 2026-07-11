export default function LoadingSpinner({ className = "", label = "Loading" }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 py-12 ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">{label}</span>
      <div className="h-10 w-10 rounded-full border-2 border-brand-200 border-t-brand-600 dark:border-slate-600 dark:border-t-brand-400 animate-spin" />
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  );
}
