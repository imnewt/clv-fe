import { Dispatch, SetStateAction } from "react";
import { Popconfirm, Space, Table, Tag, TablePaginationConfig } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import moment from "moment";

import { useDeleteRole } from "@/hooks/roles";
import { ADMIN_ROLE_ID, USER_ROLE_ID } from "@/utils/constants";
import Role from "@/models/Role";
import Permission from "@/models/Permission";

interface RoleTableProps {
  data: Role[];
  isLoading: boolean;
  pagination: TablePaginationConfig;
  onSetPagination: Dispatch<SetStateAction<TablePaginationConfig>>;
  onEditButtonClick: (userId: string) => void;
}

const RoleTable = ({
  data,
  isLoading,
  pagination,
  onSetPagination,
  onEditButtonClick,
}: RoleTableProps) => {
  const { deleteRole } = useDeleteRole({});

  const columns: ColumnsType<Role> = [
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
    {
      title: "Permissions",
      key: "permissions",
      dataIndex: "permissions",
      width: "20rem",
      render: (permissions) => (
        <>
          {permissions.map((permission: Permission) => {
            return (
              <Tag key={permission.id} color="green" className="my-1">
                {permission.name}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Created At",
      key: "createdAt",
      dataIndex: "createdAt",
      render: (createdAt) => moment(createdAt).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Last Updated At",
      key: "updatedAt",
      dataIndex: "updatedAt",
      render: (updatedAt) => moment(updatedAt).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "id",
      align: "center",
      render: (roleId) =>
        [ADMIN_ROLE_ID, USER_ROLE_ID].includes(roleId) ? (
          <Space>
            <EditOutlined className="!text-gray-300 !cursor-not-allowed mr-2" />
            <DeleteOutlined className="!text-gray-300 !cursor-not-allowed" />
          </Space>
        ) : (
          <Space>
            <EditOutlined
              className="hover:text-primary mr-2"
              onClick={() => onEditButtonClick(roleId)}
            />
            <Popconfirm
              title="Are you sure you want to delete this role?"
              onConfirm={() => deleteRole({ roleId })}
              okText="Yes"
              cancelText="No"
              okType="danger"
            >
              <DeleteOutlined className="!hover:text-primary" />
            </Popconfirm>
          </Space>
        ),
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
        rowKey={(role) => role.id}
      />
    </>
  );
};

export default RoleTable;
