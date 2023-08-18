import { useState, useMemo } from "react";
import { Typography, Button, TablePaginationConfig } from "antd";

import { useGetAllRoles } from "@/hooks/roles";
import RoleTable from "./components/RoleTable";
import CreateUpdateRoleModal from "./components/CreateUpdateRoleModal";
import { SearchBar } from "@/components";
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGINATION,
} from "@/utils/constants";

const RoleManagement = () => {
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
          pagination={tablePagination}
          onSetPagination={setPagination}
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
