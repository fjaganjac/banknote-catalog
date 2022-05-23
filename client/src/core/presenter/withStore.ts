import Application from "../../Application";
import { IStore } from "../model/runtime/state/Store";
import {
  ITranslationService,
  TTranslate
} from "../service/locale/TranslationService";

export interface TLoadingAwarePresenter {
  loaders?: any;
}

export interface ILocalizablePresenter extends TTranslate {}

export interface IProgressIndicatorManager {
  stop(...loaders: string[]): void;
  start(...loaders: string[]): void;
}
export interface TPresentable {
  application: Application;
  store: IStore;
  loader: IProgressIndicatorManager;
  translate: ILocalizablePresenter;
}

export interface IPresentable<T extends any> {
  (presenter: TPresentable): T;
}

function withStore<K extends any, T extends any>(
  presenter: IPresentable<K>,
  defaultState: T
) {
  return ({
    application,
    store,
    initialState,
    topic
  }: {
    application: Application;
    store?: IStore;
    initialState?: T;
    topic?: string;
  }) => {
    const _initialState = {
      ...((defaultState as any) || {}),
      ...((initialState as any) || {})
    } as K;
    (_initialState as any).loaders = {};
    const _store = store ? store : application.store;
    const _topic = topic;
    _store.update(_initialState, _topic);
    const translate =
      application.container.resolve<ITranslationService>(
        "translationService"
      ).get;
    _store.update({
      translate
    });
    const loader: IProgressIndicatorManager = {
      stop: (...loaders: string[]) => {
        const _loaders =
          _store.getState<TLoadingAwarePresenter>(_topic).loaders || {};
        loaders.forEach((item) => (_loaders[item] = false));
        _store.update(
          {
            loaders: _loaders
          },
          _topic
        );
      },
      start: (...loaders: string[]) => {
        const _loaders =
          _store.getState<TLoadingAwarePresenter>(_topic).loaders || {};
        loaders.forEach((item) => (_loaders[item] = true));
        _store.update(
          {
            loaders: _loaders
          },
          _topic
        );
      }
    };

    return presenter({
      application,
      store: _store.forTopic(_topic),
      loader,
      translate: translate
    });
  };
}

export default withStore;
