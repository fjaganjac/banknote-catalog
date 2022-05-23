import { RequestArgs } from "../../../service/HttpService";
import {
  IModelMapper,
  IParamMapper,
  ISimpleCRUDServiceFactory
} from "../../../service/SimpleCRUDServiceFactory";

export default class CreateResourceInteractor<T> {
  private serviceFactory: ISimpleCRUDServiceFactory<T>;

  constructor({ simpleCRUDServiceFactory }: any) {
    this.serviceFactory = simpleCRUDServiceFactory;
  }

  async execute(
    basePath: string,
    ModelMapper: IModelMapper<T>,
    ParamMapper: IParamMapper<T>,
    model: T,
    args?: RequestArgs
  ) {
    const result = await this.serviceFactory
      .create({
        basePath,
        ModelMapper,
        ParamMapper
      })
      .createResource(model, args);
    return result;
  }
}
