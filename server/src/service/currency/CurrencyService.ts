import Service from "../Service";
import { ICurrencyRepository } from "../../repository/data/CurrencyRepository";
import Currency, { TCurrency } from "../../model/currency/Currency";
import { IConfiguration } from "config";
import { extractResultSetValues } from "../../repository/Repository";

export interface ICurrencyService {
  findAllCurrencies(): Promise<TCurrency>;
  editCurrency(EditObj: TCurrency): Object;
  addCurrency(AddObj: TCurrency): Object;
  deleteCurrency(id: number): Object;
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

      async editCurrency(EditObj: TCurrency) {
        const getOldName = await currencyRepository.getCurrency(EditObj.id);
        if (getOldName) {
          let oldName = getOldName.map((item: any) => {
            try {
              let model = extract<TCurrency>(item, [
                "name",
                "code",
                "description",
                "dateCreated",
                "userCreated",
                "country"
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

      async addCurrency(AddObj: TCurrency) {
        const result = await currencyRepository.addCurrency(AddObj);
        if (result) {
          return {message: `Valuta ${AddObj.name} je uspješno dodana.`};
        } else {
          return null;
        }
      },

      async deleteCurrency(id: number) {
        const getOldName = await currencyRepository.getCurrency(id);
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
