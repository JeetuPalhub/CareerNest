import { get, post, patch } from "./http.js";

export function registerApi(payload) {
  return post("/user/register", payload);
}

export function loginApi(payload) {
  return post("/user/login", payload);
}

export function logoutApi() {
  return post("/user/logout");
}

export function getProfileApi() {
  return get("/user/me");
}

export function updateProfileApi(body) {
  return patch("/user/me", body);
}
