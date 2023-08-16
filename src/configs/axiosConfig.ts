import axios, { InternalAxiosRequestConfig } from "axios";
import { get } from "lodash";

import { getAccessToken, removeAccessToken } from "@/utils/functions";

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
    const status = err.status || get(err, "response.status");
    if (status === 403 || status === 401) {
      removeAccessToken();
    }
    return Promise.reject(err);
  };

  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
