import { useState, useMemo, useEffect } from "react";
import { TablePaginationConfig, Typography } from "antd";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";

import PermissionTable from "./components/PermissionTable";
import { SearchBar } from "@/components";
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGINATION,
  PERMISSION,
} from "@/utils/constants";
import { getCurrentUser } from "@/utils/functions";
import { useGetAllPermissions } from "@/hooks/permissions";

const PermissionManagement = () => {
  const router = useRouter();
  const currentUser = getCurrentUser();

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

  const haveReadPermissionPermission = useMemo(
    () => currentUser.permissions.includes(PERMISSION.READ_PERMISSION),
    [currentUser.permissions]
  );

  useEffect(() => {
    if (!isEmpty(currentUser.permissions) && !haveReadPermissionPermission) {
      router.push("/404");
    }
  }, [currentUser.permissions, haveReadPermissionPermission, router]);

  const tablePagination = useMemo(() => {
    return { ...pagination, total };
  }, [pagination, total]);

  return haveReadPermissionPermission ? (
    <>
      <Typography.Title level={3}>Permission Management</Typography.Title>
      <div className="w-64">
        <SearchBar
          placeholder="Search by permission name"
          onSetSearchTerm={setSearchTerm}
        />
      </div>
      <div className="mt-4">
        <PermissionTable
          data={permissions}
          isLoading={isLoadingPermissions}
          pagination={tablePagination}
          onSetPagination={setPagination}
        />
      </div>
    </>
  ) : (
    <></>
  );
};

export default PermissionManagement;
