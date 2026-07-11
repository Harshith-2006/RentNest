import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="text-sm font-semibold text-brand-700 dark:text-brand-300">404</p>
      <h1 className="mt-2 font-display text-2xl font-semibold text-slate-900 dark:text-white">Page not found</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">The page you’re looking for doesn’t exist or was moved.</p>
      <Link
        to="/"
        className="mt-8 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
      >
        Go home
      </Link>
    </div>
  );
}
