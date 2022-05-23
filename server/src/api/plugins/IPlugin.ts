import * as Hapi from 'hapi';

import {TPluginInfo} from './TPluginInfo';
import {TPluginOptions} from './TPluginOptions'

export interface IPlugin{
  register(server: Hapi.Server, options?: TPluginOptions): Promise<void>;
  info(): TPluginInfo;
};

