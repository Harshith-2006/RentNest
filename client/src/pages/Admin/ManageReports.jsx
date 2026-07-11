import { useEffect, useState } from "react";

import {
  fetchAdminReports,
  deleteReport
} from "@/services/api";

export default function ManageReports() {

  const [reports, setReports] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadReports();

  }, []);

  const loadReports = async () => {

    try {

      const data = await fetchAdminReports();

      setReports(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const handleDelete = async (id) => {

    const ok = window.confirm(
      "Delete this report?"
    );

    if (!ok) return;

    try {

      await deleteReport(id);

      setReports(
        reports.filter(
          report => report._id !== id
        )
      );

      alert("Report deleted");

    } catch (error) {

      alert("Failed");

    }

  };

  if (loading) {

    return <h2 className="p-10">Loading...</h2>;

  }

  return (

    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">

        Manage Reports

      </h1>

      <div className="overflow-x-auto rounded-xl shadow">

        <table className="w-full">

          <thead className="bg-slate-800 text-white">

            <tr>

              <th className="p-3">House</th>

              <th className="p-3">Reported By</th>

              <th className="p-3">Reason</th>

              <th className="p-3">Action</th>

            </tr>

          </thead>

          <tbody>

            {reports.map(report => (

              <tr
                key={report._id}
                className="border-b text-center"
              >

                <td className="p-3">

                  {report.house?.title}

                </td>

                <td>

                  {report.user?.name}

                </td>

                <td>

                  {report.reason}

                </td>

                <td>

                  <button
                    onClick={() =>
                      handleDelete(report._id)
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >

                    Delete Report

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
