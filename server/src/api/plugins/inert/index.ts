import { IPlugin } from "../IPlugin";
import * as Hapi from "hapi";

const InertPlugin = (): IPlugin => {
  return {
    register: (server: Hapi.Server): Promise<void> => {
      return server.register({
        plugin: require("inert")
      });
    },
    info: () => {
      return {
        name: "Inert",
        version: "4.2.1"
      };
    }
  };
};

export default InertPlugin;
