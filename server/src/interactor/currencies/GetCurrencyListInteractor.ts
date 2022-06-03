import { ICurrencyService } from "../../service/currency/CurrencyService";

export default class GetCurrencyListInteractor {
  private currencyService: ICurrencyService;

  constructor({ currencyService }: any) {
    this.currencyService = currencyService;
  }

  async execute() {
    return this.currencyService.findAllCurrencies();
  }
}
