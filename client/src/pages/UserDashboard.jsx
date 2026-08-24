import { useEffect, useMemo, useState } from "react";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import PropertyCard from "@/components/property/PropertyCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { fetchProperties, fetchUserDashboard } from "@/services/api";
import { useFavorites } from "@/hooks/useFavorites";

const sidebarItems = [
  { to: "/dashboard", label: "Overview", end: true, icon: "◎" },
  { to: "/favorites", label: "All favorites", icon: "♥" },
  { to: "/search", label: "Browse homes", icon: "⌕" },
];

function statusPill(status) {
  const map = {
    pending:
      "bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200",

    accepted:
      "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200",

    rejected:
      "bg-rose-100 text-rose-900 dark:bg-rose-950/50 dark:text-rose-200",
  };

  return (
    map[status] ||
    "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
  );
}

export default function UserDashboard() {
  const [dash, setDash] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const favoriteSeed = useMemo(
    () => dash?.favoriteIds,
    [dash?.favoriteIds]
  );

  const { toggle, has } = useFavorites(favoriteSeed);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);

      try {
        const [d, props] = await Promise.all([
          fetchUserDashboard(),
          fetchProperties(),
        ]);

        if (!cancelled) {
          setDash(d);
          setProperties(props);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const favoriteProps = useMemo(
    () =>
      properties.filter((p) =>
        (dash?.favoriteIds || []).includes(p._id)
      ),
    [properties, dash]
  );

  const savedProps = useMemo(
    () =>
      properties.filter((p) =>
        (dash?.savedIds || []).includes(p._id)
      ),
    [properties, dash]
  );

  if (loading || !dash) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <LoadingSpinner label="Loading your dashboard" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <DashboardSidebar
          title="Renter hub"
          items={sidebarItems}
        />

        <div className="space-y-12">

          {/* PROFILE */}
          <section
            id="profile"
            className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-700/80 dark:bg-slate-900"
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

              <img
                src={dash?.user?.avatar}
                alt=""
                className="h-20 w-20 rounded-2xl object-cover ring-2 ring-white shadow-md dark:ring-slate-800"
              />

              <div className="flex-1">
                <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
                  {dash?.user?.name}
                </h1>

                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {dash?.user?.email}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Member since {dash?.user?.memberSince}
                </p>
              </div>

              <button
                type="button"
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Edit profile
              </button>

            </div>
          </section>


          {/* FAVORITES */}
          <section id="favorites">

            <div className="mb-4 flex items-end justify-between gap-4">
              <div>

                <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">
                  Favorite houses
                </h2>

                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Homes you love — synced with your saves.
                </p>

              </div>
            </div>

            {favoriteProps.length === 0 ? (

              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center dark:border-slate-700 dark:bg-slate-900/50">

                <p className="text-sm text-slate-600 dark:text-slate-400">
                  No favorites yet. Explore listings and tap the heart.
                </p>

              </div>

            ) : (

              <div className="grid gap-6 sm:grid-cols-2">

                {favoriteProps.map((p) => (
                  <PropertyCard
                    key={p._id}
                    property={p}
                    favorited={has(p._id)}
                    onToggleFavorite={toggle}
                  />
                ))}

              </div>

            )}

          </section>


          {/* SAVED PROPERTIES */}
          <section id="saved">

            <h2 className="mb-4 font-display text-xl font-semibold text-slate-900 dark:text-white">
              Saved properties
            </h2>

            {savedProps.length === 0 ? (

              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center dark:border-slate-700 dark:bg-slate-900/50">

                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Save listings to compare later.
                </p>

              </div>

            ) : (

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {savedProps.map((p) => (
                  <PropertyCard
                    key={p._id}
                    property={p}
                    favorited={has(p._id)}
                    onToggleFavorite={toggle}
                  />
                ))}

              </div>

            )}

          </section>


          {/* RENTAL REQUESTS */}
          <section id="requests">

            <h2 className="mb-4 font-display text-xl font-semibold text-slate-900 dark:text-white">
              Rental requests
            </h2>

            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white dark:border-slate-700/80 dark:bg-slate-900">

              <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">

                <thead className="bg-slate-50 dark:bg-slate-800/80">

                  <tr>

                    <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">
                      Listing
                    </th>

                    <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">
                      Submitted
                    </th>

                    <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">
                      Status
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

                  {(dash?.rentalRequests || []).map((r) => (

                    <tr
                      key={r._id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                    >

                      {/* HOUSE */}
                      <td className="px-4 py-3">

                        <p className="font-medium text-slate-900 dark:text-white">
                          {r.house?.title || "House"}
                        </p>

                        <p className="text-xs text-slate-500">
                          {r.house?.location || "Location unavailable"}
                        </p>

                      </td>


                      {/* DATE */}
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">

                        {r.createdAt
                          ? new Date(
                              r.createdAt
                            ).toLocaleDateString()
                          : "-"}

                      </td>


                      {/* STATUS */}
                      <td className="px-4 py-3">

                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusPill(
                            r.status
                          )}`}
                        >
                          {r.status}
                        </span>

                      </td>

                    </tr>

                  ))}


                  {/* NO REQUESTS */}
                  {(!dash?.rentalRequests ||
                    dash.rentalRequests.length === 0) && (

                    <tr>

                      <td
                        colSpan="3"
                        className="px-4 py-8 text-center text-sm text-slate-500"
                      >
                        You have not sent any rental requests yet.
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </section>

        </div>
      </div>
    </div>
  );
}