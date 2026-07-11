import { useToast } from "@/context/ToastContext";

const styles = {
  info: "bg-slate-900 text-white dark:bg-white dark:text-slate-900",
  success: "bg-emerald-600 text-white",
  error: "bg-rose-600 text-white",
  warning: "bg-amber-500 text-slate-900",
};

export default function ToastHost() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[200] flex w-full max-w-sm flex-col gap-2 px-4 sm:px-0">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto animate-slide-up rounded-xl px-4 py-3 text-sm font-medium shadow-lg ring-1 ring-black/5"
        >
          <div className={`flex items-start justify-between gap-3 rounded-xl px-3 py-2 ${styles[t.type] || styles.info}`}>
            <p className="flex-1">{t.message}</p>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              className="shrink-0 rounded-md p-0.5 opacity-80 transition hover:opacity-100"
            >
              <span className="sr-only">Dismiss</span>
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
