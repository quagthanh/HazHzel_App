import { ICategory, ISupplier } from "@/types/interface";
import { TableProps, Image, Tag, Tooltip } from "antd";
import ActionMenu from "../../action-menu";

interface GetCategoryColumnsProps {
  onEdit: (record: ICategory) => void;
  onDelete: (id: string) => void;
}

export const getCategoryColumns = ({
  onEdit,
  onDelete,
}: GetCategoryColumnsProps): TableProps<ICategory>["columns"] => {
  return [
    {
      title: "Logo",
      dataIndex: "images",
      width: 80,
      align: "center",
      render: (images) =>
        images?.[0]?.secure_url ? (
          <Image
            src={images[0].secure_url}
            width={40}
            height={40}
            style={{
              objectFit: "contain",
              borderRadius: "50%",
              border: "1px solid #eee",
            }}
            alt="logo"
          />
        ) : (
          "—"
        ),
    },
    {
      title: "Category Name",
      dataIndex: "name",
      width: 200,
      sorter: true,
      render: (name) => <span style={{ fontWeight: 600 }}>{name}</span>,
    },
    {
      title: "Category Slug",
      dataIndex: "slug",
      width: 200,
      sorter: true,
      render: (slug) => <span style={{ fontWeight: 600 }}>{slug}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 120,
      align: "center",
      render: (status) => (
        <Tag
          color={status ? "success" : "default"}
          style={{ minWidth: 60, textAlign: "center" }}
        >
          {status ? "ACTIVE" : "INACTIVE"}
        </Tag>
      ),
    },
    {
      title: "Action",
      width: 80,
      align: "center",
      render: (_, record) => (
        <ActionMenu
          onEdit={() => onEdit(record)}
          onDelete={() => onDelete(record._id)}
        />
      ),
    },
  ];
};
