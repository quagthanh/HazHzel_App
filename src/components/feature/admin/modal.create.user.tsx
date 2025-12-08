// "use client";
// import { handleCreateUser } from "@/services/user.api";
// import { Form, Input, message, Modal, notification } from "antd";
// type FieldType = {
//   password?: string;
// };
// const UserCreateModal = (props: any) => {
//   const [form] = Form.useForm();
//   const { isUserCreateModalOpen, setIsUserCreateModalOpen } = props;
//   const handleOk = () => {
//     form.submit();
//   };

//   const handleCancel = () => {
//     form.resetFields();
//     setIsUserCreateModalOpen(false);
//   };
//   const onFinish = async (values: any) => {
//     const res = await handleCreateUser(values);
//     if (res?.data) {
//       message.success({
//         content: "Tạo người dùng thành công",
//       });
//       setIsUserCreateModalOpen(false);
//       form.resetFields();
//     } else {
//       notification.error({
//         message: "Lỗi khi tạo người dùng",
//         description: res?.message,
//       });
//     }
//   };
//   return (
//     <Modal
//       maskClosable={false}
//       title="Add User"
//       open={isUserCreateModalOpen}
//       onOk={handleOk}
//       onCancel={handleCancel}
//       closable={false}
//     >
//       <Form
//         layout="vertical"
//         labelCol={{ span: 10 }}
//         wrapperCol={{ span: 10 }}
//         form={form}
//         onFinish={onFinish}
//         autoComplete="off"
//       >
//         <Form.Item
//           layout="vertical"
//           label="Email"
//           name="email"
//           rules={[{ required: true }]}
//           labelCol={{ span: 24 }}
//           wrapperCol={{ span: 24 }}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item<FieldType>
//           label="Password"
//           name="password"
//           labelCol={{ span: 24 }}
//           wrapperCol={{ span: 24 }}
//           rules={[{ required: true, message: "Please input your password!" }]}
//         >
//           <Input.Password />
//         </Form.Item>

//         <Form.Item
//           layout="vertical"
//           label="Name"
//           name="name"
//           rules={[{ required: true }]}
//           labelCol={{ span: 24 }}
//           wrapperCol={{ span: 24 }}
//         >
//           <Input />
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default UserCreateModal;
