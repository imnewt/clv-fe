import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

import Permission from "@/models/Permission";

interface PermissionTableProps {
  data: Permission[];
  isLoading: boolean;
}

const PermissionTable = ({ data, isLoading }: PermissionTableProps) => {
  const columns: ColumnsType<Permission> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        rowKey={(permission) => permission.id}
      />
    </>
  );
};

export default PermissionTable;
