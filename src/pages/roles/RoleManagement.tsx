import { useState } from "react";
import { Typography, Button } from "antd";

import { useGetAllRoles } from "@/hooks/roles";
import RoleTable from "./components/RoleTable";
import CreateUpdateRoleModal from "./components/CreateUpdateRoleModal";
import { SearchBar } from "@/components";

const RoleManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedRoleId, setSelectedRoleId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { roles = [], isLoadingRoles } = useGetAllRoles({ searchTerm });

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

  return (
    <div>
      <Typography.Title level={3}>Role Management</Typography.Title>
      <div className="flex">
        <SearchBar
          placeholder="Search by role name"
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
        <RoleTable
          data={roles}
          isLoading={isLoadingRoles}
          onEditButtonClick={handleEditButtonClick}
        />
      </div>
      <CreateUpdateRoleModal
        roleId={selectedRoleId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default RoleManagement;
