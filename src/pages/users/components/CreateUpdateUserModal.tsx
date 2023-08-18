import { useEffect, useCallback, useMemo } from "react";
import { Typography, Modal, Form, Input, Spin, Select } from "antd";
import { useForm, useWatch } from "antd/lib/form/Form";
import { MailOutlined, UserOutlined } from "@ant-design/icons";

import { useGetUserDetail, useUpdateUser, useCreateUser } from "@/hooks/users";
import { useGetAllRoles } from "@/hooks/roles";

interface CreateUpdateUserModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

const CreateUpdateUserModal = ({
  userId,
  isOpen,
  onClose,
}: CreateUpdateUserModalProps) => {
  const [form] = useForm();
  const userNameWatch = useWatch("userName", form) || "";

  const { user, isLoadingUserDetail } = useGetUserDetail({
    userId,
    enabled: isOpen,
  });
  const { roles, isLoadingRoles } = useGetAllRoles({});

  const handleClose = useCallback(() => {
    form.resetFields();
    onClose();
  }, [form, onClose]);

  const isCreate = useMemo(() => !userId, [userId]);

  const roleOptions = useMemo(() => {
    return roles?.map((role) => ({ value: role.id, label: role.name })) || [];
  }, [roles]);

  const { createUser, isCreatingUser } = useCreateUser({
    onSuccess: handleClose,
  });
  const { updateUser, isUpdatingUser } = useUpdateUser({
    onSuccess: handleClose,
  });

  useEffect(() => {
    if (userId && user) {
      form.setFieldsValue({
        email: user.email,
        userName: user.userName,
        roleIds: user.roles.map((role) => role.id),
      });
    }
  }, [form, userId, user]);

  const handleSubmit = useCallback(async () => {
    const [values] = await Promise.all([form.validateFields()]);
    const { email, userName, roleIds } = values;
    if (isCreate) {
      createUser({
        email,
        userName,
        password: `clv-${userName}-1`,
        roleIds,
      });
    } else {
      updateUser({
        ...user,
        userName,
        roleIds,
      });
    }
  }, [isCreate, form, user, createUser, updateUser]);

  return (
    <Modal
      open={isOpen}
      title={isCreate ? "Create New User" : "Update User"}
      okText={isCreate ? "Create" : "Update"}
      okType="default"
      okButtonProps={{
        className: "bg-blue-500 !text-white",
        disabled: isCreatingUser || isUpdatingUser,
      }}
      onOk={handleSubmit}
      onCancel={handleClose}
    >
      <Spin spinning={!isCreate && isLoadingUserDetail}>
        <Form form={form} layout="vertical" className="mt-8 w-72">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required!" },
              {
                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "Invalid email!",
                validateTrigger: "onSubmit",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              disabled={!isCreate}
              className="p-2"
            />
          </Form.Item>
          <Form.Item
            label="Username"
            name="userName"
            rules={[{ required: true, message: "Username is required!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              className="p-2"
            />
          </Form.Item>
          <Form.Item
            label="Roles"
            name="roleIds"
            rules={[
              { required: true, message: "At least 1 role is required!" },
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select at least 1 role"
              options={roleOptions}
              loading={isLoadingRoles}
            />
          </Form.Item>
        </Form>
        {isCreate && (
          <div className="flex flex-col">
            <Typography.Text className="text-red-500">
              <span className="mr-1">*</span>Please notice and use below
              password for login
            </Typography.Text>
            <Typography.Text className="text-xs">
              Default password will have this format: `clv - your username - 1`
            </Typography.Text>
            <Typography.Text className="mt-4">
              <strong>Auto-generated password:</strong>{" "}
              {`clv-${userNameWatch}-1`}
            </Typography.Text>
          </div>
        )}
      </Spin>
    </Modal>
  );
};

export default CreateUpdateUserModal;
