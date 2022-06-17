import Repository from "../Repository";
import { IDataPort } from "../ports";
import queries from "../../db/sql/queries";

export interface ICurrencyRepository {
  findAllCurrencies(): Promise<any>,
  editCurrency(Edit: any): Promise<any>,
  addCurrency(Add: any): Promise<any>,
  deleteCurrency(Delete: any): Promise<any>;  
}

const CurrencyRepository = Repository(
  ({ port }: { port: IDataPort }): ICurrencyRepository => {
    return {
      async findAllCurrencies() {
        return port.query(queries.currencies.findAllCurrencies);
      },

      async editCurrency(Edit) {
        return port.query(queries.currencies.editCurrency(Edit));
      },

      async addCurrency(Add) {
        return port.query(queries.currencies.addCurrency(Add));
      },

      async deleteCurrency(Delete) {
        return port.query(queries.currencies.deleteCurrency(Delete));
      }
    };
  }
);



export default CurrencyRepository;
