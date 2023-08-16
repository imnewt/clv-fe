import { ACCESS_TOKEN_KEY } from "./constants";

export const isServer = typeof window === "undefined";

export const isLoggedIn = (): boolean => {
  if (isServer) {
    return false;
  }
  return !!localStorage?.getItem(ACCESS_TOKEN_KEY);
};

export const getAccessToken = (): string => {
  if (isServer) {
    return "";
  }
  return localStorage.getItem(ACCESS_TOKEN_KEY) || "";
};

export const setAccessToken = (accessToken: string): void => {
  if (isServer) {
    return;
  }
  return localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};

export const removeAccessToken = (): void => {
  if (isServer) {
    return;
  }
  return localStorage.removeItem(ACCESS_TOKEN_KEY);
};
