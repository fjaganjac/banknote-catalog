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
        if(!result) {
          return null;
        }
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
      },
      async editBanknote(editObj: TBanknote) {
        const result = await banknoteRepository.editBanknote(editObj);
        if(result) {
            return {message: "novčanica je promjenjena"};
        }
        return null;
        
      },
      
      async addBanknote(addObj: TBanknote) {
        const result = await banknoteRepository.addBanknote(addObj);
        if(result) {
            return {message: "novčanica je dodana"};
        }
        return null;
      },

      
      async deleteBanknote(id: number) {
        const result = await banknoteRepository.deleteBanknote(id);
        if(result) {
            return {message: "novčanica je obrisana"};
        }
        return null;
      }
    }
  }
);

export default BanknoteService;