"use client";

import { IProps, IUserTable } from "@/types/backend";
import { Button, Table, TableProps, Popconfirm, message } from "antd";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { useState } from "react";
import UserCreateModal from "./modal.create.user";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import UserEditModal from "./modal.edit.user";
// import { handleDeleteUser } from "@/services/user.api";
const UserTable = (props: any) => {
  const [isUserCreateModalOpen, setIsUserCreateModalOpen] = useState(false);
  const [isUserEditModalOpen, setIsUserEditModalOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState<any>(null);
  const onClick = () => {
    setIsUserCreateModalOpen(true);
  };

  const { users, meta } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const current = meta?.current;

  const pageSize = meta?.pageSize;
  const total = meta?.total;
  const { replace } = useRouter();

  const onChange = (pagination: any, sorter: any, filter: any, extra: any) => {
    if (pagination && pagination.current) {
      const params = new URLSearchParams(searchParams);
      params.set("current", pagination.current);
      replace(`${pathname}?${params.toString()}`);
    }
  };

  // const handleDelete = async (record: IUserTable) => {
  //   try {
  //     const res = await handleDeleteUser(record);
  //     if (res.data) {
  //       message.success({
  //         content: "Xóa người dùng thành công",
  //         key: `delete-${record._id}`,
  //       });

  //       if (users.length === 1 && current > 1) {
  //         const params = new URLSearchParams(searchParams);
  //         params.set("current", (current - 1).toString());
  //         replace(`${pathname}?${params.toString()}`);
  //       }
  //     } else {
  //       message.error({
  //         content: res.message || "Xóa người dùng thất bại",
  //         key: `delete-${record._id}`,
  //       });
  //     }
  //   } catch (error) {
  //     message.error({
  //       content: "Có lỗi xảy ra khi xóa người dùng",
  //       key: `delete-${record._id}`,
  //     });
  //   }
  // };
  const dataSource = users.map((user: IUserTable) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
  }));

  const columns: TableProps<IUserTable>["columns"] = [
    { title: "Id", dataIndex: "_id", key: "_id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: IUserTable, index: any) => {
        return (
          <>
            <EditTwoTone
              twoToneColor="#036ffc"
              style={{ cursor: "pointer", margin: "0 20px" }}
              onClick={() => {
                setIsUserEditModalOpen(true);
                setDataUpdate(record);
              }}
            ></EditTwoTone>
            <Popconfirm
              title="Xóa người dùng"
              description=""
              // onConfirm={() => handleDelete(record)}
              okText="Có"
              cancelText="Không"
            >
              <DeleteTwoTone
                twoToneColor="#ff6363"
                style={{ cursor: "pointer" }}
              />
            </Popconfirm>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <span>Quản lý người dùng</span>
        <Button onClick={onClick}> Tạo người dùng</Button>
      </div>
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        rowKey="_id"
        onChange={onChange}
        pagination={{
          current: current,
          total: total,
          pageSize: pageSize,
          showTotal: (total: number, range: [number, number]) => {
            return (
              <div>
                {range[0]}-{range[1]} trên {total} người
              </div>
            );
          },
        }}
      />
      <UserCreateModal
        isUserCreateModalOpen={isUserCreateModalOpen}
        setIsUserCreateModalOpen={setIsUserCreateModalOpen}
      />
      <UserEditModal
        isUserEditModalOpen={isUserEditModalOpen}
        setIsUserEditModalOpen={setIsUserEditModalOpen}
        setDataUpdate={setDataUpdate}
        dataUpdate={dataUpdate}
      />
    </>
  );
};

export default UserTable;
