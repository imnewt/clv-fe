import { useState, useMemo, useEffect } from "react";
import { Typography, Button, TablePaginationConfig, Spin } from "antd";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";

import RoleTable from "./components/RoleTable";
import CreateUpdateRoleModal from "./components/CreateUpdateRoleModal";
import { SearchBar } from "@/components";
import {
  PERMISSION,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGINATION,
} from "@/utils/constants";
import { getCurrentUser } from "@/utils/functions";
import { useGetUserPermissions } from "@/hooks/permissions";
import { useGetAllRoles } from "@/hooks/roles";

const RoleManagement = () => {
  const router = useRouter();
  const currentUserId = getCurrentUser();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedRoleId, setSelectedRoleId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pagination, setPagination] =
    useState<TablePaginationConfig>(DEFAULT_PAGINATION);

  const {
    roles = [],
    total,
    isLoadingRoles,
  } = useGetAllRoles({
    searchTerm,
    pageNumber: pagination.current || DEFAULT_PAGE_NUMBER,
    pageSize: pagination.pageSize || DEFAULT_PAGE_SIZE,
  });

  const { userPermissions, isLoadingUserPermissions } =
    useGetUserPermissions(currentUserId);

  const haveReadRolePermission = useMemo(
    () => userPermissions.includes(PERMISSION.READ_ROLE),
    [userPermissions]
  );
  const haveCreateRolePermission = useMemo(
    () => userPermissions.includes(PERMISSION.CREATE_ROLE),
    [userPermissions]
  );
  const haveUpdateRolePermission = useMemo(
    () => userPermissions.includes(PERMISSION.UPDATE_ROLE),
    [userPermissions]
  );
  const haveDeleteRolePermission = useMemo(
    () => userPermissions.includes(PERMISSION.DELETE_ROLE),
    [userPermissions]
  );

  useEffect(() => {
    if (!isEmpty(userPermissions) && !haveReadRolePermission) {
      router.push("/404");
    }
  }, [userPermissions, haveReadRolePermission, router]);

  const tablePagination = useMemo(() => {
    return { ...pagination, total };
  }, [pagination, total]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleEditButtonClick = (roleId: string): void => {
    setSelectedRoleId(roleId);
    handleOpenModal();
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setSelectedRoleId("");
  };

  return haveReadRolePermission ? (
    <Spin spinning={isLoadingUserPermissions}>
      <Typography.Title level={3}>Role Management</Typography.Title>
      <div className="flex">
        <div className="w-64">
          <SearchBar
            placeholder="Search by role name"
            onSetSearchTerm={setSearchTerm}
          />
        </div>
        {haveCreateRolePermission && (
          <Button
            className="bg-blue-500 !text-white ml-2"
            onClick={handleOpenModal}
          >
            Create New
          </Button>
        )}
      </div>
      <div className="mt-4">
        <RoleTable
          data={roles}
          isLoading={isLoadingRoles}
          pagination={tablePagination}
          canUpdate={haveUpdateRolePermission}
          canDelete={haveDeleteRolePermission}
          onSetPagination={setPagination}
          onEditButtonClick={handleEditButtonClick}
        />
      </div>
      <CreateUpdateRoleModal
        roleId={selectedRoleId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </Spin>
  ) : (
    <></>
  );
};

export default RoleManagement;
