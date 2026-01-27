"use client";
import { handleCreateUser } from "@/services/user.api";
import { Form, Input, message, Modal, notification, Spin } from "antd";
import { useState } from "react";
type FieldType = {
  password?: string;
};
const UserCreateModal = (props: any) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const { isUserCreateModalOpen, setIsUserCreateModalOpen } = props;
  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    form.resetFields();
    setIsUserCreateModalOpen(false);
  };
  const onFinish = async (values: any) => {
    setLoading(true);
    const res = await handleCreateUser(values);
    if (res?.data) {
      message.success({
        content: "Create user successfully",
      });
      setIsUserCreateModalOpen(false);
      setLoading(false);
      form.resetFields();
    } else {
      notification.error({
        message: "Lỗi khi tạo người dùng",
        description: res?.data.message,
      });
    }
  };
  return (
    <Modal
      maskClosable={false}
      title="Add User"
      open={isUserCreateModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      closable={false}
    >
      <Spin spinning={loading}>
        <Form
          layout="vertical"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 10 }}
          form={form}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            layout="vertical"
            label="Email"
            name="email"
            rules={[{ required: true }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            layout="vertical"
            label="Name"
            name="name"
            rules={[{ required: true }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default UserCreateModal;
