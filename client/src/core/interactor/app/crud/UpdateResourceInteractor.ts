import { RequestArgs } from "../../../service/HttpService";
import {
  IModelMapper,
  IParamMapper,
  ISimpleCRUDServiceFactory
} from "../../../service/SimpleCRUDServiceFactory";

export default class UpdateResourceInteractor<T> {
  private serviceFactory: ISimpleCRUDServiceFactory<T>;

  constructor({ simpleCRUDServiceFactory }: any) {
    this.serviceFactory = simpleCRUDServiceFactory;
  }

  async execute(
    basePath: string,
    ModelMapper: IModelMapper<T>,
    ParamMapper: IParamMapper<T>,
    model: T,
    id: any,
    args?: RequestArgs
  ) {
    return this.serviceFactory
      .create({
        basePath,
        ModelMapper,
        ParamMapper
      })
      .updateResource(model, id, args);
  }
}
