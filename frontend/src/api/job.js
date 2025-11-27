import { get, post } from "./http.js";

export function createJobApi(payload) {
  return post("/job", payload);
}

export function getPublicJobsApi(query = "") {
  const qs = query ? `?${query}` : "";
  return get(`/job${qs}`);
}

export function getJobByIdApi(id) {
  return get(`/job/${id}`);
}

export function getRecruiterJobsApi() {
  return get("/job/admin/jobs");
}
