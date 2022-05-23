import { IHttpService, RequestArgs } from "./HttpService";

export interface TSimpleCRUDServiceFactoryOptions<T> {
  basePath: string;
  ModelMapper?: IModelMapper<T>;
  ParamMapper?: IParamMapper<T>;
}
export interface ISimpleCRUDServiceFactory<T> {
  create(options: TSimpleCRUDServiceFactoryOptions<T>): ISimpleCRUDService<T>;
}
export interface ISimpleCRUDService<T> {
  createResource(obj: T, args?: RequestArgs): Promise<any>;
  updateResource(obj: T, id: any, args?: RequestArgs): void;
  deleteResource(id: any, args?: RequestArgs): void;
  getResourceEntries(args?: RequestArgs): Promise<T[]>;
  findResourceEntry(id: any, args?: RequestArgs): Promise<T>;
  getTextValue(args?: RequestArgs): Promise<string>;
}

export interface IModelMapper<T> {
  (item: any): T;
}
export interface IParamMapper<T> {
  (item: T): any;
}

const SimpleCRUDServiceFactory = <T>({
  httpService
}): ISimpleCRUDServiceFactory<T> => {
  const _http: IHttpService = httpService;
  const _baseUrl: string = "/api";

  return {
    create<T>({
      basePath,
      ModelMapper,
      ParamMapper
    }: TSimpleCRUDServiceFactoryOptions<T>) {
      const _basePath = basePath;
      return {
        async createResource(obj: T, args?: RequestArgs) {
          const path = _http.buildPath(_baseUrl, _basePath);
          const response = await _http.post(path, {
            form: true,
            ...args,
            params: ParamMapper?.(obj)
          });
          const responseJSON = await _http.toJSON(response);
          return ModelMapper?.(responseJSON);
        },
        async updateResource(obj: T, id: any, args?: RequestArgs) {
          const path = _http.buildPath(_baseUrl, _basePath, id);
          const response = await _http.put(path, {
            form: true,
            ...args,
            params: ParamMapper?.(obj)
          });
          return _http.toText(response);
        },
        async deleteResource(id: any, args?: RequestArgs) {
          const path = _http.buildPath(_baseUrl, _basePath, id);
          const response = await _http.remove(path, {
            form: true,
            ...args
          });
          return _http.toText(response);
        },
        async getResourceEntries(args?: RequestArgs) {
          const path = _http.buildPath(_baseUrl, _basePath);
          const response = await _http.get(path, args);
          const responseJSON = await _http.toJSON(response);
          return responseJSON.map(ModelMapper);
        },
        async findResourceEntry(id: any, args?: RequestArgs) {
          const path = _http.buildPath(_baseUrl, _basePath, id);
          const response = await _http.get(path, args);
          const responseJSON = await _http.toJSON(response);
          return ModelMapper?.(responseJSON);
        },
        async getTextValue(args?: RequestArgs) {
          const path = _http.buildPath(_baseUrl, _basePath);
          const response = await _http.get(path, args);
          const responseText = await _http.toText(response);
          return responseText;
        }
      } as ISimpleCRUDService<T>;
    }
  };
};
export default SimpleCRUDServiceFactory;
