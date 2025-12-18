"use client";
import { Dropdown, MenuProps, Popconfirm } from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface ActionMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
  deleteConfirmTitle?: string;
  deleteConfirmDescription?: string;
}

const ActionMenu = ({
  onEdit,
  onDelete,
  deleteConfirmTitle = "Xóa người dùng",
  deleteConfirmDescription = "Bạn có chắc chắn muốn xóa?",
}: ActionMenuProps) => {
  const items: MenuProps["items"] = [
    {
      key: "edit",
      label: "Chỉnh sửa",
      icon: <EditOutlined />,
      onClick: onEdit,
    },
    {
      key: "delete",
      label: (
        <Popconfirm
          title={deleteConfirmTitle}
          description={deleteConfirmDescription}
          onConfirm={onDelete}
          okText="Có"
          cancelText="Không"
        >
          <span>Xóa</span>
        </Popconfirm>
      ),
      icon: <DeleteOutlined />,
      danger: true,
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
      <MoreOutlined
        style={{
          fontSize: 20,
          cursor: "pointer",
          padding: 4,
        }}
      />
    </Dropdown>
  );
};

export default ActionMenu;
