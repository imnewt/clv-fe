import { useState, useMemo, useEffect } from "react";
import { Spin, TablePaginationConfig, Typography } from "antd";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";

import PermissionTable from "./components/PermissionTable";
import { SearchBar } from "@/components";
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGINATION,
  READ_PERMISSION,
} from "@/utils/constants";
import { getCurrentUser } from "@/utils/functions";
import {
  useGetAllPermissions,
  useGetUserPermissions,
} from "@/hooks/permissions";

const PermissionManagement = () => {
  const router = useRouter();
  const currentUserId = getCurrentUser();

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

  const { userPermissions, isLoadingUserPermissions } =
    useGetUserPermissions(currentUserId);

  const haveReadPermissionPermission = useMemo(
    () => userPermissions.includes(READ_PERMISSION),
    [userPermissions]
  );

  useEffect(() => {
    if (
      router.pathname === "/permissions" &&
      !isEmpty(userPermissions) &&
      !haveReadPermissionPermission
    ) {
      router.push("/not-found");
    }
  }, [router, userPermissions, haveReadPermissionPermission]);

  const tablePagination = useMemo(() => {
    return { ...pagination, total };
  }, [pagination, total]);

  return (
    <Spin spinning={isLoadingUserPermissions}>
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
    </Spin>
  );
};

export default PermissionManagement;
