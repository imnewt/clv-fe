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

export enum PERMISSION {
  CREATE_USER = "1",
  READ_USER = "2",
  UPDATE_USER = "3",
  DELETE_USER = "4",
  CREATE_ROLE = "5",
  READ_ROLE = "6",
  UPDATE_ROLE = "7",
  DELETE_ROLE = "8",
  READ_PERMISSION = "9",
  READ_VESSEL = "10",
  CREATE_VESSEL = "11",
  UPDATE_VESSEL = "12",
  DELETE_VESSEL = "13",
}

export const INVALID_REFRESH_TOKEN = "Invalid refresh token!";

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

export const DEFAULT_ERROR_DESCRIPTION =
  "An error has occurred. Please try again!";
export const DEFAULT_ERROR_MESSAGE = "Error!";
