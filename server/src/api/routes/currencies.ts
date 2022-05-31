import * as Hapi from "hapi";
import IRouteArea from "../server/IRouteArea";
import CurrencyController from "../controller/CurrencyController";

const CurrencyArea = ({ currencyController }: any): IRouteArea => {
  let _controller = currencyController as CurrencyController;
  return {
    registerRoutes(server: Hapi.Server) {
      server.bind(_controller);
      
      server.route({
        method: "GET",
        path: "/api/currencies",
        options: {
          auth: {
            mode: "try"
          },
          plugins: { "hapi-auth-cookie": { redirectTo: false } },
          handler: _controller.getCurrencies
        }
      });
    }
  };
};

export default CurrencyArea;
