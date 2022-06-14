import { IHttpService } from "../../core/service/HttpService";
import Currency, { ICurrency } from "../model/currency/Currency";

export interface ICurrencyService {
  getCurrencies(): Promise<ICurrency[]>;
}

const CurrencyService = ({ httpService }): ICurrencyService => {
  const _http: IHttpService = httpService;
  const _baseUrl: string = "/api/currencies";

  function mapCurrencies(json: any) {
    return json.map((currency) => {
      return Currency(currency);
    });
  }
  return {
    async getCurrencies() {
      const path = _http.buildPath("", _baseUrl);
      const response = await _http.get(path);
      const responseJSON = await _http.toJSON(response);
      return mapCurrencies(responseJSON);
    }
  };
};
export default CurrencyService;
