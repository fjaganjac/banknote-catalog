import { IHttpService } from "../../core/service/HttpService";
import { ICurrency } from "../model/currency/Currency";

export interface ICurrencyService {
  getCurrencies(): Promise<ICurrency[]>;
}

const CurrencyService = ({ httpService }): ICurrencyService => {
  const _http: IHttpService = httpService;
  const _baseUrl: string = "/users";

  return {
    async getCurrencies() {
      const currencies = new Array();

      const currency1 = {
        id: 0,
        code: 12345,
        name: "Euro",
        country: "Njemacka",
        key: "0",
      };
      const currency2 = {
        id: 1,
        code: 6789,
        name: "Dolar",
        country: "Amerika",
        key: "1",
      };

      currencies.push(currency1);
      currencies.push(currency2);
      return currencies;
    },
  };
};

export default CurrencyService;
