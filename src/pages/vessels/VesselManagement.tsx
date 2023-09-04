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

  const haveReadVesselPermission = useMemo(
    () => currentUser.permissions.includes(PERMISSION.READ_VESSEL),
    [currentUser.permissions]
  );
  const haveCreateVesselPermission = useMemo(
    () => currentUser.permissions.includes(PERMISSION.CREATE_VESSEL),
    [currentUser.permissions]
  );
  const haveUpdateVesselPermission = useMemo(
    () => currentUser.permissions.includes(PERMISSION.UPDATE_VESSEL),
    [currentUser.permissions]
  );
  const haveDeleteVesselPermission = useMemo(
    () => currentUser.permissions.includes(PERMISSION.DELETE_VESSEL),
    [currentUser.permissions]
  );

  const tablePagination = useMemo(() => {
    return { ...pagination, total };
  }, [pagination, total]);

  useEffect(() => {
    if (!isEmpty(currentUser.permissions) && !haveReadVesselPermission) {
      router.push("/404");
    }
  }, [currentUser.permissions, haveReadVesselPermission, router]);

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
