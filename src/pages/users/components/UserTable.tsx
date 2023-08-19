import { Dispatch, SetStateAction } from "react";
import { Popconfirm, Space, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import moment from "moment";

import User from "@/models/User";
import Role from "@/models/Role";
import { useDeleteUser } from "@/hooks/users";

interface UserTableProps {
  data: User[];
  isLoading: boolean;
  pagination: TablePaginationConfig;
  onSetPagination: Dispatch<SetStateAction<TablePaginationConfig>>;
  onEditButtonClick: (userId: string) => void;
}

const UserTable = ({
  data,
  isLoading,
  pagination,
  onSetPagination,
  onEditButtonClick,
}: UserTableProps) => {
  const { deleteUser } = useDeleteUser({});

  const columns: ColumnsType<User> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Username",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Roles",
      key: "roles",
      dataIndex: "roles",
      width: "20rem",
      render: (roles) => (
        <>
          {roles.map((role: Role) => {
            return (
              <Tag color="geekblue" key={role.id} className="my-1">
                {role.name}
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
      render: (id) => (
        <Space>
          <EditOutlined
            className="hover:text-primary mr-2"
            onClick={() => onEditButtonClick(id)}
          />
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => deleteUser({ userId: id })}
            okText="Yes"
            cancelText="No"
            okType="danger"
          >
            <DeleteOutlined className="hover:text-primary" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table<User>
        columns={columns}
        dataSource={data}
        pagination={pagination}
        onChange={onSetPagination}
        loading={isLoading}
        rowKey={(user) => user.id}
      />
    </>
  );
};

export default UserTable;
