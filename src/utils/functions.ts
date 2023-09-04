import router from "next/router";
import { isEmpty } from "lodash";

import { Auth } from "@/models/Auth";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, CURRENT_USER } from "./constants";

export const isServer = typeof window === "undefined";

export const logout = () => {
  removeAuth();
  removeCurrentUser();
  router.push("/login");
};

export const isLoggedIn = (): boolean => {
  if (isServer) {
    return false;
  }
  return !!localStorage?.getItem(ACCESS_TOKEN_KEY);
};

export const setAuth = (auth: Auth) => {
  if (isServer) {
    return;
  }
  localStorage.setItem(ACCESS_TOKEN_KEY, auth.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, auth.refreshToken);
};

export const removeAuth = () => {
  if (isServer) {
    return;
  }
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const getAccessToken = (): string => {
  if (isServer) {
    return "";
  }
  return localStorage.getItem(ACCESS_TOKEN_KEY) || "";
};

export const getRefreshToken = (): string => {
  if (isServer) {
    return "";
  }
  return localStorage.getItem(REFRESH_TOKEN_KEY) || "";
};

export const setCurrentUser = (user: { id: string; permissions: string[] }) => {
  if (isServer) {
    return;
  }
  localStorage.setItem(CURRENT_USER, JSON.stringify(user));
};

export const removeCurrentUser = () => {
  if (isServer) {
    return;
  }
  localStorage.removeItem(CURRENT_USER);
};

export const getCurrentUser = () => {
  if (isServer) {
    return {};
  }
  try {
    const user = localStorage.getItem(CURRENT_USER) || "{}";
    return JSON.parse(user);
  } catch (error) {
    console.log("Error while getting current user", error);
  }
};

export const isBlank = (value: any): boolean =>
  typeof value !== "number" && isEmpty(value);

export const requestParamsFromObject = (
  params: Record<
    string,
    string[] | number[] | undefined | null | string | number | boolean
  >
): string => {
  const joined = Object.keys(params)
    .map((key) => {
      if (Array.isArray(params[key])) {
        return (params[key] as string[])
          .map((o) => `${key}=${encodeURIComponent(o)}`)
          .join("&");
      }

      return `${key}=${encodeURIComponent(params[key] as string)}`;
    })
    .join("&");

  return isBlank(joined) ? "" : `?${joined}`;
};
