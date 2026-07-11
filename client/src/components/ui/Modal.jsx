import { useEffect } from "react";

export default function Modal({ open, onClose, title, children, size = "md" }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const width =
    size === "lg"
      ? "max-w-2xl"
      : size === "sm"
        ? "max-w-sm"
        : "max-w-lg";

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-fade-in"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        className={`relative z-[101] w-full ${width} animate-slide-up rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10`}
        role="dialog"
        aria-modal="true"
      >
        {title && (
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <span className="sr-only">Close</span>
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
