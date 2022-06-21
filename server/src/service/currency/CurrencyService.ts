import Service from "../Service";
import { ICurrencyRepository } from "../../repository/data/CurrencyRepository";
import Currency, { TCurrency } from "../../model/currency/Currency";
import { IConfiguration } from "config";
import { extractResultSetValues } from "../../repository/Repository";

export interface ICurrencyService {
  findAllCurrencies(): Promise<TCurrency>;
  editCurrency(EditObj: any): Promise<any>;
  addCurrency(AddObj: any): Promise<any>;
  deleteCurrency(id: number): Promise<any>;
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

      async editCurrency(EditObj) {
        const getOldName = await currencyRepository.getOldName(EditObj.id);
        if (getOldName) {
          let oldName = getOldName.map((item: any) => {
            try {
              let model = extract<TCurrency>(item, [
                "name",
              ]);
              return Currency(model);
            } catch (error) {
              throw error;
            }
          })[0].name;
          const result = await currencyRepository.editCurrency(EditObj);
          if(result) {
            return {message: `Valuta ${oldName} je uspješno izmijenjena.`};
          }
          else {
            return null;
          }
        } else {
          return null;
        }
      },

      async addCurrency(AddObj) {
        const result = await currencyRepository.addCurrency(AddObj);
        if (result) {
          return {message: `Valuta ${AddObj.name} je uspješno dodana.`};
        } else {
          return null;
        }
      },

      async deleteCurrency(id) {
        const getOldName = await currencyRepository.getOldName(id);
        if (getOldName) {
          let oldName = getOldName.map((item: any) => {
            try {
              let model = extract<TCurrency>(item, [
                "name",
              ]);
              return Currency(model);
            } catch (error) {
              throw error;
            }
          })[0].name;
          const result = await currencyRepository.deleteCurrency(id);
          if(result) {
            return {message: `Valuta ${oldName} je uspješno izbrisana.`};
          }
          else {
            return null;
          }
        } else {
          return null;
        }
      },
    };
  }
);

export default CurrencyService;
