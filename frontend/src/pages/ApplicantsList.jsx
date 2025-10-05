// src/components/ApplicantsList.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";

export default function ApplicantsList() {
const { jobId } = useParams(); 
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/v1/application/${jobId}/applicants`);
        if (res.data.success) {
          setApplications(res.data.applications);
        }
      } catch (err) {
        console.error("Error fetching applicants:", err);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchApplicants();
    }
  }, [jobId]);

  const handleStatusUpdate = async (applicationId, status) => {
    try {
      const res = await api.post(`/v1/application/status/${applicationId}/update`, { status });
      if (res.data.success) {
        setMessage(res.data.message);
        // update UI without reload
        setApplications((prev) =>
          prev.map((app) =>
            app._id === applicationId ? { ...app, status } : app
          )
        );
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading applicants...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Applicants</h2>

      {message && (
        <p className="mb-4 text-green-600 font-semibold">{message}</p>
      )}

      {applications.length === 0 ? (
        <p className="text-gray-600">No applicants for this job yet.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app._id}
              className="border p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{app.applicant?.name}</h3>
                <p className="text-gray-500">{app.applicant?.email}</p>
                <p className="text-sm mt-1">
                  Applied for:{" "}
                  <span className="font-medium">{app.job?.title}</span>
                </p>
                <p className="text-sm mt-1">
                  Status:{" "}
                  <span
                    className={
                      app.status === "accepted"
                        ? "text-green-600 font-semibold"
                        : app.status === "rejected"
                        ? "text-red-600 font-semibold"
                        : "text-yellow-600 font-semibold"
                    }
                  >
                    {app.status}
                  </span>
                </p>
              </div>

              <div className="space-x-2">
                <button
                  onClick={() => handleStatusUpdate(app._id, "accepted")}
                  disabled={app.status === "accepted"}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleStatusUpdate(app._id, "rejected")}
                  disabled={app.status === "rejected"}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
