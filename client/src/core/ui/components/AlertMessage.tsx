import * as React from "react";
import { Alert } from "antd";

const AlertMessage = ({
  title,
  message,
  type,
}: {
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
}) => (
  <Alert
    closable
    message={title}
    description={message}
    type={type}
    showIcon={true}
  />
);

export default AlertMessage;
