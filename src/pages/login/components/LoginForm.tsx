import React, { useCallback } from "react";
import { Form, Input, Typography, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

import { brandColor } from "@/utils/constants";
import { GoogleButton } from "@/components";
import { useLogin } from "@/hooks/auth";

const LoginForm = () => {
  const [form] = useForm();
  const router = useRouter();

  const { login, isLoggingin } = useLogin({});

  const handleSubmit = useCallback(async () => {
    if (isLoggingin) return;
    const [values] = await Promise.all([form.validateFields()]);
    const { email, password } = values;
    login({
      email,
      password,
    });
  }, [form, isLoggingin, login]);

  const handleNavigateToSignUpPage = useCallback(() => {
    router.push("/register");
  }, [router]);

  const handleNavigateToForgotPasswordPage = useCallback(() => {
    router.push("/forgot-password");
  }, [router]);

  return (
    <div className="flex justify-center items-center w-4/12 p-16">
      <div className="flex flex-col items-center w-full">
        <Typography.Text
          className="!text-2xl font-bold mb-16"
          style={{ color: brandColor }}
        >
          Login
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
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password is required!" }]}
            className="m-0"
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              className="!p-2"
            />
          </Form.Item>
          <div className="flex justify-end">
            <Typography.Text
              className="font-bold cursor-pointer text-sm"
              style={{ color: brandColor }}
              onClick={handleNavigateToForgotPasswordPage}
            >
              Forgot Password?
            </Typography.Text>
          </div>
        </Form>

        <Button
          className="w-full !rounded-lg mt-6 !text-white"
          style={{ background: brandColor, height: "2.75rem" }}
          loading={isLoggingin}
          onClick={handleSubmit}
        >
          <Typography.Text className="font-bold uppercase !text-white">
            Login
          </Typography.Text>
        </Button>

        <GoogleButton type="login" />

        <div className="mt-6" style={{ flexGrow: 1 }}>
          <Typography.Text className="!text-gray-400">
            Don&apos;t have an account yet?
          </Typography.Text>
          <Typography.Text
            className="font-bold cursor-pointer ml-1"
            style={{ color: brandColor }}
            onClick={handleNavigateToSignUpPage}
          >
            Sign Up
          </Typography.Text>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
