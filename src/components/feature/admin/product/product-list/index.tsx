"use client";

import { IProduct } from "@/types/backend";
import { Button, Table, TableProps, Popconfirm, message, Spin } from "antd";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { getProduct } from "@/services/product.api";

interface Meta {
  current: number;
  pageSize: number;
  total: number;
  pages?: number;
}

interface Props {
  initialProducts?: IProduct[];
  initialMeta?: Meta;
}

const ProductListClient = ({ initialProducts = [], initialMeta }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const paramCurrent =
    Number(searchParams.get("current")) || initialMeta?.current || 1;
  const paramPageSize =
    Number(searchParams.get("pageSize")) || initialMeta?.pageSize || 5;

  const [products, setProducts] = useState<IProduct[]>(initialProducts);
  const [meta, setMeta] = useState<Meta>({
    current: paramCurrent,
    pageSize: paramPageSize,
    total: initialMeta?.total ?? 0,
    pages: initialMeta?.pages ?? undefined,
  });

  const [loading, setLoading] = useState(false);
  const [isProductCreateModalOpen, setIsProductCreateModalOpen] =
    useState(false);
  const [isProductEditModalOpen, setIsProductEditModalOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState<IProduct | null>(null);

  // fetch when current / pageSize changes
  useEffect(() => {
    let mounted = true;
    console.log("Mounted", mounted);
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await getProduct({
          current: paramCurrent,
          pageSize: paramPageSize,
        });

        const result = res?.data?.data?.result ?? [];
        const m = res?.data?.data?.meta ?? {};

        if (!mounted) return;
        setProducts(result);
        setMeta({
          current: m.current ?? paramCurrent,
          pageSize: m.pageSize ?? paramPageSize,
          total: m.total ?? 0,
          pages: m.pages,
        });
      } catch (err: any) {
        console.error("getProducts error", err);
        message.error("Không lấy được danh sách sản phẩm");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, [paramCurrent, paramPageSize]);

  const onClickCreate = () => setIsProductCreateModalOpen(true);

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
      products.map((p) => ({
        ...p,
        key: p._id,
      })),
    [products]
  );

  const columns: TableProps<IProduct>["columns"] = useMemo(
    () => [
      { title: "ID", dataIndex: "_id", key: "_id", width: 260 },
      { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
      {
        title: "Tồn kho",
        dataIndex: "stock",
        key: "stock",
        render: (v) => <span>{v} cái</span>,
      },
      {
        title: "Danh mục",
        dataIndex: "categoryId",
        key: "categoryId",
        render: (cat) => cat?.name,
      },
      {
        title: "Nhà cung cấp",
        dataIndex: "supplierId",
        key: "supplierId",
        render: (sup) => sup?.name,
      },
      {
        title: "Action",
        key: "action",
        render: (_: any, record: IProduct) => (
          <>
            <EditTwoTone
              twoToneColor="#036ffc"
              style={{ cursor: "pointer", marginRight: 20 }}
              onClick={() => {
                setIsProductEditModalOpen(true);
                setDataUpdate(record);
              }}
            />

            <Popconfirm
              title="Xóa sản phẩm?"
              okText="Có"
              cancelText="Không"
              // onConfirm={() => handleDelete(record)}
            >
              <DeleteTwoTone
                twoToneColor="#ff6363"
                style={{ cursor: "pointer" }}
              />
            </Popconfirm>
          </>
        ),
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
        <span>Quản lý sản phẩm</span>
        <Button onClick={onClickCreate}>Tạo sản phẩm</Button>
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
            showTotal: (total, range) => (
              <div>
                {range[0]}–{range[1]} trên {total} sản phẩm
              </div>
            ),
          }}
        />
      )}

      {/* PRODUCT CREATE MODAL */}
      {/* <ProductCreateModal
        isOpen={isProductCreateModalOpen}
        setIsOpen={setIsProductCreateModalOpen}
      /> */}

      {/* PRODUCT EDIT MODAL */}
      {/* <ProductEditModal
        isOpen={isProductEditModalOpen}
        setIsOpen={setIsProductEditModalOpen}
        dataUpdate={dataUpdate}
      /> */}
    </>
  );
};

export default ProductListClient;
