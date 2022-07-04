import { IBanknoteService } from "../../service/banknote/BanknoteService";

export default class EditBanknoteInteractor {
  private banknoteService: IBanknoteService;

  constructor({ banknoteService }: any) {
    this.banknoteService = banknoteService;
  }

  async execute(Edit: any) {
    return this.banknoteService.editBanknote(Edit);
  }
}
