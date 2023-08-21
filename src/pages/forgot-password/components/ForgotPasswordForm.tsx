import React, { useCallback } from "react";
import { Button, Form, Input, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import { MailOutlined } from "@ant-design/icons";

import { brandColor } from "@/utils/constants";
import { useSendResetPasswordRequest } from "@/hooks/auth";

const ForgotPasswordForm = () => {
  const [form] = useForm();

  const { sendResetPasswordRequest, isSendingResetPasswordRequest } =
    useSendResetPasswordRequest({});

  const handleSubmit = useCallback(async () => {
    if (isSendingResetPasswordRequest) return;
    const [values] = await Promise.all([form.validateFields()]);
    const { email } = values;
    sendResetPasswordRequest(email);
  }, [form, isSendingResetPasswordRequest, sendResetPasswordRequest]);

  return (
    <div className="flex justify-center items-center w-4/12 p-16">
      <div className="flex flex-col items-center w-full">
        <Typography.Text
          className="!text-2xl font-bold mb-8"
          style={{ color: brandColor }}
        >
          Forgot Your Password?
        </Typography.Text>
        <Form form={form} layout="vertical" className="w-full">
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
              className="!p-2"
            />
          </Form.Item>
        </Form>

        <Button
          className="w-full !rounded-lg mt-6 !text-white"
          style={{ background: brandColor, height: "2.75rem" }}
          loading={isSendingResetPasswordRequest}
          onClick={handleSubmit}
        >
          <Typography.Text className="font-bold uppercase !text-white">
            Reset Password
          </Typography.Text>
        </Button>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
