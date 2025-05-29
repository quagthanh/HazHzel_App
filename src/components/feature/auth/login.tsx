"use client";
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
import { authenticate } from "@/utils/actions";
import { useRouter } from "next/navigation";
import ModalReactive from "./modal.reactive";
import { useState } from "react";
import ModalChangePassword from "./modal.change.password";
import { ArrowLeftOutlined } from "@ant-design/icons";
const Login = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const { Title } = Typography;
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    const { username, password } = values;
    setUserEmail("");
    const res = await authenticate(username, password);
    setLoading(false);
    if (res?.error) {
      if (res?.code == 2) {
        setIsModalOpen(true);
        setUserEmail(username);
        return;
      }
      notification.error({
        message: "Lỗi xảy ra khi đăng nhập",
        description: res?.error,
      });
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <>
      <div style={{ maxWidth: "400px", margin: "40px auto", padding: "20px" }}>
        <Card>
          <Title
            level={3}
            style={{ textAlign: "center", marginBottom: "20px" }}
          >
            Đăng nhập
          </Title>

          <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Email"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập email!",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập mật khẩu!",
                },
              ]}
            >
              <Input.Password placeholder="Mật khẩu" />
            </Form.Item>

            <Form.Item>
              <Button type="link" onClick={() => setChangePassword(true)}>
                Quên mật khẩu ?
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={loading}
              >
                Đăng nhập
              </Button>
            </Form.Item>

            <Form.Item style={{ textAlign: "center", marginBottom: 0 }}>
              Chưa có tài khoản?{" "}
              <Link href={"/auth/register"}>Đăng ký tại đây</Link>
            </Form.Item>
            <Divider />
            <Form.Item style={{ textAlign: "center" }}>
              <Link href={"/"}>
                {" "}
                <ArrowLeftOutlined /> Quay lại trang chủ
              </Link>
            </Form.Item>
          </Form>
        </Card>
      </div>

      <ModalReactive
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        userEmail={userEmail}
      />
      <ModalChangePassword
        isModalOpen={changePassword}
        setIsModalOpen={setChangePassword}
      />
    </>
  );
};

export default Login;
