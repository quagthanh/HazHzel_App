"use client";

import { updateProductsForAdmin } from "@/services/product.api";
import {
  Col,
  Form,
  Input,
  message,
  Modal,
  notification,
  Row,
  Select,
  Radio,
  InputNumber,
  Upload,
  UploadFile,
  UploadProps,
  Image,
} from "antd";
import { useEffect, useState } from "react";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { FileType } from "@/types/product";
import { getBase64 } from "@/utils/helper";
import styles from "./style.module.scss";
import ProductCardPreview from "./product-card-preview";
import ProductEditForm from "../product-edit-form";

const ProductEditModal = (props: any) => {
  const { isOk, isCancel, dataUpdate, setDataUpdate, category, supplier } =
    props;
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  useEffect(() => {
    if (dataUpdate) {
      // Set form values
      form.setFieldsValue({
        name: dataUpdate.name,
        description: dataUpdate.description,
        category: dataUpdate.categoryId?._id,
        supplier: dataUpdate.supplierId?._id,
        gender: dataUpdate.gender,
        stock: dataUpdate.stockQuantity,
        status: dataUpdate.status,
      });

      // Set existing images
      if (dataUpdate.images && dataUpdate.images.length > 0) {
        const existingFiles = dataUpdate.images.map(
          (img: any, index: number) => ({
            uid: `-${index}`,
            name: `image-${index}`,
            status: "done",
            url: img.secure_url || img,
          }),
        );
        setFileList(existingFiles);
      }
    }
  }, [dataUpdate, form]);

  const handleCloseUpdateModal = () => {
    if (setDataUpdate) {
      setDataUpdate(null);
    }
    form.resetFields();
    setFileList([]);
    isCancel();
  };

  const onFinish = async (values: any) => {
    console.log("Update values:", values);
    if (dataUpdate) {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("categoryName", values.category);
      formData.append("supplierName", values.supplier);

      if (values.gender) formData.append("gender", values.gender);
      if (values.stock) formData.append("stockQuantity", values.stock);
      if (values.status) formData.append("status", values.status);

      // Add new images
      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("files", file.originFileObj);
        }
      });

      const res = await updateProductsForAdmin({
        _id: dataUpdate._id,
        formData,
      });

      if (res?.data) {
        handleCloseUpdateModal();
        message.success("Update product successfully");
      } else {
        notification.error({
          message: "Update failed",
          description: res?.message,
        });
      }
    }
  };

  const beforeUpload = (file: FileType) => {
    setFileList((prev) => [...prev, file]);
    return false;
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    isCancel();
  };

  const uploadButton = (
    <button className={styles.uploadButton} type="button">
      <PlusOutlined />
      <div className={styles.uploadText}>Upload</div>
    </button>
  );
  const currentPreviewImage =
    fileList.length > 0 ? fileList[0].url || fileList[0].preview : null;

  return (
    <>
      <Modal
        maskClosable={false}
        title="Edit Product"
        open={isOk}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        closable={false}
        width={1200}
      >
        <div className={styles.subtitle}>
          Please update the form below to edit product information.
        </div>

        <Row gutter={24}>
          <Col span={16}>
            <ProductEditForm
              form={form}
              onFinish={onFinish}
              categoryOptions={category}
              supplierOptions={supplier}
              fileList={fileList}
              handlePreview={handlePreview}
              handleChange={handleChange}
              beforeUpload={beforeUpload}
            />
          </Col>

          <Col span={8}>
            <ProductCardPreview
              form={form}
              dataUpdate={dataUpdate}
              fileList={fileList}
            />
          </Col>
        </Row>
      </Modal>

      {/* Lightbox Preview */}
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default ProductEditModal;
