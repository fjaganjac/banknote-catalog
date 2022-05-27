import React from "react";
import Application from "../../Application";
import Area, { IArea } from "../../core/areas/Area";
import { IRouter } from "../../core/runtime/Router";
import ShowCurrencyPageInteractor from "../interactor/ShowCurrencyPageInteractor";
import CurrencyService from "../service/CurrencyService";

export default class CurrencyArea extends Area implements IArea {
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
    container.registerFunction("currencyService", CurrencyService, "currency");

    container.registerInteractor(
      "showCurrencyPage",
      ShowCurrencyPageInteractor
    );
  }

  register(params: any) {
    this.registerModules();
    this.router.registerRoutes({
      path: "/currency",
      page: this.createPage({
        Page: React.lazy(() => import("../ui/pages/CurrencyPage")),
        action: this.showCurrencyPage.bind(this),
      }),
      options: {
        secure: true,
      },
    });
  }

  public showCurrencyPage() {
    return this.application.container
      .resolve<ShowCurrencyPageInteractor>("showCurrencyPage")
      .execute();
  }
}
