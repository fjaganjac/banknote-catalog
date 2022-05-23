import { IPlugin } from "../IPlugin";
import * as Hapi from "hapi";

const HapiEndingPlugin = (): IPlugin => {
  return {
    register: (server: Hapi.Server): Promise<void> => {
      const options = {
        enabled: true,
        assetsPath: "resources"
      };

      return server.register({
        plugin: require("hapi-ending"),
        options: options
      });
    },
    info: () => {
      return {
        name: "Hapi Ending",
        version: "0.9.2"
      };
    }
  };
};

export default HapiEndingPlugin;
