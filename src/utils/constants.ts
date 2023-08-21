import { Filter } from "@/models/Filter";
import { TablePaginationConfig } from "antd/lib/table";

export const API_BASE_URL = "http://localhost:9002/api";
export const API_GATEWAY_URL = "http://localhost:9004";

export const brandColor = "#110a3c";
export const primaryColor = "#1890ff";
export const grayBgColor = "#eff3f9";

export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";
export const CURRENT_USER = "current_user";

export const ADMIN_ROLE_ID = "1";
export const USER_ROLE_ID = "2";

export const CREATE_USER = "1";
export const READ_USER = "2";
export const UPDATE_USER = "3";
export const DELETE_USER = "4";
export const CREATE_ROLE = "5";
export const READ_ROLE = "6";
export const UPDATE_ROLE = "7";
export const DELETE_ROLE = "8";
export const READ_PERMISSION = "9";

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
