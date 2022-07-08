import { IBanknoteService } from "../../service/banknote/BanknoteService";

export default class DeleteBanknoteInteractor {
  private banknoteService: IBanknoteService;

  constructor({ banknoteService }: any) {
    this.banknoteService = banknoteService;
  }

  async execute(id: number) {
    return this.banknoteService.deleteBanknote(id);
  }
}
