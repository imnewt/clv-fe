import { Dispatch, SetStateAction } from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

import Permission from "@/models/Permission";
import { TablePaginationConfig } from "antd/lib/table";

interface PermissionTableProps {
  data: Permission[];
  isLoading: boolean;
  pagination: TablePaginationConfig;
  onSetPagination: Dispatch<SetStateAction<TablePaginationConfig>>;
}

const PermissionTable = ({
  data,
  isLoading,
  pagination,
  onSetPagination,
}: PermissionTableProps) => {
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
        pagination={pagination}
        onChange={onSetPagination}
        rowKey={(permission) => permission.id}
      />
    </>
  );
};

export default PermissionTable;
