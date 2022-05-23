import * as Hapi from "hapi";
import IRouteArea from "../server/IRouteArea";
import HomeController from "../controller/HomeController";

const AuthenticationArea = ({ homeController }: any): IRouteArea => {
  let _controller = homeController as HomeController;
  return {
    registerRoutes(server: Hapi.Server) {
      server.bind(_controller);

      server.route({
        method: "GET",
        path: "/api/users",
        options: {
          auth: {
            mode: "try"
          },
          plugins: { "hapi-auth-cookie": { redirectTo: false } },
          handler: _controller.showHomePage
        }
      });

      server.route({
        method: ["GET", "POST"],
        path: "/{any*}",
        handler: (request, h) => {
          let error = Error();
          return h
            .view("error", {
              pageNotFound: true,
              error
            })
            .code(404);
        }
      });
    }
  };
};

export default AuthenticationArea;
