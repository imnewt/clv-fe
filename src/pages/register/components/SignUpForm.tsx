import React, { useCallback } from "react";
import { Form, Input, Typography, Button } from "antd";
import { useForm, useWatch } from "antd/lib/form/Form";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

import { brandColor } from "@/utils/constants";
import { useRegister } from "@/hooks/auth";

const SignUpForm = () => {
  const [form] = useForm();
  const router = useRouter();

  const passwordWatch = useWatch("password", form);

  const { register, isRegistering } = useRegister({});

  const handleSubmit = useCallback(async () => {
    if (isRegistering) return;
    const [values] = await Promise.all([form.validateFields()]);
    const { email, userName, password } = values;
    register({
      email,
      userName,
      password,
    });
  }, [form, isRegistering, register]);

  const handleNavigateToLoginPage = useCallback(() => {
    router.push("/login");
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center w-4/12 px-16 py-8">
      <Typography.Text
        className="!text-2xl font-bold mb-8"
        style={{ color: brandColor }}
      >
        Sign Up
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
          label="Username"
          name="userName"
          rules={[{ required: true, message: "Username is required!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            className="!p-2"
          />
        </Form.Item>

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
        loading={isRegistering}
        onClick={handleSubmit}
      >
        <Typography.Text className="font-bold uppercase !text-white">
          Sign Up
        </Typography.Text>
      </Button>

      <div className="mt-6">
        <Typography.Text className="!text-gray-400">
          Already have an account?
        </Typography.Text>
        <Typography.Text
          className="font-bold cursor-pointer ml-1"
          style={{ color: brandColor }}
          onClick={handleNavigateToLoginPage}
        >
          Log In
        </Typography.Text>
      </div>
    </div>
  );
};

export default SignUpForm;
