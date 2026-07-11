import { Link } from "react-router-dom";

const cols = [
  {
    title: "Discover",
    links: [
      { label: "Search homes", to: "/search" },
      { label: "Featured", to: "/search?featured=1" },
      { label: "Favorites", to: "/favorites" },
    ],
  },
  {
    title: "Hosting",
    links: [
      { label: "Owner dashboard", to: "/owner" },
      { label: "List a home", to: "/owner#add" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Trust & safety", to: "/search" },
      { label: "Support", to: "/login" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-sm font-bold text-white">
                RN
              </span>
              <span className="font-display text-lg font-semibold text-slate-900 dark:text-white">RentNest</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Curated rentals with a premium feel. Find your next home with confidence.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {c.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {c.links.map((l) => (
                  <li key={l.to + l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-slate-700 transition hover:text-brand-700 dark:text-slate-300 dark:hover:text-brand-300"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-8 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} RentNest. Demo frontend — data is illustrative.</p>
          <div className="flex gap-4">
            <span className="cursor-default">Privacy</span>
            <span className="cursor-default">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
