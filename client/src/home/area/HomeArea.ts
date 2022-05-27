import React from "react";
import Application from "../../Application";
import Area, { IArea } from "../../core/areas/Area";
import { IRouter } from "../../core/runtime/Router";
import ShowHomePageInteractor from "../interactor/ShowHomePageInteractor";
import HomeService from "../service/HomeService";

export default class HomeArea extends Area implements IArea {
  private application: Application;
  private router: IRouter;

  constructor({
    application,
    router,
  }: {
    application: Application;
    router: IRouter;
  }) {
    super();
    this.application = application;
    this.router = router;
  }

  private registerModules() {
    const container = this.application.container;
    container.registerFunction("homeService", HomeService, "home");

    container.registerInteractor("showHomePage", ShowHomePageInteractor);
  }

  register(params: any) {
    this.registerModules();
    this.router.registerRoutes(
      {
        path: "/",
        page: this.createPage({
          Page: React.lazy(() => import("../ui/pages/HomePage")),
          action: this.showHomePage.bind(this),
        }),
        options: {
          secure: true,
        },
      },
      {
        path: "/home",
        page: this.createPage({
          Page: React.lazy(() => import("../ui/pages/HomePage")),
          action: this.showHomePage.bind(this),
        }),
        options: {
          secure: true,
        },
      }
    );
  }

  public showHomePage() {
    return this.application.container
      .resolve<ShowHomePageInteractor>("showHomePage")
      .execute();
  }
}
