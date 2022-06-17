import Service from "../Service";
import { ICurrencyRepository } from "../../repository/data/CurrencyRepository";
import Currency, { TCurrency } from "../../model/currency/Currency";
import { IConfiguration } from "config";
import { extractResultSetValues } from "../../repository/Repository";

export interface ICurrencyService {
  findAllCurrencies(): Promise<TCurrency>;
  editCurrency(Edit: any): Promise<any>;
  addCurrency(Add: any): Promise<any>;
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
                "name",
                "code",
                "country"
              ]);

              return Currency(model);
            } catch (error) {
              throw error;
            }
          });
        } else {
          return null;
        }
      },

      async editCurrency(Edit) {
        const result = await currencyRepository.editCurrency(Edit);
        if (result) {
          return {message: `Valuta ${Edit.id} je uspješno izmijenjena`};
        } else {
          return null;
        }
      },

      async addCurrency(Add) {
        const result = await currencyRepository.addCurrency(Add);
        if (result) {
          return {message: `Valuta ${Add.name} je uspješno dodana`};
        } else {
          return null;
        }
      }
    };
  }
);

export default CurrencyService;
