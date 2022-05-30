import withStore, {
  TLoadingAwarePresenter,
  TPresentable,
} from "../../core/presenter/withStore";
import Application from "../../Application";
import { ICurrency } from "../model/currency/Currency";

export interface TCurrencyPresenter extends TLoadingAwarePresenter {
  currencies: ICurrency[];
}

export interface ICurrencyPresenter extends TCurrencyPresenter, TPresentable {
  load(currencies: ICurrency[]): void;
}

const defaultState: TCurrencyPresenter = {
  currencies: [],
};

const CurrencyPresenter = withStore<ICurrencyPresenter, TCurrencyPresenter>(
  ({ application, store, loader, translate }): ICurrencyPresenter => {
    const _store = store;
    const _application: Application = application;
    const state = _store.getState<TCurrencyPresenter>();

    loader.start("currencyLoader");

    const load = async (currencies: ICurrency[]) => {
      _store.update({
        currencies,
      });
      loader.stop("currencyLoader");
    };

    return {
      ...state,
      store: _store,
      loader,
      application: _application,
      translate,
      load,
    };
  },
  defaultState
);

export default CurrencyPresenter;
