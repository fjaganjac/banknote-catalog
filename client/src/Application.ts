import { Action, To } from "history";
import moment from "moment";
import "moment/locale/bs";
import { IArea } from "./core/areas/Area";
import HandleApplicationErrorInteractor from "./core/interactor/app/HandleApplicationErrorInteractor";
import { IStore } from "./core/model/runtime/state/Store";
import IModuleContainer from "./core/runtime/IModuleContainer";
import ModuleContainer from "./core/runtime/ModuleContainer";
import { IRouter, Router } from "./core/runtime/Router";
import { ILocaleProvider } from "./core/service/locale/LocaleProvider";

export default class Application {
  private _router: IRouter;
  private _container: IModuleContainer;
  private _localeProvider: ILocaleProvider;

  private _areas = ["home", "currency"];

  get container() {
    return this._container;
  }

  get navigator() {
    return this._router;
  }

  get localeProvider() {
    return this._localeProvider;
  }

  constructor(context: any, rootElement: HTMLElement) {
    this._container = ModuleContainer(this);
    this._router = Router(context, rootElement, this, []);
    this._container.registerValue("router", this._router);
    this._localeProvider =
      this.container.resolve<ILocaleProvider>("localeProvider");

    moment.locale(this._localeProvider.getCurrentLanguage());
    window["__secretApplication"] = this;
  }

  private registerGlobalErrorHandler() {
    const _container = this.container;
    window.addEventListener("unhandledrejection", function (e) {
      var reason = e.reason ? e.reason : e.type;

      e.preventDefault();
      if (!(e as any).reason.handled) {
        _container
          .resolve<HandleApplicationErrorInteractor>("handleApplicationError")
          .execute(reason);
      }
    });
  }

  public changeSystemLanguage(languageCode: string) {
    this._container.registerValue("language", languageCode);
  }

  private registerAreas(areas: string[]) {
    areas.forEach((area) => {
      this._container.resolve<IArea>(`${area}Area`).register();
    });
  }

  async start() {
    this.registerAreas(this._areas);
    this._router.bindLocationListener();
    this._router.showLocation({
      action: Action.Push,
      location: {
        pathname: window.location.pathname,
        search: window.location.search,
      },
    }) as To;

    this.registerGlobalErrorHandler();
  }

  public get store() {
    return this._container.resolve<IStore>("store");
  }

  addLocale(locale: string, translations = {}) {
    if (locale) {
      this.localeProvider.addLocale(locale, translations);
    }
  }
}
