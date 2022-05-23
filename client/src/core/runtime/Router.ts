import { createBrowserHistory, To } from "history";
import * as React from "react";
import ReactDOM from "react-dom";
import toRegex from "path-to-regexp";
import Application from "../../Application";
import { Layouts } from "../common/Constants";
import AppLayout from "../ui/layouts/AppLayout";
import RootLayout from "../ui/layouts/RootLayout";
import BaseLayout from "../ui/layouts/BaseLayout";
import { ITranslationService } from "../service/locale/TranslationService";
import { INotificationService } from "../service/notification/NotificationService";
import { Action } from "history";

export interface TRouteOptions {
  secure?: boolean;
  role?: string[];
  name?: string;
  layout?: string;
  initialProps?: any;
}
export interface TRoute {
  path: string;
  page: any;
  options?: TRouteOptions;
}

export interface IRouter {
  registerRoutes(...routes: TRoute[]): void;
  showLocation(
    locationDescription: { action: Action; location: To } | string
  ): Promise<any>;
  replace(location: To): void;
  push(location: To): void;
  bindLocationListener(): void;
  goBack(): void;
  location: TRoute;
}
const Router = (
  context,
  rootElement,
  application: Application,
  routes: TRoute[]
) => {
  const _history = createBrowserHistory({});
  let _routes = routes;
  let _currentRoute: TRoute;
  const _rootElement = rootElement;
  const _application = application;
  const _notificationService: INotificationService =
    _application.container.resolve<INotificationService>("notificationService");

  function registerRoutes(...routeCollection: TRoute[]) {
    _routes = [..._routes, ...routeCollection];
  }

  function matchURI(path, uri, search = "", hash = "") {
    const keys = [];
    const pattern = toRegex(path, keys);
    const match = pattern.exec(uri);
    if (!match) return null;
    const params = Object.create(null);
    for (let i = 1; i < match.length; i++) {
      params[(keys[i - 1] as any).name] =
        match[i] !== undefined ? match[i] : undefined;
    }
    if (search) {
      const urlParams = new URLSearchParams(search);
      for (var entry of urlParams.entries()) {
        params[entry[0]] = entry[1];
      }
    }
    return params;
  }

  function buildPage(route: TRoute, props) {
    const _layoutType =
      (route.options && route.options.layout) || Layouts.DEFAULT;
    let layout: any;
    switch (_layoutType) {
      case Layouts.APP:
        layout = AppLayout;
        break;
      case Layouts.ROOT:
        layout = RootLayout;
        break;
      case Layouts.BASE:
        layout = BaseLayout;
        break;
      default:
        layout = AppLayout;
    }
    const pageProps = {
      ...props,
      ...{
        store: _application.store,
        router: _router,
        translate:
          _application.container.resolve<ITranslationService>(
            "translationService"
          ).get
      }
    };
    const page = React.createElement(
      layout,
      pageProps,
      React.createElement(
        React.Suspense,
        {
          fallback: React.createElement("div", {
            style: {
              minHeight: 750
            }
          })
        },
        React.createElement(route.page, pageProps)
      )
    );
    return page;
  }

  async function resolve(routes, context) {
    for (const route of routes as TRoute[]) {
      if (context.error) {
        console.error(context.error);
      }
      const uri = context.error ? "/error" : context.pathname;
      const params = matchURI(route.path, uri, context.search, context.hash);
      if (!params) continue;
      _currentRoute = route;

      const node = _rootElement;
      const props = Object.assign(
        {},
        route.options || {},
        (route.options && route.options.initialProps) || {},
        {
          params
        }
      ) as any;
      const page = buildPage(route, props);
      return ReactDOM.render(page, node);
    }
    const error = new Error(
      'Route "' + context.pathname + '" not found'
    ) as any;
    error.status = 404;
    throw error;
  }

  function push(location = {}) {
    return _history.push(location);
  }

  function goBack() {
    return _history.back();
  }

  function replace(location: To) {
    return _history.replace(location);
  }

  async function showLocation(
    locationDescription:
      | {
          action: Action;
          location: To;
        }
      | string
  ) {
    try {
      let _location: To | string;
      if (typeof locationDescription === "string") {
        _location = {
          pathname: locationDescription
        };
      } else {
        _location = locationDescription.location;
      }
      await resolve(_routes, _location);
      return;
    } catch (error: any) {
      if (error.status) {
        switch (error.status) {
          case 401:
            _notificationService.showError(error.message);
            return replace({
              ...context,
              pathname: `/login`,
              search: `?redirect=${encodeURI(
                context.pathname + (context.search || "")
              )}`
            });
          case 404:
            return replace({
              pathname: `/not-found`
            });
          default:
            _notificationService.showError(error.message);
        }
      }
    }
  }

  function registerLocationListener() {
    _history.listen(showLocation);
  }

  var _router = {
    registerRoutes,
    showLocation,
    replace,
    push,
    bindLocationListener: registerLocationListener,
    goBack,
    get location() {
      return _currentRoute;
    }
  } as IRouter;

  return _router;
};

export { Router };
