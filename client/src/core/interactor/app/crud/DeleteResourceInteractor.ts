import { RequestArgs } from "../../../service/HttpService";
import { ISimpleCRUDServiceFactory } from "../../../service/SimpleCRUDServiceFactory";

export default class DeleteResourceInteractor {
  private serviceFactory: ISimpleCRUDServiceFactory<any>;

  constructor({ simpleCRUDServiceFactory }: any) {
    this.serviceFactory = simpleCRUDServiceFactory;
  }

  async execute(basePath: string, id: any, args?: RequestArgs) {
    return this.serviceFactory
      .create({
        basePath
      })
      .deleteResource(id, args);
  }
}
