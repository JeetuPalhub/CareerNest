import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../utils/api";

export default function JobDetailsPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    get(`/job/${id}`).then((res) => setJob(res.data));
  }, []);

  if (!job) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.description}</p>
    </div>
  );
}
