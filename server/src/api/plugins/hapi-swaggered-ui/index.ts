import { IPlugin } from "../IPlugin";
import * as Hapi from "hapi";

const HapiDevErrorPlugin = (): IPlugin => {
  return {
    register: (server: Hapi.Server): Promise<void> => {
      const options = {
        title: "OS API",
        path: "/docs",
        auth: false,
        authorization: {
          field: "Authorization",
          scope: "header", // header works as well
          // valuePrefix: 'bearer '// prefix incase
          placeholder: "Enter your apiKey here"
        },
        swaggerOptions: {
          validatorUrl: null
        }
      };

      return server.register({
        plugin: require("hapi-swaggered-ui"),
        options: options
      });
    },
    info: () => {
      return {
        name: "Hapi Swaggered UI",
        version: "2.6.2"
      };
    }
  };
};

export default HapiDevErrorPlugin;
