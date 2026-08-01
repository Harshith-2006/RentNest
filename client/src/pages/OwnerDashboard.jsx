import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import DashboardSidebar from "@/components/layout/DashboardSidebar";

import AnalyticsCard from "@/components/ui/AnalyticsCard";

import LoadingSpinner from "@/components/ui/LoadingSpinner";

import { useToast } from "@/context/ToastContext";


const ownerNav = [
  {
    to: "/owner",
    label: "Overview",
    end: true,
    icon: "◆"
  },
];


export default function OwnerDashboard() {

  const navigate = useNavigate();

  const { toast } = useToast();

  const [loading, setLoading] = useState(true);

  const [dashboard, setDashboard] = useState(null);


  useEffect(() => {

    fetchDashboard();

  }, []);


  const fetchDashboard = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await axios.get(
        "https://rentnest-fako.onrender.com/owner/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setDashboard(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };


  // ACCEPT REQUEST
  const acceptRequest = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await axios.put(
        `https://rentnest-fako.onrender.com/request/accept/${id}`,
        {},
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

      fetchDashboard();

    } catch (error) {

      toast({
        message: "Failed",
        type: "error"
      });

    }

  };


  // REJECT REQUEST
  const rejectRequest = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await axios.put(
        `https://rentnest-fako.onrender.com/request/reject/${id}`,
        {},
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

      fetchDashboard();

    } catch (error) {

      toast({
        message: "Failed",
        type: "error"
      });

    }

  };
  // DELETE HOUSE
const deleteHouse = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this house?"
  );

  if (!confirmDelete) return;

  try {

    const token = localStorage.getItem("token");

    const response = await axios.delete(
      `https://rentnest-fako.onrender.com/house/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast({
      message: response.data.message,
      type: "success",
    });

    fetchDashboard();

  } catch (error) {

    toast({
      message: "Failed to delete house",
      type: "error",
    });

  }

};


  if (loading) {

    return (

      <div className="py-20">

        <LoadingSpinner label="Loading Dashboard" />

      </div>

    );

  }


  return (

    <div className="mx-auto max-w-7xl px-4 py-10">

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">

        <DashboardSidebar
          title="Owner"
          items={ownerNav}
        />

        <div className="space-y-10">

          {/* TITLE */}

          <div>

            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Owner Dashboard
            </h1>

            <p className="mt-2 text-slate-500">
              Manage houses and renter requests
            </p>

          </div>


          {/* ANALYTICS */}

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <AnalyticsCard
              label="Total Listings"
              value={dashboard.totalListings}
            />

            <AnalyticsCard
              label="Available"
              value={dashboard.availableHouses}
            />

            <AnalyticsCard
              label="Booked"
              value={dashboard.bookedHouses}
            />

            <AnalyticsCard
              label="Pending"
              value={dashboard.pendingHouses}
            />

          </section>


          {/* ADD HOUSE */}

          <section>

            <button
              onClick={() =>
                navigate("/add-house")
              }
              className="rounded-2xl bg-brand-600 px-6 py-3 text-white font-semibold hover:bg-brand-700"
            >
              Add New House
            </button>

          </section>


          {/* MY HOUSES */}

          <section>

            <h2 className="mb-5 text-2xl font-bold">
              My Houses
            </h2>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

              {dashboard.houses?.map((house) => (

                <div
                  key={house._id}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
                >

                    <img
                    src={house.image}
                    alt={house.title}
                    className="h-52 w-full object-cover"
                  />

                  <div className="p-5">

                    <h3 className="text-lg font-bold">
                      {house.title}
                    </h3>

                    <p className="mt-1 text-slate-500">
                      {house.location}
                    </p>

                    <p className="mt-3 text-brand-600 font-bold text-xl">
                      ${house.rent}
                    </p>

<span
  className={`mt-3 inline-block rounded-full px-3 py-1 text-sm font-semibold
  ${
    house.status === "booked"
      ? "bg-red-100 text-red-700"
      : house.status === "available"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700"
  }`}
>
  {house.status}
</span>
<div className="mt-5 flex gap-3">

  <button
    onClick={() => navigate(`/edit-house/${house._id}`)}
    className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
  >
    Edit
  </button>

  <button
    onClick={() => deleteHouse(house._id)}
    className="rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700"
  >
    Delete
  </button>

</div>

                  </div>

                </div>

              ))}

            </div>

          </section>


          {/* RENTAL REQUESTS */}

          <section>

            <h2 className="mb-5 text-2xl font-bold">
              Rental Requests
            </h2>

            {dashboard.requests?.length === 0 ? (

              <p className="text-slate-500">
                No requests yet
              </p>

            ) : (

              <div className="space-y-4">

                {dashboard.requests?.map((req) => (

                  <div
                    key={req._id}
                    className="rounded-2xl border border-slate-200 p-5 dark:border-slate-700"
                  >

                    <h3 className="text-lg font-bold">
                      {req.house?.title}
                    </h3>

                    <p className="mt-2">
                      Renter:
                      {" "}
                      {req.user?.name}
                    </p>

                    <p className="text-slate-500">
                      {req.user?.email}
                    </p>

                    <p className="mt-3">
                      Status:
                      {" "}
                      <span className="font-semibold">
                        {req.status}
                      </span>
                    </p>

                    {req.status === "pending" && (

                      <div className="mt-4 flex gap-3">

                        <button
                          onClick={() =>
                            acceptRequest(req._id)
                          }
                          className="rounded-xl bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                        >
                          Accept
                        </button>

                        <button
                          onClick={() =>
                            rejectRequest(req._id)
                          }
                          className="rounded-xl bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                        >
                          Reject
                        </button>
                        

                      </div>

                    )}

                  </div>

                ))}

              </div>

            )}

          </section>

        </div>

      </div>

    </div>

  );

}
