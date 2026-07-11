import { useEffect, useState } from "react";

import {
  fetchAdminUsers,
  blockUser,
  unblockUser
} from "@/services/api";

export default function ManageUsers() {

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadUsers();

  }, []);

  const loadUsers = async () => {

    try {

      const data = await fetchAdminUsers();

      setUsers(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const handleToggle = async (user) => {

    try {

      if (user.status === "active") {

        await blockUser(user._id);

      } else {

        await unblockUser(user._id);

      }

      loadUsers();

    } catch (error) {

      alert("Something went wrong");

    }

  };

  if (loading) {

    return <h2 className="p-10">Loading...</h2>;

  }

  return (

    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">

        Manage Users

      </h1>

      <div className="overflow-x-auto rounded-xl shadow">

        <table className="w-full">

          <thead className="bg-slate-800 text-white">

            <tr>

              <th className="p-3">Name</th>

              <th className="p-3">Email</th>

              <th className="p-3">Role</th>

              <th className="p-3">Status</th>

              <th className="p-3">Action</th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user._id}
                className="text-center border-b"
              >

                <td className="p-3">

                  {user.name}

                </td>

                <td>

                  {user.email}

                </td>

                <td>

                  {user.role}

                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      user.status === "active"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >

                    {user.status}

                  </span>

                </td>

                <td>

                  <button
                    onClick={() =>
                      handleToggle(user)
                    }
                    className={`px-4 py-2 rounded text-white ${
                      user.status === "active"
                        ? "bg-red-600"
                        : "bg-green-600"
                    }`}
                  >

                    {user.status === "active"
                      ? "Block"
                      : "Unblock"}

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