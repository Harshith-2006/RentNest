import { Link } from "react-router-dom";


function formatRent(n) {

  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }
  ).format(n);

}


export default function PropertyCard({
  property
}) {

  return (

    <article className="group overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-slate-900/5 transition hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900 dark:ring-white/10">

      <Link
        to={`/house/${property._id}`}
      >

        <div className="relative aspect-[4/3] overflow-hidden">

          <img
            src={`https://rentnest-fako.onrender.com/${property.image}`}
            alt={property.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

        </div>

      </Link>

      <div className="p-4">

        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          {property.title}
        </h3>

        <p className="mt-1 text-slate-500">
          {property.location}
        </p>

        <p className="mt-3 text-xl font-bold text-brand-600">
          {formatRent(property.rent)}
        </p>

        <span
          className={`mt-3 inline-block rounded-full px-3 py-1 text-sm font-semibold
          ${
            property.status === "booked"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {property.status}
        </span>

      </div>

    </article>

  );

}
