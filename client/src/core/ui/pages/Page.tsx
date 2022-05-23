import * as React from "react";
import { IRouter } from "../../runtime/Router";
import { TTranslate } from "../../service/locale/TranslationService";

export interface PageProps {
  router: IRouter;
  children?: any;
  translate: TTranslate;
  style?: any;
  className?: string;
}

export interface PageState {}

class Page extends React.Component<PageProps, PageState> {
  render() {
    const { children, style, className } = this.props;
    return (
      <div className={"page " + className} style={style}>
        {children}
      </div>
    );
  }
}

export default Page;
