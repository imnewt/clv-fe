import { useState, useMemo } from "react";
import { TablePaginationConfig, Typography } from "antd";

import { useGetAllPermissions } from "@/hooks/permissions";
import PermissionTable from "./components/PermissionTable";
import { SearchBar } from "@/components";
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGINATION,
} from "@/utils/constants";

const PermissionManagement = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pagination, setPagination] =
    useState<TablePaginationConfig>(DEFAULT_PAGINATION);

  const {
    permissions = [],
    total,
    isLoadingPermissions,
  } = useGetAllPermissions({
    searchTerm,
    pageNumber: pagination.current || DEFAULT_PAGE_NUMBER,
    pageSize: pagination.pageSize || DEFAULT_PAGE_SIZE,
  });

  const tablePagination = useMemo(() => {
    return { ...pagination, total };
  }, [pagination, total]);

  return (
    <div>
      <Typography.Title level={3}>Permission Management</Typography.Title>
      <SearchBar
        placeholder="Search by permission name"
        onSetSearchTerm={setSearchTerm}
      />
      <div className="mt-4">
        <PermissionTable
          data={permissions}
          isLoading={isLoadingPermissions}
          pagination={tablePagination}
          onSetPagination={setPagination}
        />
      </div>
    </div>
  );
};

export default PermissionManagement;
