import { useState, useMemo, useEffect } from "react";
import { Typography, Button, TablePaginationConfig } from "antd";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";

import VesselTable from "./components/VesselTable";
import CreateUpdateVesselModal from "./components/CreateUpdateVesselModal";
import { SearchBar } from "@/components";
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGINATION,
  PERMISSION,
} from "@/utils/constants";
import { getCurrentUser } from "@/utils/functions";
import { useGetAllVessels } from "@/hooks/vessels";

const VesselManagement = () => {
  const router = useRouter();
  const currentUser = getCurrentUser();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedVesselId, setSelectedVesselId] = useState<string>("");
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

  const userPermissions = useMemo(() => {
    return currentUser.permissions || [];
  }, [currentUser.permissions]);

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
    if (!isEmpty(userPermissions) && !haveReadVesselPermission) {
      router.push("/404");
    }
  }, [userPermissions, haveReadVesselPermission, router]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleEditButtonClick = (vesselId: string) => {
    setSelectedVesselId(vesselId);
    handleOpenModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVesselId("");
  };

  return haveReadVesselPermission ? (
    <>
      <Typography.Title level={3}>Vessel Management</Typography.Title>
      <div className="flex">
        <div className="w-64">
          <SearchBar
            placeholder="Search by vessel code"
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
      <CreateUpdateVesselModal
        vesselId={selectedVesselId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  ) : (
    <></>
  );
};

export default VesselManagement;
