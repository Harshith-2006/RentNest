import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import axios from "axios";

import LoadingSpinner from "@/components/ui/LoadingSpinner";

import { useToast } from "@/context/ToastContext";


function formatMoney(n) {

  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }
  ).format(n);

}


export default function HouseDetails() {

  const { id } = useParams();

  const { toast } = useToast();

  const [house, setHouse] = useState(null);

  const [loading, setLoading] = useState(true);

  const [note, setNote] = useState("");


  useEffect(() => {

    fetchHouse();

  }, [id]);


  const fetchHouse = async () => {

    try {

      const response = await axios.get(
        `https://rentnest-fako.onrender.com/house/${id}`
      );

      setHouse(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };


  // RENT REQUEST
  const handleRequest = async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      const response = await axios.post(
        `https://rentnest-fako.onrender.com/request/add/${id}`,
        {
          message: note
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast({
        message: response.data.message,
        type: "success"
      });

      setNote("");

    } catch (error) {

      toast({
        message:
          error.response?.data?.message ||
          "Request failed",
        type: "error"
      });

    }

  };


  if (loading) {

    return (

      <div className="py-20">

        <LoadingSpinner label="Loading house" />

      </div>

    );

  }


  if (!house) {

    return (

      <div className="py-20 text-center">

        House not found

      </div>

    );

  }


  return (

    <div className="mx-auto max-w-6xl px-4 py-10">

      <div className="grid gap-10 lg:grid-cols-2">

        {/* IMAGE */}

        <div>

<img
  src={house.image}
  alt={house.title}
  className="h-[450px] w-full rounded-3xl object-cover"
/>

        </div>


        {/* DETAILS */}

        <div>

          <p className="text-sm font-semibold text-brand-600">
            {house.houseType}
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">
            {house.title}
          </h1>

          <p className="mt-3 text-slate-600 dark:text-slate-300">
            {house.description}
          </p>

          <div className="mt-6 space-y-3">

            <p className="text-lg">
              📍 {house.location}
            </p>

            <p className="text-lg">
              🛋️ {house.furnished
                ? "Furnished"
                : "Not Furnished"}
            </p>

            <p className="text-3xl font-bold text-brand-600">
              {formatMoney(house.rent)}
              <span className="text-lg text-slate-500">
                {" "} / month
              </span>
            </p>

          </div>


          {/* OWNER */}

          <div className="mt-8 rounded-2xl border border-slate-200 p-5 dark:border-slate-700">

            <h2 className="text-lg font-semibold">
              Owner Details
            </h2>

            <p className="mt-2">
              {house.owner?.name}
            </p>

            <p className="text-slate-500">
              {house.owner?.email}
            </p>

          </div>


          {/* REQUEST FORM */}

          <form
            onSubmit={handleRequest}
            className="mt-8 space-y-4"
          >

            <textarea
              rows={4}
              value={note}
              onChange={(e) =>
                setNote(e.target.value)
              }
              placeholder="Send a message to owner..."
              className="w-full rounded-2xl border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-900"
            />

            <button
              type="submit"
              className="w-full rounded-2xl bg-brand-600 py-3 text-white font-semibold hover:bg-brand-700"
            >
              Request to Rent
            </button>

          </form>

        </div>

      </div>

    </div>

  );

}
