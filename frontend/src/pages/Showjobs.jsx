// src/pages/JobList.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function JobList() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
        const fetchJobs = async () => {
            try {
                const res = await api.get("/v1/job/get");
                if (res.data.success) {
                    setJobs(res.data.jobs);
                }
            } catch (err) {
                console.error("Error fetching jobs:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();


    }, []);
    const handleApply = async (jobId) => {
        try {
            const res = await api.post(`/v1/application/apply/${jobId}`);
            if (res.data.success) {
                setMessage("✅ Applied successfully!");
            } else {
                setMessage("❌ Failed to apply.");
            }
        } catch (err) {
            console.error(err);
            setMessage("❌ Error applying to job.");
        }
    };


    if (loading) return <p className="text-center mt-10">Loading jobs...</p>;

    return (
        <div className="max-w-6xl mx-auto mt-10 px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Available Jobs</h2>

            {jobs.length === 0 ? (
                <p className="text-center text-gray-600">No jobs found.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {jobs.map((job) => (
                        <div
                            key={job._id}
                            className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition"
                        >
                            {/* Job Title */}
                            <h3 className="text-xl font-semibold mb-2">{job.title}</h3>

                            {/* Company */}
                            <p className="text-gray-700 mb-2">
                                Company: {job.company?.name || "Unknown"}
                            </p>

                            {/* Description */}
                            <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                                {job.description}
                            </p>

                            {/* Location */}
                            <p className="text-gray-500 mb-1">📍 {job.location}</p>

                            {/* Salary */}
                            <p className="text-gray-500 mb-1">💰 ${job.salary}</p>

                            {/* Experience */}
                            <p className="text-gray-500 mb-1">🛠 Experience: {job.experienceLevel} years</p>

                            {/* Job Type */}
                            <p className="text-gray-500 mb-2">📌 {job.jobType}</p>

                            {/* Number of Positions */}
                            <p className="text-gray-500 mb-2">Positions: {job.position}</p>

                            {/* Apply Button (optional) */}
                            <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                                onClick={() => handleApply(job._id)}
                            >
                                Apply Now
                            </button>

                            {user.role === "admin" && (
                                <button
                                    className="mt-2 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                                    onClick={() => navigate(`/jobs/${job._id}`)}
                                >
                                    Show Applications
                                </button>
                            )}

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
