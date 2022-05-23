import Application from "../../../Application";
import ApplicationError from "../../service/error/ApplicationError";
import { ITranslationService } from "../../service/locale/TranslationService";
import { INotificationService } from "../../service/notification/NotificationService";

export default class HandleApplicationErrorInteractor {
  private application: Application;
  private notificationService: INotificationService;
  private translationService: ITranslationService;

  constructor({ application, notificationService, translationService }: any) {
    this.application = application;
    this.notificationService = notificationService;
    this.translationService = translationService;
  }

  private async handleNetworkError(error) {
    if (error.status != null || error.status !== 0) {
      if (error.status >= 400 && error.status < 500) {
        switch (error.status) {
          case 400:
            throw ApplicationError({ ...error, handled: true });
          case 401:
            throw ApplicationError({ ...error, handled: true });
          case 403:
            this.application.navigator.push({ pathname: "/forbidden" });
            throw ApplicationError({ ...error, handled: true });
          case 404:
            this.application.navigator.push({ pathname: "/not-found" });
            throw ApplicationError({ ...error, handled: true });
          case 405:
            this.showErrorMessage();
            throw ApplicationError({ ...error, handled: true });
          default:
            this.showErrorMessage(error.message);
            throw ApplicationError({ ...error, handled: true });
        }
      }
      this.application.navigator.push({ pathname: "/error" });
      throw error;
    }
  }

  private showErrorMessage(message?: string) {
    return this.notificationService.showError(
      message || this.translationService.get("errors.internal_error")
    );
  }

  private showWarningMessage(message: string) {
    return this.notificationService.showWarning(
      message || this.translationService.get("errors.internal_error")
    );
  }

  async execute(error: Error) {
    try {
      if (!(error as any).handled) {
        await this.handleNetworkError(error);
      } else {
        throw error;
      }
    } catch (error: any) {
      error.handled = true;
      throw error;
    }
  }
}
