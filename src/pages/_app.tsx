import "@/styles/globals.css";
import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { NextPage } from "next/types";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import setupAxiosInterceptors from "@/configs/axiosConfig";
import { Layout, PrivateRoute } from "@/components";

export type ProtectedNextPage<P = {}, IP = P> = NextPage<P, IP> & {
  isPublic?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: ProtectedNextPage;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const queryClient = new QueryClient();
  const [mounted, setMounted] = useState<boolean>(false);

  const page = Component.isPublic ? (
    <Component {...pageProps} />
  ) : (
    <PrivateRoute>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PrivateRoute>
  );

  useEffect(() => {
    setupAxiosInterceptors();
    setMounted(true);
  }, []);

  if (!mounted) return <></>;
  return (
    <ConfigProvider>
      <QueryClientProvider client={queryClient}>{page}</QueryClientProvider>
    </ConfigProvider>
  );
}
