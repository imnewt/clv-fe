import React, { useCallback } from "react";
import { Form, Input, Typography, Checkbox, notification } from "antd";
import { useForm, useWatch } from "antd/lib/form/Form";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import classnames from "classnames";
import { get } from "lodash";

import { ACCESS_TOKEN_KEY, brandColor } from "@/utils/constants";
import { login } from "@/apis/auth";
import { GoogleButton } from "@/components";

const Context = React.createContext({ name: "Default" });

const LoginForm = () => {
  const [form] = useForm();
  const router = useRouter();

  const [notificationApi, contextHolder] = notification.useNotification();

  const isRememberWatch = useWatch("isRemember", form);

  const handleRememberCheckboxClick = useCallback(() => {
    form.setFieldsValue({ isRemember: !isRememberWatch });
  }, [form, isRememberWatch]);

  const handleLoginSuccess = useCallback(() => {
    notificationApi.success({
      message: `Login Success!`,
    });
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  }, [notificationApi, router]);

  const handleLoginFail = useCallback(
    (errorMessage: string) => {
      notificationApi.error({
        message: `Login Failed!`,
        description: <Context.Consumer>{() => errorMessage}</Context.Consumer>,
      });
    },
    [notificationApi]
  );

  const { mutate: mutateLogin, isLoading } = useMutation(login, {
    onSuccess: (data) => {
      const { access_token } = data;
      localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
      handleLoginSuccess();
    },
    onError: (err: Error) => {
      const errorMessage = get(err, "response.data.message") || "";
      handleLoginFail(errorMessage);
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

  const handleNavigateToSignUpPage = useCallback(() => {
    router.push("/register");
  }, [router]);

  return (
    <>
      {contextHolder}
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
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center">
                <Form.Item
                  name="isRemember"
                  valuePropName="checked"
                  className="!m-0"
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
              <Typography.Text
                className="font-bold cursor-pointer"
                style={{ color: brandColor }}
              >
                Forgot Password?
              </Typography.Text>
            </div>
          </Form>

          <div
            className={classnames(
              "w-full text-center rounded-lg px-8 py-2 mt-6 cursor-pointer",
              { "opacity-50": isLoading, "cursor-not-allowed": isLoading }
            )}
            style={{ background: brandColor }}
            onClick={handleSubmit}
          >
            <Typography.Text className="font-bold uppercase !text-white">
              Login
            </Typography.Text>
          </div>

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
    </>
  );
};

export default LoginForm;
