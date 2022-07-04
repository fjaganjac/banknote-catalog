import { IBanknoteService } from "../../service/banknote/BanknoteService";

export default class AddBanknoteInteractor {
  private banknoteService: IBanknoteService;

  constructor({ banknoteService }: any) {
    this.banknoteService = banknoteService;
  }

  async execute(Add: any) {
    return this.banknoteService.addBanknote(Add);
  }
}
