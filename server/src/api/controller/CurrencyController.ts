import * as Hapi from "hapi";
import GetCurrencyListInteractor from "../../interactor/currencies/GetCurrencyListInteractor";
import Task from "../../runtime/Task";

export default class CurrencyController {
  private task: Task;

  constructor({ task }: any) {
    this.task = task;
  }

  public async getCurrencies(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit
  ): Promise<any> {
    try {
       return this.task.start<GetCurrencyListInteractor>(
        "getCurrencyList",
        t => t.execute()
      ); 
    } catch (error) {
      return error as any;
    }
  }
}
