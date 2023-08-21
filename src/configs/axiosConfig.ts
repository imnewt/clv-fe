import axios, { InternalAxiosRequestConfig } from "axios";
import { get } from "lodash";

import {
  getAccessToken,
  getRefreshToken,
  logout,
  setAuth,
} from "@/utils/functions";
import { API_GATEWAY_URL, INVALID_REFRESH_TOKEN } from "@/utils/constants";

const axiosInstance = axios.create({
  baseURL: process.env.API_GATEWAY_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

async function refreshAccessToken() {
  try {
    const refreshToken = getRefreshToken();
    const response = await axiosInstance.post(
      `${API_GATEWAY_URL}/auth/refresh-token`,
      {
        refreshToken,
      }
    );
    const auth = response.data;
    setAuth(auth);
    const { accessToken } = auth;
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
    return accessToken;
  } catch (error) {
    throw error;
  }
}

let isRefreshing = false;
let failedRequestsQueue = [];

const setupAxiosInterceptors = (): void => {
  const onRequestSuccess = async (config: InternalAxiosRequestConfig) => {
    try {
      const accessToken = getAccessToken();
      if (config.headers) {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      }
    } catch (error) {
      // Unauthenticated user, return default config
    }

    return config;
  };
  const onResponseSuccess = (response: any) => {
    return response;
  };
  const onResponseError = async (error: any) => {
    const errorMessage = get(error, "response.data.message") || "";
    if (errorMessage === INVALID_REFRESH_TOKEN) {
      return logout();
    }
    const originalRequest = error.config;
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      if (!isRefreshing) {
        isRefreshing = true;
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest)
          .then((response) => {
            isRefreshing = false;
            return response;
          })
          .catch((error) => {
            return Promise.reject(error);
          });
      } else {
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push((newAccessToken: string) => {
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }
    }
    return Promise.reject(error);
  };

  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
