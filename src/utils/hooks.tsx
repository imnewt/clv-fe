import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { notification } from "antd";
import { isEmpty } from "lodash";

import { DEFAULT_ERROR_DESCRIPTION, DEFAULT_ERROR_MESSAGE } from "./constants";

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

export const useShowError = () => {
  const showError = (message: string, descriptions: string[]) => {
    notification.error({
      message: message || DEFAULT_ERROR_MESSAGE,
      description: !isEmpty(descriptions) ? (
        <div>
          {descriptions.map((description) => (
            <p key={description}>{description}</p>
          ))}
        </div>
      ) : (
        DEFAULT_ERROR_DESCRIPTION
      ),
    });
  };

  return { showError };
};
