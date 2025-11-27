import { useEffect, useState } from "react";
import { get } from "../utils/api";
import { Link } from "react-router-dom";

export default function JobsListPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    get("/job").then((res) => setJobs(res.data));
  }, []);

  return (
    <div>
      <h1>Jobs</h1>

      {jobs.map((j) => (
        <div key={j._id}>
          <Link to={`/job/${j._id}`}>{j.title}</Link>
        </div>
      ))}
    </div>
  );
}
