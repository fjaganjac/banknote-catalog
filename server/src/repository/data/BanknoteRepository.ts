import Repository from "../Repository";
import { IDataPort } from "../ports";
import queries from "../../db/sql/queries";
import { TBanknote } from "../../model/banknote/Banknote";

export interface IBanknoteRepository {
  findAllBanknotes(): Promise<any>,
  editBanknote(editObj: TBanknote): Promise<any>,
  addBanknote(AddObj: TBanknote): Promise<any>,
  deleteBanknote(id: number): Promise<any>

}

const BanknoteRepository = Repository(
  ({ port }: { port: IDataPort }): IBanknoteRepository => {
    return {
      async findAllBanknotes() {
        return port.query(queries.banknotes.findAllBanknotes);
      },
      async editBanknote(editObj: Object) {
        return port.query(queries.banknotes.editBanknote(editObj));
      },
      async addBanknote(editObj: Object) {
        return port.query(queries.banknotes.addBanknote(editObj));
      },
      async deleteBanknote(id: number) {
        return port.query(queries.banknotes.deleteBanknote(id));
      },
      
    };
  }
);



export default BanknoteRepository;
