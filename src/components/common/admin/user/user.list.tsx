"use client";

import { IUserTable as IUser } from "@/types/backend";
import { Table, TableProps, Popconfirm, message, Spin } from "antd";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import UserEditModal from "./modal.edit.user";
import { getUser } from "@/services/user.api";

import PageHeader from "../page-header";
import ActionMenu from "../action-menu";
import FilterBar from "../filter-bar";
import PaginationInfo from "../pagination-info";
import { Meta, UserListProps } from "@/types/interface";
import { useFetchList } from "@/utils/hooks/fetchList";

const UserListClient = ({ initialMeta }: UserListProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const paramCurrent =
    Number(searchParams.get("current")) || initialMeta?.current || 1;
  const paramPageSize =
    Number(searchParams.get("pageSize")) || initialMeta?.pageSize || 20;

  const [isUserCreateModalOpen, setIsUserCreateModalOpen] = useState(false);
  const [isUserEditModalOpen, setIsUserEditModalOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState<IUser | null>(null);
  const {
    data: users,
    meta,
    loading,
  } = useFetchList<IUser>(getUser, {
    current: paramCurrent,
    pageSize: paramPageSize,
  });

  const onClickCreate = () => setIsUserCreateModalOpen(true);

  const onChange = (pagination: any) => {
    const params = new URLSearchParams(searchParams);
    params.set("current", pagination.current?.toString() ?? "1");
    params.set("pageSize", meta?.pageSize ?? paramPageSize);
    router.replace(`${pathname}?${params.toString()}`);
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
        sorter: true,
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
        title: "Status",
        key: "status",
        width: 120,
        render: () => (
          <span
            style={{
              padding: "4px 12px",
              borderRadius: 6,
              background: "#d4edda",
              color: "#155724",
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            Active
          </span>
        ),
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
              // handle delete logic
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
        subtitle="Follow your website's account"
        breadcrumb={["Ecommerce", "Users List"]}
        onExport={() => console.log("Export")}
        onAdd={onClickCreate}
        addButtonText="Add Product"
      />

      <FilterBar
        onSearch={(value) => console.log("Search:", value)}
        onFilter={() => console.log("Filter clicked")}
      />

      {loading ? (
        <div style={{ textAlign: "center", padding: 60 }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Table
            bordered
            dataSource={dataSource}
            columns={columns}
            rowKey="_id"
            onChange={onChange}
            pagination={false}
            style={{
              borderRadius: 8,
              overflow: "hidden",
            }}
            rowSelection={{
              type: "checkbox",
            }}
          />

          <PaginationInfo
            current={meta.current}
            pageSize={meta.pageSize}
            total={meta.total}
            onPageChange={(page) => {
              onChange({ current: page, pageSize: meta.pageSize });
            }}
          />
        </>
      )}

      {/* Modals - giữ nguyên logic */}
      {/* <UserCreateModal isUserCreateModalOpen={isUserCreateModalOpen} setIsUserCreateModalOpen={setIsUserCreateModalOpen} /> */}
      {/* <UserEditModal isUserEditModalOpen={isUserEditModalOpen} setIsUserEditModalOpen={setIsUserEditModalOpen} setDataUpdate={setDataUpdate} dataUpdate={dataUpdate} /> */}
    </div>
  );
};

export default UserListClient;
