import { IPlugin } from "../IPlugin";
import * as Hapi from "hapi";
import { TServerConfiguration } from "../../../config";
import { TSession } from "../../../model/server/Session";

const Plugin = (config: TServerConfiguration): IPlugin => {
  return {
    register: async (server: Hapi.Server): Promise<void> => {
      await server.register({
        plugin: require("hapi-auth-cookie")
      });
      const _cache = server.cache({
        segment: "sessions",
        expiresIn: config.cookieTtl * 24 * 60 * 60 * 1000
      });
      (server.app as any).cache = _cache;

      server.auth.strategy("session", "cookie", {
        password: config.cookieSecret,
        cookie: config.cookieName,
        appendNext: true,
        redirectTo: "/",
        isSecure: false,
        validateFunc: async (request: any, session: any) => {
          const value: TSession = (await _cache.get(session.sid)) as any;

          if (!!value) {
            return {
              valid: !!value,
              credentials: {
                ...value.user,
                role: value.roles
              },
              roles: value.roles
            };
          }

          return {
            valid: !!value,
            credentials: null,
            roles: null
          };
        }
      });

      server.auth.default("session");
    },
    info: () => {
      return {
        name: "hapi-auth-cookie",
        version: "9.1.0"
      };
    }
  };
};

export default Plugin;
