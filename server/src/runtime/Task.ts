import IModuleContainer from "runtime/IModuleContainer";
import { IDataPort } from "repository/ports";
import { Pool } from "promise-mysql";
import { asValue } from "awilix";

export default class Task {
  private container: IModuleContainer;
  private port: IDataPort;

  constructor({ port, container }: any) {
    this.port = port;
    this.container = container;
  }

  public async start<T>(
    name: string,
    callback: (t: T) => any,
    isTransaction: boolean = false
  ) {
    const connection = await (this.port as Pool).getConnection();
    if (isTransaction) {
      await connection.beginTransaction();
    }
    let scope = this.container.createScope();
    scope.register("port", asValue(connection));
    let interactor = scope.resolve(name + "Interactor") as T;
    try {
      let result = await callback(interactor);
      if (isTransaction) {
        await connection.commit();
      }
      connection.release();
      return result;
    } catch (error) {
      if (isTransaction) {
        await connection.rollback();
      }
      connection.release();
      throw error;
      
    }
  }
}
