import Repository from "../Repository";
import { IDataPort } from "../ports";
import queries from "../../db/sql/queries";

export interface ICurrencyRepository {
  findAllCurrencies(): Promise<any>,
  editCurrency(EditObj: any): Promise<any>,
  addCurrency(AddObj: any): Promise<any>,
  deleteCurrency(id: number): Promise<any>;  
}

const CurrencyRepository = Repository(
  ({ port }: { port: IDataPort }): ICurrencyRepository => {
    return {
      async findAllCurrencies() {
        return port.query(queries.currencies.findAllCurrencies);
      },

      async editCurrency(EditObj) {
        return port.query(queries.currencies.editCurrency(EditObj));
      },

      async addCurrency(AddObj) {
        return port.query(queries.currencies.addCurrency(AddObj));
      },

      async deleteCurrency(id) {
        return port.query(queries.currencies.deleteCurrency(id));
      }
    };
  }
);



export default CurrencyRepository;
