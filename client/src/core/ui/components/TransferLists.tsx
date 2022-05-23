import * as React from "react";
import { Transfer } from "antd";

export interface State {}

export interface Props {
  dataSource: any;
  showSearch?: boolean;
  filterOption?: any;
  targetKeys?: string[];
  onChange: any;
  onSearch?: any;
  render: any;
  locale?: {};
  titles?: string[];
  listStyle?: {};
}

export default class TransferLists extends React.Component<Props, State> {
  render() {
    const {
      dataSource,
      showSearch = false,
      filterOption,
      targetKeys,
      onChange,
      onSearch,
      render,
      locale,
      titles,
      listStyle
    } = this.props;

    return (
      <Transfer
        dataSource={dataSource}
        showSearch={showSearch}
        targetKeys={targetKeys}
        onChange={onChange}
        onSearch={onSearch}
        render={render}
        locale={locale}
        titles={titles}
        listStyle={listStyle}
        filterOption={filterOption}
      />
    );
  }
}
