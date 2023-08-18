import { useState } from "react";
import { Typography, Button } from "antd";

import { useGetAllUsers } from "@/hooks/users";
import UserTable from "./components/UserTable";
import CreateUpdateUserModal from "./components/CreateUpdateUserModal";
import SearchBar from "./components/SearchBar";

const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { users = [], isLoadingUsers } = useGetAllUsers({ searchTerm });

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
        <SearchBar onSetSearchTerm={setSearchTerm} />
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
