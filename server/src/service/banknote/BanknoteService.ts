import Service from "../Service";
import { IBanknoteRepository } from "../../repository/data/BanknoteRepository";
import Banknote, { TBanknote } from "../../model/banknote/Banknote";
import { IConfiguration } from "config";
import { extractResultSetValues } from "../../repository/Repository";

export interface IBanknoteService {
  findAllBanknotes(): Promise <TBanknote[] | null>;
  editBanknote(editObj: TBanknote): Object;
  addBanknote(addObj: TBanknote): Object;
  deleteBanknote(id: number): Object;
}

const BanknoteService = Service(    
  ({
    banknoteRepository,
    config
  }: {
    banknoteRepository: IBanknoteRepository;
    config: IConfiguration;
  }): IBanknoteService => {
    const extract = extractResultSetValues;
    return {
      async findAllBanknotes() {
        const result = await banknoteRepository.findAllBanknotes();
        if(result == null) {
          return null;
        }
        if (result) {
          return result.map((item: any) => {
            try {
              let model = extract <TBanknote> (item, [
                "id",
                "filename",
                "name",
                "description",
                "active"
              ]);

              return Banknote(model);
            } catch (error) {
              throw error;
            }
          });
        } else {
          return null;
        }
      },
      async editBanknote(editObj: TBanknote) {
        const result = await banknoteRepository.editBanknote(editObj);
        if(result) {
            return {message: "novčanica je promjenjena"};
        }
        else {
            return null;
        }
      },
      
      async addBanknote(addObj: TBanknote) {
        const result = await banknoteRepository.addBanknote(addObj);
        if(result) {
            return {message: "novčanica je dodana"};
        }
        else {
            return null;
        }
      },

      
      async deleteBanknote(id: number) {
        const result = await banknoteRepository.deleteBanknote(id);
        if(result) {
            return {message: "novčanica je obrisana"};
        }
        else {
            return null;
        }
      }
    }
  }
);

export default BanknoteService;