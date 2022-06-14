import React from "react";
import { Table } from "antd";
import Currency from "../../model/currency/Currency";

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

const CurrenciesTable = ({ currencies }) => {
  const dataSource = currencies.map((currency) => {
    return { ...currency, key: currency.id };
  });
  return <Table columns={columns} dataSource={dataSource} />;
};

export default CurrenciesTable;
