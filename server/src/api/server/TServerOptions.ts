import {TServerConfiguration} from '../../config';
import IRouteArea from './IRouteArea';
import Task from '../../runtime/Task';

export interface TServerOptions{
  task: Task;
  config: TServerConfiguration,
  routeAreas: IRouteArea[]
}