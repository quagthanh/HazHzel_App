"use client";

import { Table, TableProps, Spin } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useTransition } from "react";

import { IProduct } from "@/types/interface";
import ActionMenu from "../../action-menu";
import PageHeader from "../../page-header";
import FilterBar from "../../filter-bar";
import PaginationInfo from "../../pagination-info";

interface ProductListClientProps {
  initialData: IProduct[];
  initialMeta: {
    current: number;
    pageSize: number;
    total: number;
    pages: number;
  };
}

const ProductListClient = ({
  initialData,
  initialMeta,
}: ProductListClientProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const products = initialData || [];
  const meta = initialMeta;

  const onChange = (pagination: any) => {
    const params = new URLSearchParams(searchParams);
    params.set("current", pagination.current?.toString() ?? "1");
    params.set("pageSize", meta?.pageSize?.toString() ?? "10");

    const targetUrl = `${pathname}?${params.toString()}`;

    startTransition(() => {
      router.replace(targetUrl);
    });
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
              alt="product"
            />
          ) : (
            "—"
          ),
      },
      {
        title: "Name",
        dataIndex: "name",
        width: 250,
      },
      {
        title: "Category",
        dataIndex: ["categoryId", "name"],
        width: 180,
        render: (_, record) => record.categoryId?.name || "—",
      },
      {
        title: "Supplier",
        dataIndex: ["supplierId", "name"],
        width: 180,
        render: (_, record) => record.supplierId?.name || "—",
      },
      {
        title: "Stock",
        dataIndex: "stock",
        width: 100,
      },
      {
        title: "Status",
        dataIndex: "status",
        width: 120,
        render: (status) => (
          <span
            style={{
              padding: "4px 12px",
              borderRadius: 6,
              background: status === "ACTIVE" ? "#d4edda" : "#f8d7da",
              color: status === "ACTIVE" ? "#155724" : "#721c24",
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            {status}
          </span>
        ),
      },
      {
        title: "Action",
        width: 100,
        align: "center",
        render: (_, record) => (
          <ActionMenu
            onEdit={() => console.log("Edit product", record)}
            onDelete={() => console.log("Delete product", record._id)}
          />
        ),
      },
    ],
    []
  );

  return (
    <div style={{ padding: 24, background: "#fff", minHeight: "100vh" }}>
      <PageHeader
        title="Products List"
        subtitle="Manage your store products"
        breadcrumb={["Ecommerce", "Products"]}
        onAdd={() => console.log("Add product")}
        addButtonText="Add Product"
      />

      <FilterBar
        onSearch={(v) => console.log("Search:", v)}
        onFilter={() => console.log("Filter")}
      />

      <Spin spinning={isPending} size="large">
        <Table
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          rowKey="_id"
        />

        <PaginationInfo
          current={meta.current}
          pageSize={meta.pageSize}
          total={meta.total}
          onPageChange={(page) =>
            onChange({ current: page, pageSize: meta.pageSize })
          }
        />
      </Spin>
    </div>
  );
};

export default ProductListClient;
