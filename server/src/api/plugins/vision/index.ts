import { IPlugin } from "../IPlugin";
import * as Hapi from "hapi";

const VisionPlugin = (): IPlugin => {
  return {
    register: (server: Hapi.Server): Promise<void> => {
      return server.register({
        plugin: require("vision")
      });
    },
    info: () => {
      return { name: "Vision", version: "4.1.1" };
    }
  };
};

export default VisionPlugin;
