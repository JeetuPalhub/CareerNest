// src/pages/CompanyCreate.jsx
import { useState } from "react";
import api from "../api/axios";

export default function CompanyCreate() {
  const [form, setForm] = useState({
    companyName: "",
    description: "",
    website: "",
    location: "",
    logo: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // For now only companyName is required in your backend
      const res = await api.post("/v1/company/register", {
        companyName: form.companyName,
      });

      if (res.data.success) {
        setMessage("✅ Company created successfully!");
        setForm({ companyName: "", description: "", website: "", location: "", logo: "" });
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to create company.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Company</h2>
      
      {message && (
        <div className="mb-4 text-center text-sm text-gray-700">{message}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Enter company name"
          />
        </div>

        {/* Optional fields (you can enable them later in backend) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Company description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Website</label>
          <input
            type="url"
            name="website"
            value={form.website}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="City, Country"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Create Company
        </button>
      </form>
    </div>
  );
}
