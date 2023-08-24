import { useState, useMemo, useEffect } from "react";
import { Typography, Button, TablePaginationConfig, Spin } from "antd";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";

import VesselTable from "./components/VesselTable";
// import CreateUpdateUserModal from "./components/CreateUpdateUserModal";
import { SearchBar } from "@/components";
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGINATION,
  PERMISSION,
} from "@/utils/constants";
import { getCurrentUser } from "@/utils/functions";
import { useGetUserPermissions } from "@/hooks/permissions";
import { useGetAllVessels } from "@/hooks/vessels";

const VesselManagement = () => {
  const router = useRouter();
  const currentUserId = getCurrentUser();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pagination, setPagination] =
    useState<TablePaginationConfig>(DEFAULT_PAGINATION);

  const {
    vessels = [],
    total,
    isLoadingVessels,
  } = useGetAllVessels({
    searchTerm,
    pageNumber: pagination.current || DEFAULT_PAGE_NUMBER,
    pageSize: pagination.pageSize || DEFAULT_PAGE_SIZE,
  });
  console.log("vessels", vessels);
  const { userPermissions, isLoadingUserPermissions } =
    useGetUserPermissions(currentUserId);

  const haveReadVesselPermission = useMemo(
    () => userPermissions.includes(PERMISSION.READ_VESSEL),
    [userPermissions]
  );
  const haveCreateVesselPermission = useMemo(
    () => userPermissions.includes(PERMISSION.CREATE_VESSEL),
    [userPermissions]
  );
  const haveUpdateVesselPermission = useMemo(
    () => userPermissions.includes(PERMISSION.UPDATE_VESSEL),
    [userPermissions]
  );
  const haveDeleteVesselPermission = useMemo(
    () => userPermissions.includes(PERMISSION.DELETE_VESSEL),
    [userPermissions]
  );

  const tablePagination = useMemo(() => {
    return { ...pagination, total };
  }, [pagination, total]);

  useEffect(() => {
    if (
      router.pathname === "/vessels" &&
      !isEmpty(userPermissions) &&
      !haveReadVesselPermission
    ) {
      router.push("/not-found");
    }
  }, [router, userPermissions, haveReadVesselPermission]);

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
      <Typography.Title level={3}>Vessel Management</Typography.Title>
      <div className="flex">
        <div className="w-64">
          <SearchBar
            placeholder="Search by vessel name"
            onSetSearchTerm={setSearchTerm}
          />
        </div>
        {haveCreateVesselPermission && (
          <Button
            className="bg-blue-500 !text-white ml-2"
            onClick={handleOpenModal}
          >
            Create New
          </Button>
        )}
      </div>
      <div className="mt-4">
        <VesselTable
          data={vessels}
          isLoading={isLoadingVessels}
          pagination={tablePagination}
          canUpdate={haveUpdateVesselPermission}
          canDelete={haveDeleteVesselPermission}
          onSetPagination={setPagination}
          onEditButtonClick={handleEditButtonClick}
        />
      </div>
      {/* <CreateUpdateUserModal
        userId={selectedUserId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      /> */}
    </Spin>
  );
};

export default VesselManagement;
