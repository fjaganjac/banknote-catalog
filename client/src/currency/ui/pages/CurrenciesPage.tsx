import { Typography } from "antd";
import React from "react";
import Page, { PageProps } from "../../../core/ui/pages/Page";
import Currency from "../../model/currency/Currency";
import { ICurrencyPresenter } from "../../presenter/CurrencyPresenter";
import TableCurrency from "../components/CurrenciesTable";

const { Text } = Typography;

export interface Props extends PageProps {}
export interface State extends ICurrencyPresenter {}

export default class CurrencyPage extends React.Component<Props, State> {
  private subscriptionId: number = 0;

  constructor(props: any) {
    super(props);
    this.state = { ...props };
  }

  componentDidMount() {
    this.subscriptionId = this.state.store.subscribe((result) => {
      return this.setState((prevState) => result);
    });
  }

  componentWillUnmount() {
    this.state.store.unsubscribe(this.subscriptionId);
  }

  render() {
    const { translate, currencies } = this.state;
    return (
      <Page {...this.props} style={{ color: "red" }}>
        <TableCurrency currencies={currencies} />
      </Page>
    );
  }
}
