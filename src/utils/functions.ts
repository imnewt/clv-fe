import { ACCESS_TOKEN_KEY } from "./constants";

export const isServer = typeof window === "undefined";

export const isLoggedIn = () => {
  if (isServer) {
    return;
  }
  return !!localStorage?.getItem(ACCESS_TOKEN_KEY);
};

export const getAccessToken = () => {
  if (isServer) {
    return;
  }
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const setAccessToken = (accessToken: string) => {
  if (isServer) {
    return;
  }
  return localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};

export const removeAccessToken = () => {
  if (isServer) {
    return;
  }
  return localStorage.removeItem(ACCESS_TOKEN_KEY);
};
