import { useState, useMemo, useEffect } from "react";
import { Typography, Button, TablePaginationConfig, Spin } from "antd";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";

import UserTable from "./components/UserTable";
import CreateUpdateUserModal from "./components/CreateUpdateUserModal";
import { SearchBar } from "@/components";
import {
  CREATE_USER,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGINATION,
  DELETE_USER,
  READ_USER,
  UPDATE_USER,
} from "@/utils/constants";
import { getCurrentUser } from "@/utils/functions";
import { useGetUserPermissions } from "@/hooks/permissions";
import { useGetAllUsers } from "@/hooks/users";

const UserManagement = () => {
  const router = useRouter();
  const currentUserId = getCurrentUser();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pagination, setPagination] =
    useState<TablePaginationConfig>(DEFAULT_PAGINATION);

  const {
    users = [],
    total,
    isLoadingUsers,
  } = useGetAllUsers({
    searchTerm,
    pageNumber: pagination.current || DEFAULT_PAGE_NUMBER,
    pageSize: pagination.pageSize || DEFAULT_PAGE_SIZE,
  });
  const { userPermissions, isLoadingUserPermissions } =
    useGetUserPermissions(currentUserId);

  const haveReadUserPermission = useMemo(
    () => userPermissions.includes(READ_USER),
    [userPermissions]
  );
  const haveCreateUserPermission = useMemo(
    () => userPermissions.includes(CREATE_USER),
    [userPermissions]
  );
  const haveUpdateUserPermission = useMemo(
    () => userPermissions.includes(UPDATE_USER),
    [userPermissions]
  );
  const haveDeleteUserPermission = useMemo(
    () => userPermissions.includes(DELETE_USER),
    [userPermissions]
  );

  const tablePagination = useMemo(() => {
    return { ...pagination, total };
  }, [pagination, total]);

  useEffect(() => {
    if (
      router.pathname === "/users" &&
      !isEmpty(userPermissions) &&
      !haveReadUserPermission
    ) {
      router.push("/not-found");
    }
  }, [router, userPermissions, haveReadUserPermission]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleEditButtonClick = (userId: string) => {
    setSelectedUserId(userId);
    handleOpenModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserId("");
  };

  return (
    <Spin spinning={isLoadingUserPermissions}>
      <Typography.Title level={3}>User Management</Typography.Title>
      <div className="flex">
        <div className="w-64">
          <SearchBar
            placeholder="Search by username, email"
            onSetSearchTerm={setSearchTerm}
          />
        </div>
        {haveCreateUserPermission && (
          <Button
            className="bg-blue-500 !text-white ml-2"
            onClick={handleOpenModal}
          >
            Create New
          </Button>
        )}
      </div>
      <div className="mt-4">
        <UserTable
          data={users}
          isLoading={isLoadingUsers}
          pagination={tablePagination}
          canUpdate={haveUpdateUserPermission}
          canDelete={haveDeleteUserPermission}
          onSetPagination={setPagination}
          onEditButtonClick={handleEditButtonClick}
        />
      </div>
      <CreateUpdateUserModal
        userId={selectedUserId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </Spin>
  );
};

export default UserManagement;
