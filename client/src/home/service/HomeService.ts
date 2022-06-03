import { IHttpService } from "../../core/service/HttpService";

export interface IHomeService {
  getUsers(): Promise<any>;
}

const HomeService = ({ httpService }): IHomeService => {
  const _http: IHttpService = httpService;
  const _baseUrl: string = "/users";

  return {
    async getUsers() {
      const path = _http.buildPath("/api", _baseUrl);
      const response = await _http.get(path);
      return _http.toText(response);
    }
  };
};

export default HomeService;
