import {
  createContainer,
  asFunction,
  asClass,
  asValue,
  Lifetime
} from "awilix";
import * as path from "path";

import { IConfiguration } from "../config";

import IModuleContainer from "./IModuleContainer";
import FileConfigurationProvider from "../config/FileConfigurationProvider";
import Configuration from "../config/Configuration";
import MySQLDatabasePort from "../repository/ports/MySQLDatabasePort";
import Task from "./Task";
import MailPort from "../repository/ports/MailPort";

const ModuleContainer = (): IModuleContainer => {
  const _container = createContainer({
    injectionMode: "PROXY"
  });

  _container.register({
    filePath: asValue(
      path.join(
        __dirname,
        `../../../config.${process.env.NODE_ENV || "development"}.json`
      )
    ),
    configurationProvider: asFunction(FileConfigurationProvider).singleton(),
    config: asFunction(Configuration).singleton(),
    mailPort: asFunction(MailPort),
    port: asFunction(MySQLDatabasePort)
      .singleton()
      .inject(() => ({
        config: _container
          .resolve<IConfiguration>("config")
          .getDatabaseConfiguration()
      })),
    container: asValue(_container),
    task: asClass(Task)
  });

  _container.loadModules(
    [
      [
        "server/lib/src/repository/**/!(Repository).js",
        {
          lifetime: Lifetime.TRANSIENT,
          register: asFunction
        }
      ],
      [
        "server/lib/src/api/controller/**/*.js",
        {
          register: asClass
        }
      ]
    ],
    {
      formatName: "camelCase"
    }
  );

  _container.loadModules(
    [
      [
        "server/lib/src/interactor/**/!(Interactable).js",
        {
          register: asClass
        }
      ]
    ],
    {
      formatName: "camelCase"
    }
  );

  _container.loadModules(
    [
      [
        "server/lib/src/service/**/!(Service).js",
        {
          register: asFunction
        }
      ]
    ],
    {
      formatName: "camelCase"
    }
  );

  _container.loadModules(
    [
      [
        "server/lib/src/api/routes/**.js",
        {
          register: asFunction
        }
      ]
    ],
    {
      formatName: "camelCase"
    }
  );

  return <IModuleContainer>{
    resolve<T>(name: string) {
      return _container.resolve(name);
    },
    createScope() {
      return _container.createScope();
    }
  };
};

export default ModuleContainer;
