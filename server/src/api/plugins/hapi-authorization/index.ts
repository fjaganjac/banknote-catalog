import { IPlugin } from "../IPlugin";
import * as Hapi from "hapi";
import { TServerConfiguration } from "../../../config";

const Plugin = (config: TServerConfiguration): IPlugin => {
  return {
    register: (server: Hapi.Server): Promise<void> => {
      return server.register({
        plugin: require("hapi-authorization")
      });
    },
    info: () => {
      return {
        name: "Hapi Authorization",
        version: "4.0.0"
      };
    }
  };
};

export default Plugin;
