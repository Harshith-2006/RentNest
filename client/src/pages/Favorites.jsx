import { useEffect, useState } from "react";

import axios from "axios";

import PropertyCard from "@/components/property/PropertyCard";

import LoadingSpinner from "@/components/ui/LoadingSpinner";

import { useFavorites } from "@/hooks/useFavorites";

import { Link } from "react-router-dom";


export default function Favorites() {

  const [favorites, setFavorites] = useState([]);

  const [loading, setLoading] = useState(true);

  const { toggle, has } = useFavorites();

  const token = localStorage.getItem("token");


  // FETCH FAVORITES
  useEffect(() => {

    fetchFavorites();

  }, []);


  const fetchFavorites = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/favorite",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const formattedFavorites =
        response.data.map((fav) => ({

          ...fav.house,

          id: fav.house._id,

          type: fav.house.houseType,

          image:
            fav.house.image
              ? `http://localhost:5000/${fav.house.image}`
              : "",

        }));

      setFavorites(formattedFavorites);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <h1 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">
            Saved homes
          </h1>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Your favorite properties stored securely.
          </p>

        </div>

        <Link
          to="/search"
          className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
        >
          Find more homes
        </Link>

      </div>

      {loading ? (

        <LoadingSpinner label="Loading saved homes" />

      ) : favorites.length === 0 ? (

        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-16 text-center dark:border-slate-700 dark:bg-slate-900/40">

          <p className="text-lg font-semibold text-slate-900 dark:text-white">
            Nothing saved yet
          </p>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Tap the heart on any listing to build your collection.
          </p>

          <Link
            to="/"
            className="mt-6 inline-block text-sm font-semibold text-brand-700 dark:text-brand-300"
          >
            Browse featured →
          </Link>

        </div>

      ) : (

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {favorites.map((p) => (

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

  );

}