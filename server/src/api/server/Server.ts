import * as Hapi from "hapi";

import { TServerOptions } from "./TServerOptions";
import { IPlugin } from "../plugins/IPlugin";
import IRouteArea from "./IRouteArea";
import { Policy } from "catbox";

const PLUGIN_BASE_PATH = "../plugins/";

const Server = ({ task, config, routeAreas }: TServerOptions) => {
  const _config = config;
  const _task = task;
  let _cache: Policy<{}, Hapi.CachePolicyOptions<{}>>;
  const { port, routePrefix, plugins, host } = _config;
  const _server = new Hapi.Server({
    port: port,
    host,
    routes: {
      cors: true
    },
    debug: { request: process.env.NODE_ENV === "production" ? false : ["*"] }
  });

  _server.ext("onPreResponse", async function (request, h) {
    const response = request.response as any;

    if (
      !response ||
      !(response as any).isBoom ||
      response.statusCode === "400"
    ) {
      return h.continue;
    }

    return h.continue;
  });

  const registerPlugin = async (name: string): Promise<void> => {
    let plugin: IPlugin = require(PLUGIN_BASE_PATH + name).default(config);
    console.log(
      `Register plugin ${plugin.info().name} v${plugin.info().version}`
    );
    return plugin.register(_server);
  };

  const registerPlugins = async (plugins: string[]): Promise<void[]> => {
    return Promise.all(plugins.map(registerPlugin));
  };

  const registerAreas = (routes: IRouteArea[] = []): void => {
    routes.forEach((item) => item.registerRoutes(_server, _config));
  };

  return {
    get port() {
      return port;
    },
    get routePrefix() {
      return routePrefix;
    },
    async start() {
      if (routePrefix) {
        _server.realm.modifiers.route.prefix = routePrefix;
      }

      await registerPlugins(plugins);
      registerAreas(routeAreas);
      return _server.start();
    },
    route: _server.route
  };
};

export default Server;
