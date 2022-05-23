import { TServerConfiguration, TDatabaseConfiguration } from "config";
import TEmailConfiguration from "./TEmailConfiguration";

export interface IConfiguration {
  getDatabaseConfiguration(): TDatabaseConfiguration;
  getServerConfiguration(): TServerConfiguration;
  getEmailConfiguration(): TEmailConfiguration;
}
