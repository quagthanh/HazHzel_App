"use client";
import { useHasMounted } from "@/utils/customHook";
import { Input, Modal, Steps, Form, Button, notification, Result } from "antd";
import {
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { sendRequest } from "@/utils/api";
import { IBackendRes } from "@/types/backend";

export default function ModalReactive(props: any) {
  const { isModalOpen, setIsModalOpen, userEmail } = props;
  const [current, setCurrent] = useState(0);
  const [userId, setUserId] = useState<string | null>("");
  const [form] = Form.useForm();
  useEffect(() => {
    if (userEmail) {
      form.setFieldValue("email", userEmail);
    }
  }, [userEmail]);

  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return <></>;
  }
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinishStep0 = async (value: any) => {
    const { email } = value;
    const res = await sendRequest<IBackendRes<any>>({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/retry-active`,
      body: {
        email,
      },
    });
    if (res?.data) {
      setUserId(res?.data?._id);
      setCurrent(1);
    } else {
      notification.error({
        message: res.message,
        description: "Lỗi khi xác nhận code xác nhận lại",
      });
    }
  };

  const onFinishStep1 = async (value: any) => {
    const { code } = value;
    const res = await sendRequest<IBackendRes<any>>({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/check-code`,
      body: {
        _id: userId,
        code: code,
      },
    });
    if (res?.data) {
      setCurrent(2);
    } else {
      notification.error({
        message: res.message,
        description: "Lỗi khi gửi code xác nhận lại",
      });
    }
    return res;
  };
  return (
    <Modal
      title="Kích hoạt lại tài khoản"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={true}
    >
      <Steps
        current={current}
        items={[
          {
            title: "Login",
            icon: <UserOutlined />,
          },
          {
            title: "Verification",
            icon: <SolutionOutlined />,
          },

          {
            title: "Done",
            icon: <SmileOutlined />,
          },
        ]}
      />
      {current == 0 && (
        <>
          {" "}
          <div style={{ margin: "20px 0" }}>
            <p>Tài khoản của bạn chưa được kích hoạt!</p>
          </div>
          <Form
            name="Verify"
            onFinish={onFinishStep0}
            autoComplete="off"
            layout="vertical"
            form={form}
          >
            <Form.Item name="email">
              <Input disabled value={userEmail} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Gửi lại mã
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
      {current === 1 && (
        <>
          {" "}
          <div style={{ margin: "20px 0" }}>
            <p>Hãy nhập mã kích hoạt lại!</p>
          </div>
          <Form
            name="Verif2"
            onFinish={onFinishStep1}
            autoComplete="off"
            layout="vertical"
            form={form}
          >
            <Form.Item label="Code" name="code" rules={[{ required: true }]}>
              <Input></Input>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
      {current === 2 && (
        <>
          {" "}
          <div style={{ margin: "20px 0" }}>
            <Result
              status="success"
              title="Tài khoản của bạn đã được kích hoạt thành công"
              subTitle="Bạn có thể quay lại đăng nhập"
              extra={[
                <Button type="primary" onClick={handleOk} key="">
                  Quay lại
                </Button>,
              ]}
            />
          </div>
        </>
      )}
    </Modal>
  );
}
