// frontend/src/constants/axios.ts
import axios from "axios";
import { store } from "store/store";
import { start, stop } from "store/reducers/loadingSlice";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL!,
  timeout: 60_000,
});

const DELAY = 1000;
let timer: ReturnType<typeof setTimeout> | null = null;
let loaderShown = false;

axiosInstance.interceptors.request.use(
  (config) => {
    if (!timer) {
      timer = setTimeout(() => {
        store.dispatch(start());
        loaderShown = true;
      }, DELAY);
    }
    const token = store.getState().auth.token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    clearDelay();
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    clearDelay();
    return response;
  },
  (error) => {
    clearDelay();
    return Promise.reject(error);
  }
);

function clearDelay() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  if (loaderShown) {
    store.dispatch(stop());
    loaderShown = false;
  }
}
