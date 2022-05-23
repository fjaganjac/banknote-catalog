import * as React from "react";
import { Breadcrumb as BreadcrumbAntd } from "antd";
import { IRouter, TRoute } from "../../runtime/Router";
import { HomeOutlined } from "@ant-design/icons";
import { TTranslate } from "../../service/locale/TranslationService";

export interface State {}

export interface Props {
  router: IRouter;
  translate: TTranslate;
  onRenderLabel: any;
  params?: any;
}

export default class BreadCrumb extends React.Component<Props, State> {
  handleClick(event) {
    if (event.button !== 0 /* left click */) {
      return;
    }

    if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();
  }

  buildBreadcrumbs(location: TRoute, onRenderLabel, params?: any) {
    const crumbs = [
      "",
      ...(location.path || "").split("/").filter((item) => item.length > 0)
    ];
    let _path = "";
    return crumbs.map((item, i) => {
      if (_path === "/") {
        _path = "";
      }
      if (item.indexOf(":") === 0) {
        const value = (params || {})[item.substring(1)];
        let name = value;
        if (onRenderLabel) {
          if (onRenderLabel[item.slice(1)]) {
            name = onRenderLabel[item.slice(1)](value);
          }
        }
        _path = [_path, value].join("/");
        return {
          path: _path,
          name,
          disabled: true
        };
      } else {
        const key = `pages.${item || "home"}`;
        _path = [_path, item].join("/");
        return {
          path: _path,
          name: this.props.translate(key) || `__${key}__`,
          disabled: i === crumbs.length - 1 ? true : false
        };
      }
    });
  }

  render() {
    const { router, params, onRenderLabel } = this.props;
    const crumbs = this.buildBreadcrumbs(
      router.location,
      onRenderLabel,
      params
    );

    const filteredCrumbs = crumbs.filter(
      (crumb) => crumb.name !== "__pages.types__"
    );

    return (
      <BreadcrumbAntd className={"breadcrumb-wrapper"}>
        {(filteredCrumbs || []).map((crumb, index) =>
          filteredCrumbs.length - 1 === index ? (
            <BreadcrumbAntd.Item key={`breadcrumb-item-${index}`}>
              <span>{crumb.name}</span>
            </BreadcrumbAntd.Item>
          ) : crumb.disabled ? (
            <BreadcrumbAntd.Item key={`breadcrumb-item-${index}`}>
              {crumb.path === "/" ? (
                <HomeOutlined />
              ) : (
                <span>{crumb.name}</span>
              )}
            </BreadcrumbAntd.Item>
          ) : (
            <BreadcrumbAntd.Item
              key={`breacrumb-antd-item-${index}`}
              href={crumb.path}
            >
              {crumb.path === "/" ? (
                <HomeOutlined />
              ) : (
                <span>{crumb.name}</span>
              )}
            </BreadcrumbAntd.Item>
          )
        )}
      </BreadcrumbAntd>
    );
  }
}
