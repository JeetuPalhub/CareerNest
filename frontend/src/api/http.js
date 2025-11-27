const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

async function request(path, options = {}) {
  const res = await fetch(API_BASE_URL + path, {
    credentials: "include",
    headers: {
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...(options.headers || {})
    },
    ...options
  });

  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await res.json()
    : await res.text();

  if (!res.ok) {
    const message = data?.message || data || "Request failed";
    throw new Error(message);
  }
  return data;
}

export function get(path) {
  return request(path, { method: "GET" });
}

export function post(path, body) {
  const opts =
    body instanceof FormData
      ? { method: "POST", body }
      : { method: "POST", body: JSON.stringify(body) };
  return request(path, opts);
}

export function patch(path, body) {
  const opts =
    body instanceof FormData
      ? { method: "PATCH", body }
      : { method: "PATCH", body: JSON.stringify(body) };
  return request(path, opts);
}

export { API_BASE_URL };
