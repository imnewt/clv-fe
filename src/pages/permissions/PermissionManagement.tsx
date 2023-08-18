import { useState } from "react";
import { Typography } from "antd";

import { useGetAllPermissions } from "@/hooks/permissions";
import PermissionTable from "./components/PermissionTable";
import { SearchBar } from "@/components";

const PermissionManagement = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { permissions = [], isLoadingPermissions } = useGetAllPermissions({
    searchTerm,
  });

  return (
    <div>
      <Typography.Title level={3}>Permission Management</Typography.Title>
      <SearchBar
        placeholder="Search by permission name"
        onSetSearchTerm={setSearchTerm}
      />
      <div className="mt-4">
        <PermissionTable data={permissions} isLoading={isLoadingPermissions} />
      </div>
    </div>
  );
};

export default PermissionManagement;
