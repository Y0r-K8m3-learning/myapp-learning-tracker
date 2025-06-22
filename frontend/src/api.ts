// src/api.js
import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost",
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});
export default api;
