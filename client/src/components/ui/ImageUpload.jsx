import { useId, useState } from "react";

export default function ImageUpload({ label = "Photos", max = 6, onChange }) {
  const id = useId();
  const [previews, setPreviews] = useState([]);

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []).slice(0, max);
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews((prev) => {
      prev.forEach((u) => URL.revokeObjectURL(u));
      return urls;
    });
    onChange?.(files);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {label}
        </label>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <label
          htmlFor={id}
          className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-center text-xs text-slate-500 transition hover:border-brand-400 hover:bg-brand-50/60 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-brand-500"
        >
          <span className="text-lg leading-none">＋</span>
          <span className="mt-1 px-1">Add</span>
        </label>
        <input id={id} type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
        {previews.map((src) => (
          <div
            key={src}
            className="h-24 w-24 overflow-hidden rounded-xl ring-1 ring-slate-200/80 transition hover:ring-brand-400 dark:ring-slate-700"
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">Demo only — images stay in your browser.</p>
    </div>
  );
}
