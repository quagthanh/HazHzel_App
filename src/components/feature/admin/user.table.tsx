"use client";

import { IUserTable as IUser } from "@/types/backend";
import { Button, Table, TableProps, Popconfirm, message, Spin } from "antd";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { useEffect, useMemo, useState } from "react";
// import UserCreateModal from "./modal.create.user";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import UserEditModal from "./modal.edit.user";
import { getUser } from "@/services/user.api";

interface Meta {
  current: number;
  pageSize: number;
  total: number;
  pages?: number;
}

interface Props {
  initialUsers?: IUser[];
  initialMeta?: Meta;
}

const UserTable = ({ initialUsers = [], initialMeta }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const paramCurrent =
    Number(searchParams.get("current")) || initialMeta?.current || 1;
  const paramPageSize =
    Number(searchParams.get("pageSize")) || initialMeta?.pageSize || 5;

  const [users, setUsers] = useState<IUser[]>(initialUsers);
  const [meta, setMeta] = useState<Meta>({
    current: paramCurrent,
    pageSize: paramPageSize,
    total: initialMeta?.total ?? 0,
    pages: initialMeta?.pages ?? undefined,
  });
  const [loading, setLoading] = useState(false);

  const [isUserCreateModalOpen, setIsUserCreateModalOpen] = useState(false);
  const [isUserEditModalOpen, setIsUserEditModalOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState<IUser | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await getUser({
          current: paramCurrent,
          pageSize: paramPageSize,
        });
        const result = res?.data?.data?.result ?? [];
        const m = res?.data?.data?.meta ?? {};
        if (!mounted) return;
        setUsers(result);
        setMeta({
          current: m.current ?? paramCurrent,
          pageSize: m.pageSize ?? paramPageSize,
          total: m.total ?? 0,
          pages: m.pages ?? m.pages,
        });
      } catch (err: any) {
        console.error("getUser error", err);
        message.error("Không lấy được danh sách người dùng");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchUsers();
    return () => {
      mounted = false;
    };
  }, [paramCurrent, paramPageSize]);

  const onClickCreate = () => setIsUserCreateModalOpen(true);

  const onChange = (pagination: any) => {
    const params = new URLSearchParams(searchParams);
    params.set("current", pagination.current?.toString() ?? "1");
    params.set(
      "pageSize",
      pagination.pageSize?.toString() ?? meta.pageSize.toString()
    );
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
      { title: "Id", dataIndex: "_id", key: "_id" },
      { title: "Name", dataIndex: "name", key: "name" },
      { title: "Email", dataIndex: "email", key: "email" },
      {
        title: "Action",
        key: "action",
        render: (_: any, record: IUser) => {
          return (
            <>
              <EditTwoTone
                twoToneColor="#036ffc"
                style={{ cursor: "pointer", margin: "0 20px" }}
                onClick={() => {
                  setIsUserEditModalOpen(true);
                  setDataUpdate(record);
                }}
              />
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
    ],
    []
  );

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
        <Button onClick={onClickCreate}> Tạo người dùng</Button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40 }}>
          <Spin />
        </div>
      ) : (
        <Table
          bordered
          dataSource={dataSource}
          columns={columns}
          rowKey="_id"
          onChange={onChange}
          pagination={{
            current: meta.current,
            total: meta.total,
            pageSize: meta.pageSize,
            showTotal: (total: number, range: [number, number]) => {
              return (
                <div>
                  {range[0]}-{range[1]} trên {total} người
                </div>
              );
            },
          }}
        />
      )}

      {/* modals */}
      {/* <UserCreateModal isUserCreateModalOpen={isUserCreateModalOpen} setIsUserCreateModalOpen={setIsUserCreateModalOpen} /> */}
      {/* <UserEditModal isUserEditModalOpen={isUserEditModalOpen} setIsUserEditModalOpen={setIsUserEditModalOpen} setDataUpdate={setDataUpdate} dataUpdate={dataUpdate} /> */}
    </>
  );
};

export default UserTable;
