import { Dispatch, SetStateAction } from "react";
import { Table, Tag } from "antd";
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
      render: (name, permission) => (
        <Tag key={permission.id} color="green">
          {name}
        </Tag>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={isLoading}
      pagination={pagination}
      onChange={onSetPagination}
      rowKey={(permission) => permission.id}
      bordered
    />
  );
};

export default PermissionTable;
