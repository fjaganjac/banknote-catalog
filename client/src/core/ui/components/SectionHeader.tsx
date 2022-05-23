import React from "react";
import { Typography, Divider, Row, Col } from "antd";
const { Text } = Typography;

const SectionHeader = ({ title, icon }: { title: string; icon?: string }) => (
  <Row className="section-header-wrapper">
    <Col className={"section-header-container"}>
      <i className={icon}></i>
      <Text className={"section-header-title"}>{title}</Text>
    </Col>
    <Col sm={24}>
      <Divider type={"horizontal"} className={"separator"} />
    </Col>
  </Row>
);

export default SectionHeader;
