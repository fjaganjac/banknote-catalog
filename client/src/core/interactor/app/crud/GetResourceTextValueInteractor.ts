import { RequestArgs } from "../../../service/HttpService";
import { ISimpleCRUDServiceFactory } from "../../../service/SimpleCRUDServiceFactory";

export default class GetResourceTextValueInteractor {
  private serviceFactory: ISimpleCRUDServiceFactory<string>;

  constructor({ simpleCRUDServiceFactory }: any) {
    this.serviceFactory = simpleCRUDServiceFactory;
  }

  async execute(basePath: string, args?: RequestArgs) {
    return this.serviceFactory
      .create({
        basePath
      })
      .getTextValue(args);
  }
}
