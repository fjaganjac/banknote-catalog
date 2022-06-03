import { IHttpService } from "../../core/service/HttpService";
import { ICurrency } from "../model/currency/Currency";

export interface ICurrencyService {
  getCurrencies(): Promise<ICurrency[]>;
}

const CurrencyService = ({ httpService }): ICurrencyService => {
  const _http: IHttpService = httpService;
  const _baseUrl: string = "/currencies";
  function mapCurrencies(currencies: any) {
    var arrayICuuency = Array();
    currencies.map((crr) => {
      const iCurrency: ICurrency = {
        id: crr.id,
        currencyCode: crr.code,
        currencyName: crr.description,
        countryCurrency: crr.name,
        key: crr.id
      };
      arrayICuuency.push(iCurrency);
    });
    return arrayICuuency;
  }

  return {
    async getCurrencies() {
      const path = _http.buildPath("/api", _baseUrl);
      const response = await _http.get(path);
      const responseJSON = await _http.toJSON(response);
      return mapCurrencies(responseJSON);
    }
  };
};
export default CurrencyService;
