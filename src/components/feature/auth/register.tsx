"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  notification,
  Typography,
} from "antd";
import Link from "next/link";
import { sendRequest } from "@/utils/api";
import { useRouter } from "next/navigation";
import { IBackendRes } from "@/types/backend";
const { Title } = Typography;
const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const onFinish = async (values: any) => {
    setLoading(true);
    const res = await sendRequest<IBackendRes<any>>({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`,
      body: {
        email: values.email,
        name: values.name,
        password: values.password,
      },
    });

    if (res?.data) {
      router.push(`/auth/verify/${res?.data?._id}`);
      setLoading(false);
    
    } else {
      setLoading(false);
      notification.error({
        message: "Đăng nhập thất bại",
        description: res?.message,
      });
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", padding: "20px" }}>
      <Card>
        <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
          Đăng ký
        </Title>
        <Form
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Hãy nhập email!",
              },
            ]}
          >
            <Input placeholder="Email " />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Hãy nhập mật khẩu!",
              },
              {
                min: 6,
                message: "Mật khẩu phải dài hơn 6 ký tự",
              },
            ]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Xác nhận mật khẩu" />
          </Form.Item>

          <Form.Item label="Tên người dùng" name="name">
            <Input placeholder="Tên người dùng" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
        <Divider />
        <div style={{ textAlign: "center" }}>
          Đã có tài khoản? <Link href={"/auth/login"}>Đăng nhập</Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;
