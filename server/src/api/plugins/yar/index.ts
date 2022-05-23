import { IPlugin } from "../IPlugin";
import * as Hapi from "hapi";
import { TServerConfiguration } from "../../../config";
import { TSession } from "../../../model/server/Session";

const Plugin = (config: TServerConfiguration): IPlugin => {
  const options = {
    storeBlank: false,
    cache: {
      expiresIn: config.cookieTtl * 24 * 60 * 60 * 1000
    },
    cookieOptions: {
      password: config.cookieSecret,
      isSecure: false
    }
  };

  const handlePreResponse: Hapi.Lifecycle.Method = (request, h, err) => {
    var response = request.response as Hapi.ResponseObject;

    if (typeof response.source === "object") {
      if (!(response.source as any).context) {
        (response.source as any).context = {};
      }

      var context = (response.source as any).context;
      var alert = request.yar.flash("alert");
      var error = request.yar.flash("error");
      var notice = request.yar.flash("notice");
      var success = request.yar.flash("success");

      context.flash = {};

      if (alert.length) {
        context.flash.alert = alert;
      }

      if (error.length) {
        context.flash.error = error;
      }

      if (notice.length) {
        context.flash.notice = notice;
      }

      if (success.length) {
        context.flash.success = success;
      }

      return h.continue;
    }

    return h.continue;
  };

  return {
    register: async (server: Hapi.Server): Promise<void> => {
      server.ext("onPreResponse", handlePreResponse);
      await server.register({
        plugin: require("yar"),
        options
      });
    },
    info: () => {
      return {
        name: "yar",
        version: "9.1.0"
      };
    }
  };
};

export default Plugin;
