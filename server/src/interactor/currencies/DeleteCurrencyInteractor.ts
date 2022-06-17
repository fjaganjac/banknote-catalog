import { ICurrencyService } from "../../service/currency/CurrencyService";

export default class DeleteCurrencyInteractor {
  private currencyService: ICurrencyService;

  constructor({ currencyService }: any) {
    this.currencyService = currencyService;
  }

  async execute(Delete: any) {
    return this.currencyService.deleteCurrency(Delete);
  }
}
