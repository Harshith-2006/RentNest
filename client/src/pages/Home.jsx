import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "@/components/search/SearchBar";
import PropertyCard from "@/components/property/PropertyCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { fetchProperties } from "@/services/api";
import { useFavorites } from "@/hooks/useFavorites";

export default function Home() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toggle, has } = useFavorites();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchProperties();
        if (!cancelled) setList(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

const nearby = list;
const featured = list;

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-900/30" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-slate-200/50 blur-3xl dark:bg-slate-800/40" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 lg:px-8 lg:pb-28 lg:pt-20">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-800 shadow-sm ring-1 ring-brand-100 backdrop-blur dark:bg-slate-900/70 dark:text-brand-200 dark:ring-brand-900/40">
              Curated rentals · Verified owners
            </p>
            <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              Find a home that feels like{" "}
              <span className="bg-gradient-to-r from-brand-600 to-teal-500 bg-clip-text text-transparent">yours</span>.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              Discover architect-led spaces, transparent pricing, and a booking flow designed for peace of mind.
            </p>
          </div>
          <div className="mt-10 max-w-4xl">
            <SearchBar />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-20 px-4 py-16 sm:px-6 lg:px-8">
        {loading ? (
          <LoadingSpinner label="Loading homes near you" />
        ) : (
          <>
            <section>
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
                    Nearby stays
                  </h2>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Hand-picked listings around popular neighborhoods.
                  </p>
                </div>
                <Link
                  to="/search"
                  className="text-sm font-semibold text-brand-700 transition hover:text-brand-800 dark:text-brand-300"
                >
                  View all →
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {nearby.map((p) => (
                  <PropertyCard key={p.id} property={p} favorited={has(p.id)} onToggleFavorite={toggle} />
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-slate-900 px-6 py-12 text-white dark:bg-slate-950 sm:px-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-xl">
                  <h2 className="font-display text-2xl font-semibold sm:text-3xl">Featured this month</h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    Exceptional light, thoughtful layouts, and hosts who respond fast. Updated weekly.
                  </p>
                </div>
                <Link
                  to="/search?featured=1"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
                >
                  Browse featured
                </Link>
              </div>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((p) => (
                  <div key={p.id} className="[&_article]:bg-white [&_article]:text-slate-900">
                    <PropertyCard property={p} favorited={has(p.id)} onToggleFavorite={toggle} />
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
                    Popular right now
                  </h2>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Trending homes renters are saving this week.
                  </p>
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {list.slice(0, 4).map((p) => (
                  <PropertyCard key={p.id} property={p} favorited={has(p.id)} onToggleFavorite={toggle} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
