"use client";
import { Drawer, Col, Row, Input } from "antd";
import logo from "@/../public/assets/test6.png";
import Image from "next/image";
import styles from "@/components/common/customer/drawer/search-drawer/style.module.scss";
import { SearchDrawerProps } from "@/types/interface";
import CancelButton from "../../cancel-button";

const SearchDrawer: React.FC<SearchDrawerProps> = ({ open, onClose }) => {
  return (
    <Drawer
      open={open}
      placement="top"
      maskClosable={true}
      width="100%"
      style={{ backgroundColor: "rgb(255, 251, 245)" }}
      onClose={onClose}
      closable={false}
    >
      <Row>
        <Col xs={0} sm={8}>
          <Image style={{ objectFit: "contain" }} alt="" src={logo} />
        </Col>
        <Col xs={19} sm={8}>
          <Input.Search placeholder="Search" variant="filled" />
        </Col>
        <Col className={styles.center} xs={5} sm={8}>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
        </Col>
      </Row>
    </Drawer>
  );
};

export default SearchDrawer;
