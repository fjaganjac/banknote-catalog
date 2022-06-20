import * as Hapi from "hapi";
import GetCurrencyListInteractor from "../../interactor/currencies/GetCurrencyListInteractor";
import EditCurrencyInteractor from "../../interactor/currencies/EditCurrencyInteractor";
import AddCurrencyInteractor from "../../interactor/currencies/AddCurrencyInteractor";
import DeleteCurrencyInteractor from "../../interactor/currencies/DeleteCurrencyInteractor";
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

  public async editCurrency(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit
  ): Promise<any> {
    try {
      let id=parseInt(request.params.id,10);
      let {code, name, description, userModified} = request.payload as any;
        return this.task.start<EditCurrencyInteractor>(
        "editCurrency",
        t => t. execute({id, name, code, description, userModified})
       );   
    } catch (error) {
      return error as any;
    }
  }

  public async addCurrency(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit
  ): Promise<any> {
    try {
        let {code, name, description, userCreated} = request.payload as any;
        return this.task.start<AddCurrencyInteractor>(
        "addCurrency",
        t => t.execute({code, name, description, userCreated})
      ); 
    } catch (error) {
      return error as any;
    }
  }

  public async deleteCurrency(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit
  ): Promise<any> {
    try {
      let id = parseInt(request.params.id,10);
        return this.task.start<DeleteCurrencyInteractor>(
        "deleteCurrency",
        t => t. execute(id)
       );   
    } catch (error) {
      return error as any;
    }
  }
}
