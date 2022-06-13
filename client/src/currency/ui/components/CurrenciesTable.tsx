import React from "react";
import { Table } from "antd";

const columns = [
  {
    title: "Valuta",
    dataIndex: "code",
    width: "30%",
    id: "code"
  },
  {
    title: "Naziv",
    dataIndex: "name",
    id: "name"
  },
  {
    title: "Država",
    dataIndex: "country",
    width: "40%",
    id: "country"
  }
];

const CurrenciesTable = ({ currencies }) => (
  <Table columns={columns} dataSource={currencies} />
);

export default CurrenciesTable;
