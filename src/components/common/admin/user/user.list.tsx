"use client";

import { IUserTable as IUser } from "@/types/backend";
import { Table, TableProps, Spin } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import UserEditModal from "./modal.edit.user";
import UserCreateModal from "./modal.create.user";
import Image from "next/image";

import PageHeader from "../page-header";
import ActionMenu from "../action-menu";
import FilterBar from "../filter-bar";
import PaginationInfo from "../pagination-info";

import avt_holder from "@/assets/cool_avt.jpg";
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

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState<IUser | null>(null);

  const users = initialUsers;
  const meta = initialMeta;

  const onClickCreate = () => setIsCreateModalOpen(true);
  useEffect(() => {
    setIsLoading(false);
  }, [searchParams]);

  const onChange = (pagination: any) => {
    setIsLoading(true);

    const params = new URLSearchParams(searchParams);
    params.set("current", pagination.current?.toString() ?? "1");
    params.set(
      "pageSize",
      pagination.pageSize?.toString() ?? meta.pageSize.toString(),
    );

    router.replace(`${pathname}?${params.toString()}`);
  };

  const dataSource = useMemo(
    () =>
      users.map((u) => ({
        ...u,
        key: u._id,
      })),
    [users],
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
        title: "Image",
        dataIndex: "images",
        width: 100,
        render: (images) =>
          images?.[0] ? (
            <img
              src={images[0].secure_url}
              style={{
                width: 50,
                height: 70,
                objectFit: "cover",
                borderRadius: 6,
              }}
              alt="user"
            />
          ) : (
            <Image
              src={avt_holder}
              alt="user"
              width={50}
              height={70}
              style={{
                objectFit: "cover",
                borderRadius: 6,
              }}
            />
          ),
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: 250,
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: 250,
      },
      {
        title: "Role",
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
              setIsEditModalOpen(true);
              setDataUpdate(record);
            }}
            onDelete={() => {
              console.log("Delete", record._id);
            }}
          />
        ),
      },
    ],
    [],
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

      <Spin spinning={isLoading} size="large">
        <Table
          bordered
          dataSource={dataSource}
          columns={columns}
          rowKey="_id"
          pagination={false}
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

      <UserCreateModal
        isUserCreateModalOpen={isCreateModalOpen}
        setIsUserCreateModalOpen={setIsCreateModalOpen}
      />
      <UserEditModal
        isUserEditModalOpen={isEditModalOpen}
        setIsUserEditModalOpen={setIsEditModalOpen}
        setDataUpdate={setDataUpdate}
        dataUpdate={dataUpdate}
      />
    </div>
  );
};

export default UserListClient;
