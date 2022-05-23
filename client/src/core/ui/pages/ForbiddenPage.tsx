import React from "react";
import Page, { PageProps } from "./Page";
import { Button, Result } from "antd";
import Icon from "@ant-design/icons";
import { Error403Icon } from "../assets/icons/Icons";
export interface Props extends PageProps {}
export interface State {}

export default class ForbiddenPage extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = { ...props };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { title, text, buttonLabel, router, translate } = this.state as any;

    return (
      <Page
        {...this.props}
        className={"error-page"}
      >
        <Result
          className={"error-result"}
          title={translate(title)}
          subTitle={translate(text)}
          icon={<Icon component={Error403Icon} className={"error-result-icon"}/>}
          extra={
            <Button
              type="primary"
              onClick={(e) => {
                router.replace("/");
              }}
            >
              {translate(buttonLabel)}
            </Button>
          }
        />
      </Page>
    );
  }
}
