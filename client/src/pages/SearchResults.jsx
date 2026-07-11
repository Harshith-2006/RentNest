import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import FilterSidebar, {
  defaultFilters
} from "@/components/filters/FilterSidebar";

import PropertyCard from "@/components/property/PropertyCard";

import LoadingSpinner from "@/components/ui/LoadingSpinner";

import { useFavorites } from "@/hooks/useFavorites";


// FILTER FUNCTION
function matchesFilters(p, f, q, featuredOnly) {

  if (featuredOnly && !p.featured)
    return false;

  const text = `
    ${p.title || ""}
    ${p.location || ""}
    ${p.description || ""}
  `.toLowerCase();

  // SEARCH QUERY
  if (
    q &&
    !text.includes(q.toLowerCase())
  ) {
    return false;
  }

  // LOCATION FILTER
  if (
    f.location &&
    !(p.location || "")
      .toLowerCase()
      .includes(f.location.toLowerCase())
  ) {
    return false;
  }

  // TYPE FILTER
  if (
    f.type &&
    (p.houseType || p.type) !== f.type
  ) {
    return false;
  }

  // RENT FILTER
  if (
    f.minRent &&
    p.rent < Number(f.minRent)
  ) {
    return false;
  }

  if (
    f.maxRent &&
    p.rent > Number(f.maxRent)
  ) {
    return false;
  }

  // FURNISHED
  if (
    f.furnished === "yes" &&
    !p.furnished
  ) {
    return false;
  }

  if (
    f.furnished === "no" &&
    p.furnished
  ) {
    return false;
  }

  return true;

}


export default function SearchResults() {

  const [searchParams] = useSearchParams();

  const q = searchParams.get("q") || "";

  const featuredOnly =
    searchParams.get("featured") === "1";

  const [list, setList] = useState([]);

  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState(() => ({
    ...defaultFilters,
    location: q,
  }));

  const { toggle, has } = useFavorites();


  // FETCH HOUSES
  useEffect(() => {

    let cancelled = false;

    const fetchHouses = async () => {

      setLoading(true);

      try {

        const response = await axios.get(
          "https://rentnest-fako.onrender.com/house"
        );

        if (!cancelled) {

          const formattedData =
            response.data.map((house) => ({

              ...house,

              id: house._id,

              type: house.houseType,

              image:
                house.image
                  ? `https://rentnest-fako.onrender.com/${house.image}`
                  : "",

            }));

          setList(formattedData);

        }

      } catch (error) {

        console.log(error);

      } finally {

        if (!cancelled)
          setLoading(false);

      }

    };

    fetchHouses();

    return () => {
      cancelled = true;
    };

  }, []);


  useEffect(() => {

    setFilters((prev) => ({
      ...prev,
      location: q || prev.location
    }));

  }, [q]);


  // FILTERED LIST
  const filtered = useMemo(

    () =>
      list.filter((p) =>
        matchesFilters(
          p,
          filters,
          q,
          featuredOnly
        )
      ),

    [list, filters, q, featuredOnly]

  );


  return (

    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

      <div className="mb-8">

        <h1 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">
          Search results
        </h1>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">

          {featuredOnly
            ? "Showing featured homes."
            : "Refine by neighborhood, budget, and home type."}

        </p>

      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">

        <div className="lg:sticky lg:top-24 lg:self-start">

          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={() =>
              setFilters({
                ...defaultFilters
              })
            }
          />

        </div>

        <div>

          {loading ? (

            <LoadingSpinner label="Fetching listings" />

          ) : filtered.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-16 text-center dark:border-slate-700 dark:bg-slate-900/40">

              <p className="font-medium text-slate-900 dark:text-white">
                No homes match your filters
              </p>

              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Try widening the rent range or clearing filters.
              </p>

            </div>

          ) : (

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

              {filtered.map((p) => (

                <PropertyCard
                  key={p.id}
                  property={p}
                  favorited={has(p.id)}
                  onToggleFavorite={toggle}
                />

              ))}

            </div>

          )}

        </div>

      </div>

    </div>

  );

}
