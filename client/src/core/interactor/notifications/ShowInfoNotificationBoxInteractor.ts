import { INotificationService } from "../../service/notification/NotificationService";

export default class ShowInfoNotificationBoxInteractor {
  private notificationService: INotificationService;

  constructor({ notificationService }) {
    this.notificationService = notificationService;
  }

  execute(message: string, description: string) {
    this.notificationService.showInfoNotificationBox(message, description);
  }
}
