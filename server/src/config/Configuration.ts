import { IConfiguration, IConfigurationProvider } from "config";

const Configuration = ({
  configurationProvider
}: {
  configurationProvider: IConfigurationProvider;
}): IConfiguration => {
  return <IConfiguration>{
    getDatabaseConfiguration() {
      return configurationProvider.get("database");
    },
    getServerConfiguration() {
      return configurationProvider.get("server");
    },
    getEmailConfiguration() {
      return configurationProvider.get("email");
    }
  };
};

export default Configuration;
