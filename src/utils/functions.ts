import { ACCESS_TOKEN_KEY } from "./constants";

export const isServer = typeof window === "undefined";

export const isLoggedIn = () => {
  if (isServer) {
    return;
  }
  return !!localStorage?.getItem(ACCESS_TOKEN_KEY);
};
