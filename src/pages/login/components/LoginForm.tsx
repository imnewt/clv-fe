import React, { useCallback } from "react";
import { Form, Input, Typography, Checkbox, notification } from "antd";
import { useForm, useWatch } from "antd/lib/form/Form";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Image from "next/image";
import classnames from "classnames";
import { get } from "lodash";

import GoogleLogo from "public/images/google-logo.png";
import { ACCESS_TOKEN, brandColor } from "@/utils/constants";
import { login, loginWithGoogle } from "@/apis/user";

const Context = React.createContext({ name: "Default" });

const LoginForm = () => {
  const [form] = useForm();
  const router = useRouter();

  const [notificationApi, contextHolder] = notification.useNotification();

  const isRememberWatch = useWatch("isRemember", form);

  const handleRememberCheckboxClick = useCallback(() => {
    form.setFieldsValue({ isRemember: !isRememberWatch });
  }, [form, isRememberWatch]);

  const handleLoginSuccess = () => {
    notificationApi.success({
      message: `Login Success!`,
    });
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  const { mutate: mutateLogin, isLoading } = useMutation(login, {
    onSuccess: (data) => {
      const { access_token } = data;
      localStorage.setItem(ACCESS_TOKEN, access_token);
      handleLoginSuccess();
    },
    onError: (err: Error) => {
      const errorMessage = get(err, "response.data.message");
      notificationApi.error({
        message: `Login Failed!`,
        description: <Context.Consumer>{() => errorMessage}</Context.Consumer>,
      });
    },
  });

  const { mutate: mutateLoginWithGoogle } = useMutation(loginWithGoogle, {
    onSuccess: handleLoginSuccess,
    onError: (err: Error) => {
      const errorMessage = get(err, "response.data.message");
      notificationApi.error({
        message: `Login Failed!`,
        description: <Context.Consumer>{() => errorMessage}</Context.Consumer>,
      });
    },
  });

  const handleSubmit = useCallback(async () => {
    if (isLoading) return;
    const [values] = await Promise.all([form.validateFields()]);
    const { email, password } = values;
    mutateLogin({
      email,
      password,
    });
  }, [form, isLoading, mutateLogin]);

  return (
    <>
      {contextHolder}
      <div className="flex flex-col justify-center items-center w-4/12 p-16">
        <Typography.Text className="text-2xl font-bold mb-16">
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
              prefix={<UserOutlined className="site-form-item-icon" />}
              className="p-2"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Password is required!" },
              //   {
              //     pattern:
              //       /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g,
              //     message:
              //       "Password must be at least 8 characters long and contain at least one letter, one number, and one special character!",
              //     validateTrigger: "onSubmit",
              //   },
            ]}
            className="m-0"
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              className="p-2"
            />
          </Form.Item>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center">
              <Form.Item
                name="isRemember"
                valuePropName="checked"
                className="m-0"
              >
                <Checkbox />
              </Form.Item>
              <Typography.Text
                className="text-gray-500 cursor-pointer ml-1"
                onClick={handleRememberCheckboxClick}
              >
                Remember Me
              </Typography.Text>
            </div>
            <Typography.Text className="font-bold text-primary cursor-pointer">
              Forgot Password?
            </Typography.Text>
          </div>
        </Form>

        <div
          className={classnames(
            "w-full text-center rounded-lg px-8 py-2 mt-8 cursor-pointer",
            { "opacity-50": isLoading, "cursor-not-allowed": isLoading }
          )}
          style={{ background: brandColor }}
          onClick={handleSubmit}
        >
          <Typography.Text className="font-bold uppercase text-white">
            Login
          </Typography.Text>
        </div>

        <Typography.Text className="text-gray-400 mt-8">
          or login with
        </Typography.Text>
        <div
          className="rounded-full mt-2 border p-2 shadow-md cursor-pointer"
          onClick={() => mutateLoginWithGoogle()}
        >
          <Image src={GoogleLogo} alt="google logo" className="w-4 h-4" />
        </div>

        <div className="mt-16">
          <Typography.Text className="text-gray-400">
            Don&apos;t have a account yet?
          </Typography.Text>
          <Typography.Text className="text-xs font-bold text-primary cursor-pointer ml-1">
            Sign Up
          </Typography.Text>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
