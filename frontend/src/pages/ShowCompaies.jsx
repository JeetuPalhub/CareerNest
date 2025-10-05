// src/pages/CompanyList.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await api.get("/v1/company/get");
        if (res.data.success) {
          setCompanies(res.data.companies);
        }
      } catch (err) {
        console.error("Error fetching companies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading companies...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Our Companies</h2>

      {companies.length === 0 ? (
        <p className="text-center text-gray-600">No companies found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <div
              key={company._id}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition"
            >
              {/* Logo */}
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-20 h-20 object-cover mx-auto mb-4 rounded-full border"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-200 flex items-center justify-center mx-auto mb-4 rounded-full">
                  <span className="text-gray-500 text-lg">
                    {company.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}

              {/* Company Name */}
              <h3 className="text-xl font-semibold text-center mb-2">
                {company.name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm text-center mb-3 line-clamp-3">
                {company.description || "No description provided."}
              </p>

              {/* Website & Location */}
              <div className="text-sm text-center space-y-1">
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline block"
                  >
                    🌐 {company.website}
                  </a>
                )}
                {company.location && (
                  <p className="text-gray-500">📍 {company.location}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
