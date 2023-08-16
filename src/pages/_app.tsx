import "@/styles/globals.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";

import setupAxiosInterceptors from "@/configs/axiosConfig";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  useEffect(() => {
    setupAxiosInterceptors();
  }, []);

  return (
    <ConfigProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ConfigProvider>
  );
}
