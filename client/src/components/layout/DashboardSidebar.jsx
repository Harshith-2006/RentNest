import { NavLink } from "react-router-dom";

const base = "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition";

export default function DashboardSidebar({ items, title }) {
  return (
    <aside className="h-full rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-700/80 dark:bg-slate-900">
      {title && (
        <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {title}
        </p>
      )}
      <nav className="flex flex-col gap-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `${base} ${
                isActive
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              }`
            }
          >
            {item.icon && <span className="text-lg leading-none">{item.icon}</span>}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
