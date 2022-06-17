import * as Hapi from "hapi";
import GetCurrencyListInteractor from "../../interactor/currencies/GetCurrencyListInteractor";
import EditCurrencyInteractor from "../../interactor/currencies/EditCurrencyInteractor";
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
      var currentdate = new Date(); 
      var dateModified =  currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
      let Edit = {id, name, code, description, userModified, dateModified};
        return this.task.start<EditCurrencyInteractor>(
        "editCurrency",
        t => t. execute(Edit)
       );   
    } catch (error) {
      return error as any;
    }
  }
}
