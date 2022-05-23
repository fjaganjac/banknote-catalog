import React from "react";
import Page, { PageProps } from "./Page";
import { Button, Result } from "antd";

export interface Props extends PageProps {}
export interface State {}

export default class InvalidTokenPage extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = { ...props };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { title, text, buttonLabel, router, translate } = this.state as any;

    return (
      <Page {...this.props} className={"error-page"}>
        <Result
          status={"500"}
          className={"error-result"}
          title={translate(title)}
          subTitle={translate(text)}
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
