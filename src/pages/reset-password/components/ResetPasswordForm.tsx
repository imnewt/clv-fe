import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Input, Typography } from "antd";
import { useForm, useWatch } from "antd/lib/form/Form";
import { LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

import { brandColor } from "@/utils/constants";
import { useResetPassword } from "@/hooks/auth";

const ResetPasswordForm = () => {
  const [form] = useForm();
  const router = useRouter();

  const [resetToken, setResetToken] = useState<string>("");

  const passwordWatch = useWatch("password", form);

  const handleResetPasswordSuccess = () => {
    router.push("/login");
  };

  const { resetPassword, isResetingPassword } = useResetPassword({
    onSuccess: handleResetPasswordSuccess,
  });

  useEffect(() => {
    const { query } = router;
    const { resetToken } = query;
    if (resetToken) {
      setResetToken(resetToken as string);
      router.replace({
        pathname: "/reset-password",
        query: {},
      });
    }
  }, [router]);

  const handleSubmit = useCallback(async () => {
    if (isResetingPassword) return;
    const [values] = await Promise.all([form.validateFields()]);
    const { password } = values;
    resetPassword({ resetToken, newPassword: password });
  }, [form, resetToken, isResetingPassword, resetPassword]);

  return (
    <div className="flex justify-center items-center w-4/12 p-16">
      <div className="flex flex-col items-center w-full">
        <Typography.Text
          className="!text-2xl font-bold mb-8"
          style={{ color: brandColor }}
        >
          Reset Password
        </Typography.Text>
        <Form form={form} layout="vertical" className="w-full">
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Password is required!" },
              {
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message:
                  "Password must be at least 8 characters long and contain at least one letter and one number!",
                validateTrigger: "onSubmit",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              className="!p-2"
            />
          </Form.Item>

          <Form.Item
            label="Confirm password"
            name="confirmPassword"
            rules={[
              { required: true, message: "Password is required!" },
              {
                validator: (_noop, value) => {
                  return value === passwordWatch
                    ? Promise.resolve()
                    : Promise.reject("Passwords do not match!");
                },
              },
            ]}
            className="m-0"
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              className="!p-2"
            />
          </Form.Item>
        </Form>

        <Button
          className="w-full !rounded-lg mt-6 !text-white"
          style={{ background: brandColor, height: "2.75rem" }}
          loading={isResetingPassword}
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

export default ResetPasswordForm;
