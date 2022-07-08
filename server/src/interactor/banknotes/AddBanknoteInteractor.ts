import { TBanknote } from "../../model/banknote/Banknote";
import { IBanknoteService } from "../../service/banknote/BanknoteService";

export default class AddBanknoteInteractor {
  private banknoteService: IBanknoteService;

  constructor({ banknoteService }: any) {
    this.banknoteService = banknoteService;
  }

  async execute(banknote: TBanknote) {
    return this.banknoteService.addBanknote(banknote);
  }
}
