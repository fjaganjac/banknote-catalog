import { notification } from "antd";

export interface INotificationService {
  showError(messageText: string): void;
  showSuccess(messageText: string): void;
  showInfo(messageText: string): void;
  showWarning(messageText: string): void;
  showInfoNotificationBox(message: string, description: string): void;
}

const DURATION_MESSAGE_SECONDS = 4.5;
const DURATION_NOTIFICATION_BOX_SECONDS = 10;

const NotificationService = ({ translationService }): INotificationService => {
  const showMessage = (
    messageText: string,
    type: "success" | "info" | "warning" | "error"
  ) => {
    const method = notification[type];
    method({
      message: translationService.get(`app.${type}`),
      description: messageText,
      duration: DURATION_MESSAGE_SECONDS
    });
  };

  return {
    showError(messageText: string) {
      showMessage(messageText, "error");
    },

    showSuccess(messageText: string) {
      showMessage(messageText, "success");
    },

    showInfo(messageText: string) {
      showMessage(messageText, "info");
    },

    showWarning(messageText: string) {
      showMessage(messageText, "warning");
    },

    showInfoNotificationBox(message: string, description: string) {
      notification.info({
        message,
        description,
        duration: DURATION_NOTIFICATION_BOX_SECONDS
      });
    }
  };
};

export default NotificationService;
