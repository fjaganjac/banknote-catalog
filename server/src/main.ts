import Server from "./api/server/Server";
import { IConfiguration } from "./config";
import ModuleContainer from "./runtime/ModuleContainer";
import IRouteArea from "./api/server/IRouteArea";
import Task from "./runtime/Task";

const _container = ModuleContainer();
const _config = _container.resolve<IConfiguration>("config");
const _routeAreas = ["home", "currencies", "banknotes"].map(_container.resolve) as IRouteArea[];

const _server = Server({
  task: _container.resolve<Task>("task"),
  config: _config.getServerConfiguration(),
  routeAreas: _routeAreas
});

_server.start().then(() => {
  console.log("success");
});
