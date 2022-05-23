import React from "react";
import RootLayout from "./RootLayout";
import { Layout } from "antd";
import { TTranslate } from "../../service/locale/TranslationService";
import { TPresentable } from "../../presenter/withStore";

const { Content } = Layout;

export interface Props {
  router: any;
  children?: any;
  translate: TTranslate;
  style?: any;
  params?: any;
}
export interface State extends TPresentable {}

export default class AppLayout extends React.Component<Props, State> {
  private subscriptionId: number = 0;

  constructor(props) {
    super(props);
    this.state = {
      ...props,
      selectedKey: undefined,
      collapsed: false
    };
  }

  componentDidMount() {
    this.subscriptionId = this.state.store.subscribe((result) => {
      return this.setState(() => result);
    });
  }

  componentWillUnmount() {
    this.state.store.unsubscribe(this.subscriptionId);
  }

  render() {
    const { children, translate } = this.props;

    return (
      <RootLayout {...this.props}>
        <Layout className={"main-layout"}>
          <Content className={"main-layout-content"}>{children}</Content>
        </Layout>
      </RootLayout>
    );
  }
}
