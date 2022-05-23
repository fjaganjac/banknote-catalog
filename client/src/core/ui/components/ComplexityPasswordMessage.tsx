import React from "react";
import { Alert } from "antd";

const ComplexityPasswordMessage = ({ message, className }: { message: string, className?: any }) => (
  <Alert message={message} type="warning" className={"alert alert-warning " + className} />
);

export default ComplexityPasswordMessage;
