import Service from "../Service";
import { ICurrencyRepository } from "../../repository/data/CurrencyRepository";
import Currency, { TCurrency } from "../../model/currency/Currency";
import { IConfiguration } from "config";
import { extractResultSetValues } from "../../repository/Repository";

export interface ICurrencyService {
  findAllCurrencies(): Promise<TCurrency>;
}

const CurrencyService = Service(
  ({
    currencyRepository,
    config
  }: {
    currencyRepository: ICurrencyRepository;
    config: IConfiguration;
  }): ICurrencyService => {
    const extract = extractResultSetValues;
    return {
      async findAllCurrencies() {
        const result = await currencyRepository.findAllCurrencies();
        if (result) {
          return result.map((item: any) => {
            try {
              let model = extract<TCurrency>(item, [
                "id",
                "code",
                "description",
                "countryId",
                "name",
              ]);
              
              return Currency(model);
            } catch (error) {
              throw error;
            }
          });
        } else {
          return null;
        }
      }
    };
  }
);

export default CurrencyService;
