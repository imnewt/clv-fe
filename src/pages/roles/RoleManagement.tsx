import { useState, useMemo, useEffect } from "react";
import { Typography, Button, TablePaginationConfig } from "antd";
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
import { useGetAllRoles } from "@/hooks/roles";

const RoleManagement = () => {
  const router = useRouter();
  const currentUser = getCurrentUser();

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

  const haveReadRolePermission = useMemo(
    () => currentUser.permissions.includes(PERMISSION.READ_ROLE),
    [currentUser.permissions]
  );
  const haveCreateRolePermission = useMemo(
    () => currentUser.permissions.includes(PERMISSION.CREATE_ROLE),
    [currentUser.permissions]
  );
  const haveUpdateRolePermission = useMemo(
    () => currentUser.permissions.includes(PERMISSION.UPDATE_ROLE),
    [currentUser.permissions]
  );
  const haveDeleteRolePermission = useMemo(
    () => currentUser.permissions.includes(PERMISSION.DELETE_ROLE),
    [currentUser.permissions]
  );

  useEffect(() => {
    if (!isEmpty(currentUser.permissions) && !haveReadRolePermission) {
      router.push("/404");
    }
  }, [currentUser.permissions, haveReadRolePermission, router]);

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
    <>
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
    </>
  ) : (
    <></>
  );
};

export default RoleManagement;
