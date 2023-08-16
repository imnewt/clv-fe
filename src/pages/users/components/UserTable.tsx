import { Popconfirm, Space, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import moment from "moment";

import User from "@/models/User";
import Role from "@/models/Role";
import { useDeleteUser, useGetAllUsers } from "@/hooks/users";

interface UserTableProps {}

const UserTable = ({}: UserTableProps) => {
  const { data, isLoading } = useGetAllUsers();

  const { deleteUser, isLoading: isDeletingUser } = useDeleteUser({
    options: {
      onSuccess: () => {
        console.log("Mutation was successful");
        // Additional actions on success
      },
      onError: (error) => {
        console.error("Mutation error:", error);
        // Additional actions on error
      },
    },
  });

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
      render: (roles) => (
        <>
          {roles.map((role: Role) => {
            return (
              <Tag color="geekblue" key={role.id}>
                {role.name.toUpperCase()}
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
      title: "Action",
      key: "action",
      dataIndex: "id",
      render: (id) => (
        <Space>
          <EditOutlined
            className="hover:text-primary mr-2"
            onClick={() => {}}
          />
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => deleteUser({ userId: id })}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined className="hover:text-primary" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={isLoading}
      rowKey={(user) => user.id}
    />
  );
};

export default UserTable;
