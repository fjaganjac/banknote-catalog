import * as React from "react";
import { Modal, Typography } from "antd";

const { Text } = Typography;

export interface State {}

export interface Props {
  modalVisible: boolean;
  title: string;
  subtitle?: string;
  onOk: any;
  onCancel: any;
  children: any;
  label?: string;
  okText: string;
  cancelText: string;
}

export default class Dialog extends React.Component<Props, State> {
  render() {
    const renderTitle = (title: string, subtitle?: string) => {
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Text style={{ fontSize: 16 }}>{title}</Text>
          <Text style={{ fontSize: 14, fontWeight: "normal" }}>{subtitle}</Text>
        </div>
      );
    };

    const {
      modalVisible,
      title,
      onOk,
      onCancel,
      children,
      label,
      subtitle,
      okText,
      cancelText
    } = this.props;

    return (
      <Modal
        title={renderTitle(title, subtitle)}
        maskClosable={false}
        visible={modalVisible}
        onOk={onOk}
        onCancel={onCancel}
        okText={okText}
        cancelText={cancelText}
      >
        <div style={{ padding: 10 }}>
          {label && (
            <Typography.Title style={{ fontSize: 14 }}>
              {label}
            </Typography.Title>
          )}
          {children}
        </div>
      </Modal>
    );
  }
}
