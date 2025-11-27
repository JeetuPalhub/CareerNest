import { get, post, patch } from "./http.js";

export function createCompanyApi(body) {
  return post("/company", body);
}

export function getCompaniesApi() {
  return get("/company");
}

export function getCompanyByIdApi(id) {
  return get(`/company/${id}`);
}

export function updateCompanyApi(id, body) {
  return patch(`/company/${id}`, body);
}
