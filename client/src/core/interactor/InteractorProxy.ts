import Application from "../../Application";
import HandleApplicationErrorInteractor from "./app/HandleApplicationErrorInteractor";
import { TLoadingAwarePresenter } from "../presenter/withStore";

export default class InteractorProxy {
  private interactor: any;
  private application: Application;
  private handleApplicationError: HandleApplicationErrorInteractor;

  constructor({
    interactor,
    handleApplicationError,
    application
  }: {
    interactor: any;
    handleApplicationError: HandleApplicationErrorInteractor;
    application: Application;
  }) {
    this.interactor = interactor;
    this.handleApplicationError = handleApplicationError;
    this.application = application;
  }

  private stopAllLoaders() {
    const _loaders =
      this.application.store.getState<TLoadingAwarePresenter>().loaders;
    if (_loaders) {
      Object.keys(_loaders).forEach((tag) => (_loaders[tag] = false));
      this.application.store.update({
        loaders: _loaders
      });
    }
  }

  private async handleError(error) {
    this.stopAllLoaders();
    return this.handleApplicationError.execute(error);
  }

  public execute(...args) {
    var interactionResult = this.interactor.execute(...args);
    if (interactionResult && interactionResult.then) {
      return interactionResult
        .then((result) => {
          return result;
        })
        .catch((error) => {
          return this.handleError(error);
        });
    } else {
      return interactionResult;
    }
  }
}
