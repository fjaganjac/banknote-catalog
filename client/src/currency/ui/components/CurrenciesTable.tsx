import React from "react";
import { Table } from "antd";
import { createDocumentRegistry } from "typescript";

const columns = [
  {
    title: "Valuta",
    dataIndex: "code",
    width: "30%",
    id: 0,
  },
  {
    title: "Naziv",
    dataIndex: "name",
    id: 1,
  },
  {
    title: "Drzava",
    dataIndex: "country",
    width: "40%",
    id: 2,
  },
];

const CurrenciesTable = ({ currencies }) => (
  <Table columns={columns} dataSource={currencies} />
);

export default CurrenciesTable;
