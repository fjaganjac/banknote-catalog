import { IPlugin } from "../IPlugin";
import * as Hapi from "hapi";

const HapiDevErrorPlugin = (): IPlugin => {
  return {
    register: (server: Hapi.Server): Promise<void> => {
      const options = {
        auth: false,
        stripPrefix: "/api",
        info: {
          title: "Otvorena Sjednica API",
          description: "Powered by node & hapi",
          version: "1.0"
        }
      };

      return server.register({
        plugin: require("hapi-swaggered"),
        options: options
      });
    },
    info: () => {
      return {
        name: "Hapi Swaggered",
        version: "2.12.2"
      };
    }
  };
};

export default HapiDevErrorPlugin;
