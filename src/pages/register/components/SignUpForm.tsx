import React, { useCallback } from "react";
import { Form, Input, Typography, notification } from "antd";
import { useForm, useWatch } from "antd/lib/form/Form";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import classnames from "classnames";
import { get } from "lodash";

import { brandColor } from "@/utils/constants";
import { register } from "@/apis/auth";

const Context = React.createContext({ name: "Default" });

const SignUpForm = () => {
  const [form] = useForm();
  const router = useRouter();

  const [notificationApi, contextHolder] = notification.useNotification();

  const passwordWatch = useWatch("password", form);

  const handleSignUpSuccess = () => {
    notificationApi.success({
      message: "Sign Up Success!",
      description: "Please log in to start using our application.",
    });
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };

  const handleSignUpFail = useCallback(
    (errorMessage: string) => {
      notificationApi.error({
        message: `Sign Up Failed!`,
        description: <Context.Consumer>{() => errorMessage}</Context.Consumer>,
      });
    },
    [notificationApi]
  );

  const { mutate: mutateSignUp, isLoading } = useMutation(register, {
    onSuccess: () => {
      handleSignUpSuccess();
    },
    onError: (err: Error) => {
      const errorMessage = get(err, "response.data.message") || "";
      handleSignUpFail(errorMessage);
    },
  });

  const handleSubmit = useCallback(async () => {
    if (isLoading) return;
    const [values] = await Promise.all([form.validateFields()]);
    const { email, userName, password } = values;
    mutateSignUp({
      email,
      userName,
      password,
    });
  }, [form, isLoading, mutateSignUp]);

  const handleNavigateToLoginPage = useCallback(() => {
    router.push("/login");
  }, [router]);

  return (
    <>
      {contextHolder}
      <div className="flex flex-col justify-center items-center w-4/12 px-16 py-8">
        <Typography.Text className="text-2xl font-bold mb-8">
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
              className="p-2"
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
              className="p-2"
            />
          </Form.Item>
        </Form>

        <div
          className={classnames(
            "w-full text-center rounded-lg px-8 py-2 mt-6 cursor-pointer",
            { "opacity-50": isLoading, "cursor-not-allowed": isLoading }
          )}
          style={{ background: brandColor }}
          onClick={handleSubmit}
        >
          <Typography.Text className="font-bold uppercase text-white">
            Sign Up
          </Typography.Text>
        </div>

        <div className="mt-6">
          <Typography.Text className="text-gray-400">
            Already have an account?
          </Typography.Text>
          <Typography.Text
            className="font-bold text-primary cursor-pointer ml-1"
            onClick={handleNavigateToLoginPage}
          >
            Log In
          </Typography.Text>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
