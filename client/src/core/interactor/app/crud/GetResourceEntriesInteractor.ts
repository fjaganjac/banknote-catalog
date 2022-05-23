import { RequestArgs } from "../../../service/HttpService";
import {
  IModelMapper,
  IParamMapper,
  ISimpleCRUDServiceFactory
} from "../../../service/SimpleCRUDServiceFactory";

export default class GetAllResourceEntriesInteractor<T> {
  private serviceFactory: ISimpleCRUDServiceFactory<T>;

  constructor({ simpleCRUDServiceFactory }: any) {
    this.serviceFactory = simpleCRUDServiceFactory;
  }

  async execute(
    basePath: string,
    ModelMapper: IModelMapper<T>,
    ParamMapper: IParamMapper<T>,
    args?: RequestArgs
  ) {
    return this.serviceFactory
      .create({
        basePath,
        ModelMapper,
        ParamMapper
      })
      .getResourceEntries(args);
  }
}
