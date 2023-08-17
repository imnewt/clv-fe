import { useState } from "react";
import { Typography, Button } from "antd";

import UserTable from "./components/UserTable";
import CreateUpdateUserModal from "./components/CreateUpdateUserModal";

const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");

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
      <Button className="bg-blue-500 !text-white" onClick={handleOpenModal}>
        Create New
      </Button>
      <div className="mt-4">
        <UserTable onEditButtonClick={handleEditButtonClick} />
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
