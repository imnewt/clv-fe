import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { get } from "lodash";

import {
  getAccessToken,
  getRefreshToken,
  logout,
  setAuth,
} from "@/utils/functions";
import { Auth } from "@/models/Auth";
import { refreshToken as doRefreshToken } from "@/apis/auth";
import { INVALID_REFRESH_TOKEN } from "@/utils/constants";

interface Config extends AxiosRequestConfig {
  _retry: boolean;
}

const TIMEOUT = 30 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = process.env.BASE_URL;

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
  const onResponseError = (err: any) => {
    const errorMessage = get(err, "response.data.message") || "";
    if (errorMessage === INVALID_REFRESH_TOKEN) {
      return logout();
    }

    const status = err.status || get(err, "response.status");
    const originalRequest = err.config as Config;

    if ((status === 403 || status === 401) && !originalRequest._retry) {
      const refreshToken = getRefreshToken();
      originalRequest._retry = true;
      return new Promise(async (resolve, _) => {
        try {
          const auth: Auth = await doRefreshToken(refreshToken);
          if (!auth || !auth.accessToken) return logout();
          setAuth(auth);
        } catch (_) {}
      });
    }
    return Promise.reject(err);
  };

  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
