import { IConfigurationProvider, TDatabaseConfiguration, TServerConfiguration } from "../../config";

const DATABASE_CONFIG_ROOT: string = 'database';
const SERVER_CONFIG_ROOT: string = 'server';

export interface IConfigurationService {
  getDatabaseConfiguration(): TDatabaseConfiguration,
  getServerConfiguration(): TServerConfiguration,
  get(name: string): Object
}

const ConfigurationService = (provider: IConfigurationProvider): IConfigurationService => (
  {
    getDatabaseConfiguration(): TDatabaseConfiguration {
      return provider.get(DATABASE_CONFIG_ROOT) as TDatabaseConfiguration;
    },
    getServerConfiguration(): TServerConfiguration {
      return provider.get(SERVER_CONFIG_ROOT) as TServerConfiguration;
    },
    get(name: string): Object {
      return provider.get(name);
    }
  }
)

export default ConfigurationService;