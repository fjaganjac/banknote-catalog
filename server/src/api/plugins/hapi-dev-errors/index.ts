import { IPlugin } from "../IPlugin";
import * as Hapi from "hapi";

const Plugin = (): IPlugin => {
  return {
    register: (server: Hapi.Server): Promise<void> => {
      const options = {
        showErrors: process.env.NODE_ENV !== "production"
      };

      return server.register({
        plugin: require("hapi-dev-errors"),
        options: options
      });
    },
    info: () => {
      return {
        name: "Hapi Dev Errors",
        version: "1.1.0"
      };
    }
  };
};

export default Plugin;
