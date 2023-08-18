import { useState, useMemo } from "react";
import { Typography, Button, TablePaginationConfig } from "antd";

import { useGetAllUsers } from "@/hooks/users";
import UserTable from "./components/UserTable";
import CreateUpdateUserModal from "./components/CreateUpdateUserModal";
import { SearchBar } from "@/components";
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGINATION,
} from "@/utils/constants";

const UserManagement = () => {
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

  const tablePagination = useMemo(() => {
    return { ...pagination, total };
  }, [pagination, total]);

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
    <div>
      <Typography.Title level={3}>User Management</Typography.Title>
      <div className="flex">
        <SearchBar
          placeholder="Search by username, email"
          onSetSearchTerm={setSearchTerm}
        />
        <Button
          className="bg-blue-500 !text-white ml-2"
          onClick={handleOpenModal}
        >
          Create New
        </Button>
      </div>
      <div className="mt-4">
        <UserTable
          data={users}
          isLoading={isLoadingUsers}
          pagination={tablePagination}
          onSetPagination={setPagination}
          onEditButtonClick={handleEditButtonClick}
        />
      </div>
      <CreateUpdateUserModal
        userId={selectedUserId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default UserManagement;
