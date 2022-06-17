import { ICurrencyService } from "../../service/currency/CurrencyService";

export default class EditCurrencyInteractor {
  private currencyService: ICurrencyService;

  constructor({ currencyService }: any) {
    this.currencyService = currencyService;
  }

  async execute(Edit: any) {
    return this.currencyService.editCurrency(Edit);
  }
}
