import * as Hapi from "hapi";
import IRouteArea from "../server/IRouteArea";
import BanknoteController from "../controller/BanknoteController";

const BanknoteArea = ({ banknoteController }: any): IRouteArea => {
  let _controller = banknoteController as BanknoteController;
  return {
    registerRoutes(server: Hapi.Server) {
      server.bind(_controller);

      server.route({
        method: "GET",
        path: "/api/banknotes",
        options: {
          auth: {
            mode: "try"
          },
          plugins: { "hapi-auth-cookie": { redirectTo: false } },
          handler: _controller.getBanknotes
        }
      });

      server.route({
        method: "PUT",
        path: "/api/banknotes/{id}",
        options: {
          auth: {
            mode: "try"
          },
          plugins: { "hapi-auth-cookie": { redirectTo: false } },
          handler: _controller.editBanknote
        }
      });

      
      server.route({
        method: "POST",
        path: "/api/banknotes",
        options: {
          auth: {
            mode: "try"
          },
          plugins: { "hapi-auth-cookie": { redirectTo: false } },
          handler: _controller.addBanknote
        }
      });

      
      server.route({
        method: "DELETE",
        path: "/api/banknotes/{id}",
        options: {
          auth: {
            mode: "try"
          },
          plugins: { "hapi-auth-cookie": { redirectTo: false } },
          handler: _controller.deleteBanknote
        }
      });
    }
  };
};

export default BanknoteArea;
