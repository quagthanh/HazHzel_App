import { auth } from "@/auth";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { getSessionToken } from "./actions";
import { useAuthStore } from "@/library/stores/useAuthStore";
export const api = axios.create({
  baseURL: "process.env.NEXT_PUBLIC_BACKEND_URL",
});
api.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().accessToken;
    console.log("Check new session", token);
    config.headers["Content-Type"] = "application/json";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
