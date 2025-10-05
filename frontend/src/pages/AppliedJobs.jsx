// src/pages/AppliedJobs.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AppliedJobs() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
  const fetchApplications = async () => {
    try {
      const res = await api.get("/v1/application/get");
      if (res.data.success) {
  setApplications(res.data.applications);
}

    } catch (err) {
      console.error(err);
    }
  };
  fetchApplications();
}, []);


  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">My Applications</h2>
      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app._id} className="border p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{app.job.title}</h3>
            <p className="text-gray-600">{app.job.description}</p>
            <p className="text-sm text-gray-500">
              Status:{" "}
              <span
                className={
                  app.status === "accepted"
                    ? "text-green-600"
                    : app.status === "rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }
              >
                {app.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
