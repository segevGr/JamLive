import axios from "axios";
import { store } from "../store/store";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:8000",
});

axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.token;

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
