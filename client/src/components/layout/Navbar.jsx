import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";

const navLinkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive
      ? "bg-brand-50 text-brand-800 dark:bg-brand-950/50 dark:text-brand-100"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
    setRole(localStorage.getItem("role") || "");
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    setToken("");
    setRole("");

    window.location.href = "/login";
  };

  let links = [];

  if (!token) {
    links.push({
      to: "/search",
      label: "Explore",
    });
  }

  if (role === "renter") {
    links.push(
      {
        to: "/search",
        label: "Explore",
      },
      {
        to: "/favorites",
        label: "Favorites",
      },
      {
        to: "/dashboard",
        label: "Dashboard",
      }
    );
  }

  if (role === "owner") {
    links.push(
      {
        to: "/add-house",
        label: "Add House",
      },
      {
        to: "/owner",
        label: "Owner Dashboard",
      }
    );
  }

if (role === "admin") {

  links.push(

    {
      to: "/admin",
      label: "Dashboard",
    },

    {
      to: "/admin/users",
      label: "Users",
    },

    {
      to: "/admin/houses",
      label: "Houses",
    },

    {
      to: "/admin/requests",
      label: "Requests",
    },

    {
      to: "/admin/reports",
      label: "Reports",
    }

  );

}

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/75">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="group flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-sm font-bold text-white shadow-sm transition group-hover:scale-105">
              RN
            </span>

            <span className="font-display text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
              RentNest
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={navLinkClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="hidden rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 sm:inline-flex"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>

          {!token ? (
            <>
              <Link
                to="/login"
                className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 sm:inline-block"
              >
                Log in
              </Link>

              <Link
                to="/register"
                className="hidden rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 sm:inline-block"
              >
                Sign up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="hidden rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 sm:inline-block"
            >
              Logout
            </button>
          )}

          <button
            type="button"
            className="inline-flex rounded-xl border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={navLinkClass}
              >
                {l.label}
              </NavLink>
            ))}

            <button
              type="button"
              onClick={toggleTheme}
              className="mt-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>

            {!token ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Log in
                </Link>

                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="rounded-lg bg-brand-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-brand-700"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-600"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
