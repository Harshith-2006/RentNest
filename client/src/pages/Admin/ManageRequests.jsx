import { useEffect, useState } from "react";

import { fetchAdminRequests } from "@/services/api";

export default function ManageRequests() {

  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadRequests();

  }, []);

  const loadRequests = async () => {

    try {

      const data = await fetchAdminRequests();

      setRequests(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return <h2 className="p-10">Loading...</h2>;

  }

  return (

    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">

        Rental Requests

      </h1>

      <div className="overflow-x-auto rounded-xl shadow">

        <table className="w-full">

          <thead className="bg-slate-800 text-white">

            <tr>

              <th className="p-3">House</th>

              <th className="p-3">Renter</th>

              <th className="p-3">Owner</th>

              <th className="p-3">Rent</th>

              <th className="p-3">Status</th>

            </tr>

          </thead>

          <tbody>

            {requests.map((request) => (

              <tr
                key={request._id}
                className="border-b text-center"
              >

                <td className="p-3">

                  {request.house?.title}

                </td>

                <td>

                  {request.user?.name}

                </td>

                <td>

                  {request.owner?.name}

                </td>

                <td>

                  ₹{request.house?.rent}

                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      request.status === "pending"
                        ? "bg-yellow-500"
                        : request.status === "accepted"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >

                    {request.status}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}