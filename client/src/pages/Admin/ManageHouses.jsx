import { useEffect, useState } from "react";
import { fetchAdminHouses, deleteHouse } from "@/services/api";

export default function ManageHouses() {

  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHouses();
  }, []);

  const loadHouses = async () => {

    try {

      const data = await fetchAdminHouses();
      setHouses(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this house?"
    );

    if (!confirmDelete) return;

    try {

      await deleteHouse(id);

      setHouses(
        houses.filter((house) => house._id !== id)
      );

      alert("House deleted successfully");

    } catch (error) {

      alert("Failed to delete house");

    }

  };

  if (loading) {

    return (
      <div className="p-10 text-xl">
        Loading Houses...
      </div>
    );

  }

  return (

    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">
        Manage Houses
      </h1>

      <div className="overflow-x-auto rounded-xl shadow">

        <table className="w-full border-collapse">

          <thead className="bg-slate-800 text-white">

            <tr>

              <th className="p-3">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Owner</th>
              <th className="p-3">Location</th>
              <th className="p-3">Rent</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>

            </tr>

          </thead>

          <tbody>

            {houses.map((house) => (

              <tr
                key={house._id}
                className="border-b text-center"
              >

                <td className="p-3">

                  <img
                    src={`https://rentnest-fako.onrender.com/${house.image}`}
                    alt={house.title}
                    className="w-24 h-16 object-cover rounded mx-auto"
                  />

                </td>

                <td>{house.title}</td>

                <td>
                  {house.owner?.name}
                </td>

                <td>
                  {house.location}
                </td>

                <td>
                  ₹{house.rent}
                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      house.status === "available"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {house.status}
                  </span>

                </td>

                <td>

                  <button
                    onClick={() =>
                      handleDelete(house._id)
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}
