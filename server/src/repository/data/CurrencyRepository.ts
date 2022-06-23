import Repository from "../Repository";
import { IDataPort } from "../ports";
import queries from "../../db/sql/queries";
import { TCurrency } from "../../model/currency/Currency";

export interface ICurrencyRepository {
  findAllCurrencies(): Promise<any>,
  editCurrency(EditObj: TCurrency): Promise<any>,
  addCurrency(AddObj: TCurrency): Promise<any>,
  deleteCurrency(id: number): Promise<any>;
  getCurrency(id:number): Promise<any>;

}

const CurrencyRepository = Repository(
  ({ port }: { port: IDataPort }): ICurrencyRepository => {
    return {
      async findAllCurrencies() {
        return port.query(queries.currencies.findAllCurrencies);
      },

      async editCurrency(EditObj: TCurrency) {
        return port.query(queries.currencies.editCurrency(EditObj));
      },

      async addCurrency(AddObj: TCurrency) {
        return port.query(queries.currencies.addCurrency(AddObj));
      },

      async deleteCurrency(id: number) {
        return port.query(queries.currencies.deleteCurrency(id));
      },

      async getCurrency(id: number) {
        return port.query(queries.currencies.getCurrency(id));
      }
    };
  }
);



export default CurrencyRepository;
