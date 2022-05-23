import { Typography } from "antd";
import React from "react";
import Page, { PageProps } from "../../../core/ui/pages/Page";
import { IHomePresenter } from "../../presenter/HomePresenter";

const { Text } = Typography;

export interface Props extends PageProps {}
export interface State extends IHomePresenter {}

export default class HomePage extends React.Component<Props, State> {
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
    const { translate, users } = this.state;
    return (
      <Page {...this.props} style={{ color: "red" }}>
        <Text>{users}</Text>
      </Page>
    );
  }
}
