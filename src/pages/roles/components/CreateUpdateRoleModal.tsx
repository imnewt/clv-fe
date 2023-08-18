import { useEffect, useCallback, useMemo } from "react";
import { Modal, Form, Input, Spin, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { UserOutlined } from "@ant-design/icons";

import { useGetRoleDetail, useUpdateRole, useCreateRole } from "@/hooks/roles";
import { useGetAllPermissions } from "@/hooks/permissions";

interface CreateUpdateRoleModalProps {
  roleId: string;
  isOpen: boolean;
  onClose: () => void;
}

const CreateUpdateUserModal = ({
  roleId,
  isOpen,
  onClose,
}: CreateUpdateRoleModalProps) => {
  const [form] = useForm();

  const { role, isLoadingRoleDetail } = useGetRoleDetail({
    roleId,
    enabled: isOpen,
  });
  const { permissions = [], isLoadingPermissions } = useGetAllPermissions({});

  const handleClose = useCallback(() => {
    form.resetFields();
    onClose();
  }, [form, onClose]);

  const isCreate = useMemo(() => !roleId, [roleId]);

  const permissionOptions = useMemo(() => {
    return (
      permissions?.map((permission) => ({
        value: permission.name,
        label: permission.name,
      })) || []
    );
  }, [permissions]);

  const { createRole, isCreatingRole } = useCreateRole({
    onSuccess: handleClose,
  });
  const { updateRole, isUpdatingRole } = useUpdateRole({
    onSuccess: handleClose,
  });

  useEffect(() => {
    if (roleId && role) {
      form.setFieldsValue({
        name: role.name,
        permissionNames: role.permissions.map((permission) => permission.name),
      });
    }
  }, [form, roleId, role]);

  const handleSubmit = useCallback(async () => {
    const [values] = await Promise.all([form.validateFields()]);
    const { name, permissionNames } = values;
    const permissionIds = permissions.reduce<string[]>(
      (ids, permission) =>
        permissionNames.includes(permission.name)
          ? [...ids, permission.id]
          : ids,
      []
    );
    if (isCreate) {
      createRole({
        name,
        permissionIds,
      });
    } else {
      updateRole({
        ...role,
        name,
        permissionIds,
      });
    }
  }, [isCreate, form, role, permissions, createRole, updateRole]);

  return (
    <Modal
      open={isOpen}
      title={isCreate ? "Create New Role" : "Update Role"}
      okText={isCreate ? "Create" : "Update"}
      okType="default"
      okButtonProps={{
        className: "bg-blue-500 !text-white",
        disabled: isCreatingRole || isUpdatingRole,
      }}
      onOk={handleSubmit}
      onCancel={handleClose}
    >
      <Spin spinning={!isCreate && isLoadingRoleDetail}>
        <Form form={form} layout="vertical" className="mt-8 w-72">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Role name is required!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              className="p-2"
            />
          </Form.Item>
          <Form.Item
            label="Permissions"
            name="permissionNames"
            rules={[
              {
                required: true,
                message: "At least 1 permission is required!",
              },
            ]}
          >
            <Select
              mode="multiple"
              className="antd-select"
              allowClear
              style={{ width: "100%" }}
              size="large"
              placeholder={
                <span className="text-sm">
                  Please select at least 1 permission
                </span>
              }
              options={permissionOptions}
              loading={isLoadingPermissions}
            />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default CreateUpdateUserModal;
