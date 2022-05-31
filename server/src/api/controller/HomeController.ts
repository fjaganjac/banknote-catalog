import * as Hapi from "hapi";
import ShowUserListInteractor from "../../interactor/users/ShowUserListInteractor";
import Task from "../../runtime/Task";

export default class HomeController {
  private task: Task;

  constructor({ task }: any) {
    this.task = task;
  }

  public async showHomePage(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit
  ): Promise<any> {
    try {
      return "test";
    } catch (error) {
      return error as any;
    }
  }
}
