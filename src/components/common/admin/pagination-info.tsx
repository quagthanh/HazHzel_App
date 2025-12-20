"use client";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface PaginationInfoProps {
  current: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

const PaginationInfo = ({
  current,
  pageSize,
  total,
  onPageChange,
}: PaginationInfoProps) => {
  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (current - 1) * pageSize + 1;
  const endIndex = Math.min(current * pageSize, total);

  const renderPageNumbers = () => {
    const pages: JSX.Element[] = [];
    const maxVisiblePages = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= current - 1 && i <= current + 1)
      ) {
        pages.push(
          <Button
            key={i}
            type={i === current ? "primary" : "default"}
            onClick={() => onPageChange(i)}
            style={{
              minWidth: 32,
              height: 32,
            }}
          >
            {i}
          </Button>
        );
      } else if (pages[pages.length - 1]?.key !== "ellipsis") {
        pages.push(
          <span
            key={`ellipsis-${i}`}
            style={{ padding: "0 8px", color: "#8c8c8c" }}
          >
            ...
          </span>
        );
      }
    }

    return pages;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 16,
        padding: "12px 0",
      }}
    >
      {/* Results info */}
      <div style={{ fontSize: 14, color: "#595959" }}>
        Showing {startIndex} - {endIndex} of {total} Results
      </div>

      {/* Pagination controls */}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Button
          icon={<LeftOutlined />}
          onClick={() => onPageChange(current - 1)}
          disabled={current === 1}
          style={{ minWidth: 32, height: 32 }}
        >
          Prev
        </Button>

        {renderPageNumbers()}

        <Button
          onClick={() => onPageChange(current + 1)}
          disabled={current === totalPages}
          style={{ minWidth: 32, height: 32 }}
        >
          Next
          <RightOutlined />
        </Button>
      </div>
    </div>
  );
};

export default PaginationInfo;
