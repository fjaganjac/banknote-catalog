import { ICurrencyService } from "../../service/currency/CurrencyService";

export default class AddCurrencyInteractor {
  private currencyService: ICurrencyService;

  constructor({ currencyService }: any) {
    this.currencyService = currencyService;
  }

  async execute(Add: any) {
    return this.currencyService.addCurrency(Add);
  }
}
