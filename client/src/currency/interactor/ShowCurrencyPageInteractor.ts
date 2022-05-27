import Application from "../../Application";
import CurrencyPresenter, {
  ICurrencyPresenter,
} from "../presenter/CurrencyPresenter";
import { ICurrencyService } from "../service/CurrencyService";

export default class ShowCurrencyPageInteractor {
  private application: Application;
  private output?: ICurrencyPresenter;
  private currencyService: ICurrencyService;

  constructor({ application, currencyService }: any) {
    this.application = application;
    this.currencyService = currencyService;
  }

  execute() {
    this.output = CurrencyPresenter({
      application: this.application,
      initialState: { currencies: [] },
    });
    this.currencyService.getCurrencies().then(this.output.load);

    //console.log(this.output);
    return this.output;
  }
}
