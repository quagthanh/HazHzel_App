"use client";
import { handleEditUser } from "@/services/user.api";
import { Col, Form, Input, message, Modal, notification, Row } from "antd";
import { useEffect } from "react";

const UserEditModal = (props: any) => {
  const {
    isUserEditModalOpen,
    setIsUserEditModalOpen,
    dataUpdate,
    setDataUpdate,
  } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        name: dataUpdate.name,
        email: dataUpdate.email,
        phone: dataUpdate.phone,
        address: dataUpdate.address,
      });
    }
  }, [dataUpdate]);
  const handleCloseUpdateModal = () => {
    form.resetFields();
    setIsUserEditModalOpen(false);
    setDataUpdate(null);
  };

  const onFinish = async (values: any) => {
    if (dataUpdate) {
      const { name, phone, address } = values;
      const res = await handleEditUser({
        _id: dataUpdate._id,
        name,
        phone,
        address,
      });
      if (res?.data) {
        handleCloseUpdateModal();
        message.success("Cập nhật thành công");
      } else {
        notification.error({
          message: "Cập nhật thất bại",
          description: res?.message,
        });
      }
    }
  };

  return (
    <Modal
      maskClosable={false}
      title="Edit User"
      open={isUserEditModalOpen}
      onOk={() => form.submit()}
      closable={false}
    >
      <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
        <Row gutter={[15, 15]}>
          <Col span={24} md={12}>
            <Form.Item label="Email" name="email">
              <Input type="email" disabled />
            </Form.Item>
          </Col>

          <Col span={24} md={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item label="Phone" name="phone">
              <Input />
            </Form.Item>
          </Col>

          <Col span={24} md={12}>
            <Form.Item label="Address" name="address">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UserEditModal;
