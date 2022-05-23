import { AwilixContainer } from "awilix";

export default interface IModuleContainer {
  resolve<T>(name:string):T,
  createScope(): AwilixContainer
}

