import { get, post, patch } from "./http.js";

export function applyJobApi(jobId, body) {
  return post(`/application/jobs/${jobId}/apply`, body);
}

export function getAppliedJobsApi() {
  return get("/application/applications");
}

export function getApplicantsApi(jobId) {
  return get(`/application/jobs/${jobId}/applicants`);
}

export function updateApplicationStatusApi(id, status) {
  return patch(`/application/applications/${id}/status`, { status });
}
