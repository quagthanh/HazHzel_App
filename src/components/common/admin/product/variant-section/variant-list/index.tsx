"use client";
import { useState } from "react";
import {
  Button,
  Table,
  Space,
  Popconfirm,
  message,
  Image,
  Tag,
  Tooltip,
  Spin,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getVariantsByProductId, deleteVariant } from "@/services/variant.api";
import { IProductVariant } from "@/types/interface";
import VariantModal from "../variant-modal";
import useSWR from "swr";
interface VariantListProps {
  productId: string;
}

const VariantList = ({ productId }: VariantListProps) => {
  // State cho Modal (Giữ nguyên)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVariant, setCurrentVariant] = useState<IProductVariant | null>(
    null,
  );

  // 2. Định nghĩa hàm fetcher để gọi Server Action
  const fetcher = async (id: string) => {
    const res = await getVariantsByProductId(id);
    // Đảm bảo luôn trả về mảng
    return Array.isArray(res) ? res : [];
  };

  // 3. Dùng useSWR thay thế useEffect + useState
  // key là `productId`, khi key đổi -> SWR tự chạy lại fetcher
  const {
    data: variants,
    error,
    isLoading,
    mutate,
  } = useSWR(productId, fetcher, {
    revalidateOnFocus: false, // Tắt tự fetch khi click lại tab (tùy chọn)
  });

  const handleDelete = async (id: string) => {
    await deleteVariant(id);
    message.success("Deleted variant");
    mutate(); // 4. Gọi mutate để reload lại danh sách ngay lập tức
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "images",
      width: 80,
      render: (images: any[]) => {
        const url = images?.[0]?.secure_url || images?.[0]?.url || images?.[0];
        return url ? (
          <Image
            src={url}
            width={40}
            height={40}
            style={{ objectFit: "cover", borderRadius: 4 }}
          />
        ) : (
          "-"
        );
      },
    },
    {
      title: "Name / SKU",
      render: (_: any, r: IProductVariant) => (
        <div>
          <div style={{ fontWeight: 600 }}>{r.name}</div>
          <div style={{ fontSize: 12, color: "#666" }}>{r.sku}</div>
        </div>
      ),
    },
    {
      title: "Attributes",
      dataIndex: "attributes",
      render: (attrs: any[]) => (
        <Space wrap>
          {attrs?.map((a, idx) => (
            <Tag key={idx} color="geekblue">
              {a.k}: {a.v}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Price",
      dataIndex: "currentPrice",
      render: (p: number) => (
        <span style={{ color: "#d48806" }}>{p?.toLocaleString("vi-VN")} đ</span>
      ),
    },
    {
      title: "Stock",
      render: (_: any, r: IProductVariant) => r.stock ?? r.stock,
    },
    {
      title: "Action",
      width: 100,
      render: (_: any, record: IProductVariant) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              size="small"
              onClick={() => {
                setCurrentVariant(record);
                setIsModalOpen(true);
              }}
            />
          </Tooltip>
          <Popconfirm
            title="Delete variant?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (error) return <div>Failed to load variants</div>;

  return (
    <div style={{ marginTop: 10 }}>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Variant List</h3>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setCurrentVariant(null);
            setIsModalOpen(true);
          }}
        >
          Add Variant
        </Button>
      </div>

      <Table
        dataSource={variants || []} // Data lấy trực tiếp từ SWR
        columns={columns}
        rowKey="_id"
        loading={isLoading} // Loading lấy từ SWR
        pagination={false}
        bordered
        size="small"
      />

      <VariantModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onReload={() => mutate()} // 5. Truyền mutate vào onReload để modal gọi khi xong
        productId={productId}
        dataUpdate={currentVariant}
      />
    </div>
  );
};

export default VariantList;
