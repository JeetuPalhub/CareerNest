// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // adjust to your backend URL
  withCredentials: true, // IMPORTANT: send/receive cookies
});

export default api;
