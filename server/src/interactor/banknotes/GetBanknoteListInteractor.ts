import { IBanknoteService } from "../../service/banknote/BanknoteService";

export default class GetBanknoteListInteractor {
  private banknoteService: IBanknoteService;

  constructor({ banknoteService }: any) {
    this.banknoteService = banknoteService;
  }

  async execute() {
    return this.banknoteService.findAllBanknotes();
  }
}
