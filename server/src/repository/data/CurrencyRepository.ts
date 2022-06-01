import Repository from "../Repository";
import { IDataPort } from "../ports";
import queries from "../../db/sql/queries";

export interface ICurrencyRepository {
  findAllCurrencies(): Promise<any>;
}

const CurrencyRepository = Repository(
  ({ port }: { port: IDataPort }): ICurrencyRepository => {
    return {
      async findAllCurrencies() {
        return port.query(queries.currencies.findAllCurrencies);
      }
    };
  }
);



export default CurrencyRepository;
