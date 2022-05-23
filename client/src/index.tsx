
import "moment/locale/bs";
import Application from "./Application";
import "./core/ui/assets/less/all.less";
import bsLocale from "./locale/bs.json";

const rootElement = document.getElementById("app");

export function run(context = "/") {
  if (rootElement) {
    const app = new Application(context, rootElement);
    app.addLocale("bs", bsLocale);

    return app.start();
  }
}

run();
