import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// safePush is used to avoid route pushing errors when users click multiple times
// or when the network is slow:  "Error: Abort fetching component for route"
export const useSafePush = () => {
  const router = useRouter();

  const [onChanging, setOnChanging] = useState<boolean>(false);

  const handleRouteChange = () => {
    setOnChanging(false);
  };

  const safePush = (path: string) => {
    if (onChanging) return;
    setOnChanging(true);
    router.push(path);
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router, setOnChanging]);

  return { safePush };
};
