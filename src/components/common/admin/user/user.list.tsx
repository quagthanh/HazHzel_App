"use client";

import { IUserTable as IUser } from "@/types/backend";
import { Table, TableProps, Spin } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
// import UserEditModal from "./modal.edit.user"; // Giữ nguyên modal của bạn
// import UserCreateModal from "./modal.create.user"; // Giữ nguyên modal của bạn

import PageHeader from "../page-header";
import ActionMenu from "../action-menu";
import FilterBar from "../filter-bar";
import PaginationInfo from "../pagination-info";

interface UserListClientProps {
  initialUsers: IUser[];
  initialMeta: {
    current: number;
    pageSize: number;
    total: number;
  };
}

const UserListClient = ({ initialUsers, initialMeta }: UserListClientProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Loading state khi chuyển trang
  const [isPending, startTransition] = useTransition();

  // Modal State
  const [isUserCreateModalOpen, setIsUserCreateModalOpen] = useState(false);
  const [isUserEditModalOpen, setIsUserEditModalOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState<IUser | null>(null);

  // Data lấy từ Props (Server truyền xuống)
  const users = initialUsers;
  const meta = initialMeta;

  const onClickCreate = () => setIsUserCreateModalOpen(true);

  // Logic chuyển trang (Update URL -> Server fetch lại -> Client update)
  const onChange = (pagination: any) => {
    const params = new URLSearchParams(searchParams);
    params.set("current", pagination.current?.toString() ?? "1");
    params.set(
      "pageSize",
      pagination.pageSize?.toString() ?? meta.pageSize.toString()
    );

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  const dataSource = useMemo(
    () =>
      users.map((u) => ({
        ...u,
        key: u._id,
      })),
    [users]
  );

  const columns: TableProps<IUser>["columns"] = useMemo(
    () => [
      {
        title: "User ID",
        dataIndex: "_id",
        key: "_id",
        width: 150,
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: 250,
        render: (name: string) => (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontSize: 20,
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f0f0f0",
                borderRadius: 6,
              }}
            >
              👤
            </span>
            <span>{name}</span>
          </div>
        ),
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: 250,
      },
      {
        title: "Role", // Thêm cột Role nếu cần
        dataIndex: "role",
        key: "role",
        width: 150,
        render: (role) => role?.name || "N/A",
      },
      {
        title: "Action",
        key: "action",
        width: 100,
        align: "center",
        render: (_: any, record: IUser) => (
          <ActionMenu
            onEdit={() => {
              setIsUserEditModalOpen(true);
              setDataUpdate(record);
            }}
            onDelete={() => {
              console.log("Delete", record._id);
            }}
          />
        ),
      },
    ],
    []
  );

  return (
    <div style={{ padding: "24px", background: "#fff", minHeight: "100vh" }}>
      <PageHeader
        title="Users List"
        subtitle="Manage system users"
        breadcrumb={["Admin", "Users"]}
        onExport={() => console.log("Export")}
        onAdd={onClickCreate}
        addButtonText="Add User"
      />

      <FilterBar
        onSearch={(value) => console.log("Search:", value)}
        onFilter={() => console.log("Filter clicked")}
      />

      {/* Bọc Table trong Spin với trạng thái isPending */}
      <Spin spinning={isPending} size="large">
        <Table
          bordered
          dataSource={dataSource}
          columns={columns}
          rowKey="_id"
          pagination={false} // Tắt pagination mặc định của Antd
          style={{ borderRadius: 8, overflow: "hidden" }}
        />

        <PaginationInfo
          current={meta.current}
          pageSize={meta.pageSize}
          total={meta.total}
          onPageChange={(page) => {
            onChange({ current: page, pageSize: meta.pageSize });
          }}
        />
      </Spin>

      {/* Modals */}
      {/* Bạn cần đảm bảo component UserCreateModal và UserEditModal 
        đã được import đúng và hoạt động.
        Khi create/edit thành công -> gọi router.refresh() để reload lại list 
      */}
      {/* <UserCreateModal
        isUserCreateModalOpen={isUserCreateModalOpen}
        setIsUserCreateModalOpen={setIsUserCreateModalOpen}
      />
      <UserEditModal
        isUserEditModalOpen={isUserEditModalOpen}
        setIsUserEditModalOpen={setIsUserEditModalOpen}
        setDataUpdate={setDataUpdate}
        dataUpdate={dataUpdate}
      /> */}
    </div>
  );
};

export default UserListClient;
