import { Filter } from "@/models/Filter";
import { TablePaginationConfig } from "antd/lib/table";

export const USER_SERVICE_HOST = "http://localhost:9002/api";

export const brandColor = "#110a3c";
export const primaryColor = "#1890ff";
export const grayBgColor = "#eff3f9";

export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";

export const ADMIN_ROLE_ID = "1";
export const USER_ROLE_ID = "2";

export const INVALID_REFRESH_TOKEN = "Invalid Refresh Token" + "!";

export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_PAGE_SIZE = 10;

export const DEFAULT_FILTER: Filter = {
  searchTerm: "",
  pageNumber: DEFAULT_PAGE_NUMBER,
  pageSize: DEFAULT_PAGE_SIZE,
};

export const DEFAULT_PAGINATION: TablePaginationConfig = {
  pageSize: DEFAULT_PAGE_SIZE,
  hideOnSinglePage: false,
  showSizeChanger: true,
  position: ["bottomRight", "topRight"],
};
