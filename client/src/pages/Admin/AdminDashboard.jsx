import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAdminDashboard } from "@/services/api";

export default function AdminDashboard() {

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const data = await fetchAdminDashboard();

      setDashboard(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <div className="flex h-[70vh] items-center justify-center">
        <h2 className="text-2xl font-semibold">
          Loading Dashboard...
        </h2>
      </div>
    );

  }

  const { stats } = dashboard;

  return (

    <div className="mx-auto max-w-7xl p-8">

      <h1 className="mb-2 text-4xl font-bold text-slate-900 dark:text-white">
        Admin Dashboard
      </h1>

      <p className="mb-8 text-slate-500 dark:text-slate-400">
        Welcome to the RentNest Admin Panel
      </p>

      {/* Statistics */}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl bg-white p-6 shadow dark:bg-slate-900">
          <h3 className="text-slate-500">👤 Total Users</h3>
          <p className="mt-3 text-4xl font-bold text-blue-600">
            {stats.totalUsers}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow dark:bg-slate-900">
          <h3 className="text-slate-500">🏠 Total Owners</h3>
          <p className="mt-3 text-4xl font-bold text-green-600">
            {stats.totalOwners}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow dark:bg-slate-900">
          <h3 className="text-slate-500">🏡 Total Houses</h3>
          <p className="mt-3 text-4xl font-bold text-purple-600">
            {stats.totalHouses}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow dark:bg-slate-900">
          <h3 className="text-slate-500">🟢 Available Houses</h3>
          <p className="mt-3 text-4xl font-bold text-emerald-600">
            {stats.availableHouses}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow dark:bg-slate-900">
          <h3 className="text-slate-500">🔴 Booked Houses</h3>
          <p className="mt-3 text-4xl font-bold text-red-600">
            {stats.bookedHouses}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow dark:bg-slate-900">
          <h3 className="text-slate-500">📩 Rental Requests</h3>
          <p className="mt-3 text-4xl font-bold text-orange-500">
            {stats.totalRequests}
          </p>
        </div>

               <div className="rounded-2xl bg-white p-6 shadow dark:bg-slate-900">
          <h3 className="text-slate-500">🚩 Reports</h3>
          <p className="mt-3 text-4xl font-bold text-pink-600">
            {stats.totalReports}
          </p>
        </div>

      </div>

    </div>

  );

}
