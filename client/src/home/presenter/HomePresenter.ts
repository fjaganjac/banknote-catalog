import withStore, {
  TLoadingAwarePresenter,
  TPresentable
} from "../../core/presenter/withStore";
import Application from "../../Application";

export interface THomePresenter extends TLoadingAwarePresenter {
  users: any[];
}

export interface IHomePresenter extends THomePresenter, TPresentable {
  load(users: any[]): void;
}

const defaultState: THomePresenter = {
  users: []
};

const HomePresenter = withStore<IHomePresenter, THomePresenter>(
  ({ application, store, loader, translate }): IHomePresenter => {
    const _store = store;
    const _application: Application = application;
    const state = _store.getState<THomePresenter>();

    loader.start("userLoader");

    const load = async (users: any[]) => {
      _store.update({
        users
      });
      loader.stop("userLoader");
    };

    return {
      ...state,
      store: _store,
      loader,
      application: _application,
      translate,
      load
    };
  },
  defaultState
);

export default HomePresenter;
