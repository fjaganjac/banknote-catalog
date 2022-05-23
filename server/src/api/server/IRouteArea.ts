import * as Hapi from 'hapi';
import { TServerConfiguration } from 'config';

export default interface IRouteArea {
  registerRoutes(server: Hapi.Server, config?: TServerConfiguration): void
}