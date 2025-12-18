"use client";

import { Table, TableProps, Spin } from "antd";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { useFetchList } from "@/utils/hooks/fetchList";
import { getProducts } from "@/services/product.api";
import { IProduct } from "@/types/backend";
import { UserListProps } from "@/types/interface";
import ActionMenu from "../../user/action-menu";
import PageHeader from "../../user/page-header";
import FilterBar from "../../user/filter-bar";
import PaginationInfo from "../../user/pagination-info";

const ProductListClient = ({ initialMeta }: UserListProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const paramCurrent =
    Number(searchParams.get("current")) || initialMeta?.current || 1;
  const paramPageSize =
    Number(searchParams.get("pageSize")) || initialMeta?.pageSize || 10;

  const {
    data: products,
    meta,
    loading,
  } = useFetchList<IProduct>(getProducts, {
    current: paramCurrent,
    pageSize: paramPageSize,
  });

  const onChange = (pagination: any) => {
    const params = new URLSearchParams(searchParams);
    params.set("current", pagination.current?.toString() ?? "1");
    params.set(
      "pageSize",
      meta?.pageSize?.toString() ?? paramPageSize.toString()
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
        </>
      )}
    </div>
  );
};

export default ProductListClient;
