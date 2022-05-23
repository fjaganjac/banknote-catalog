import { IPlugin } from "../IPlugin";
import * as Hapi from "hapi";
import { TServerConfiguration } from "../../../config";

const Hapih2o2 = (config: TServerConfiguration): IPlugin => {
  return {
    register: (server: Hapi.Server): Promise<void> => {
      const options = {};

      return server.register({
        plugin: require("h2o2"),
        options: options
      });
    },
    info: () => {
      return {
        name: "Hapi h2o2",
        version: "6.1.0"
      };
    }
  };
};

export default Hapih2o2;
