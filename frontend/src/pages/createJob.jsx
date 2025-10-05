// src/pages/CreateJob.jsx
import { useState } from "react";
import api from "../api/axios"; // axios instance

export default function CreateJob() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    experience: "",
    location: "",
    jobType: "",
    position: "",
    companyId: "", // must match a valid company in DB
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/v1/job/post", form); // <-- make sure backend route matches
      if (res.data.success) {
        setMessage("✅ Job created successfully!");
        setForm({
          title: "",
          description: "",
          requirements: "",
          salary: "",
          experience: "",
          location: "",
          jobType: "",
          position: "",
          companyId: "",
        });
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to create job");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Job</h2>
      {message && (
        <p
          className={`mb-4 ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Job Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          rows="4"
          required
        ></textarea>

        {/* Requirements */}
        <input
          type="text"
          name="requirements"
          placeholder="Requirements (comma separated)"
          value={form.requirements}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          required
        />

        {/* Salary */}
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          required
        />

        {/* Experience */}
        <input
          type="number"
          name="experience"
          placeholder="Experience Level (years)"
          value={form.experience}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          required
        />

        {/* Location */}
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          required
        />

        {/* Job Type */}
        <select
          name="jobType"
          value={form.jobType}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          required
        >
          <option value="">Select Job Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Remote">Remote</option>
        </select>

        {/* Position */}
        <input
          type="number"
          name="position"
          placeholder="Number of Positions"
          value={form.position}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          required
        />

        {/* Company */}
        <input
          type="text"
          name="companyId"
          placeholder="Company ID"
          value={form.companyId}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create Job
        </button>
      </form>
    </div>
  );
}
