import * as Hapi from "hapi";
import GetBanknoteListInteractor from "../../interactor/banknotes/GetBanknoteListInteractor";
import EditBanknoteInteractor from "../../interactor/banknotes/EditBanknoteInteractor";
import AddBanknoteInteractor from "../../interactor/banknotes/AddBanknoteInteractor";
import DeleteBanknoteInteractor from "../../interactor/banknotes/DeleteBanknoteInteractor";
import Task from "../../runtime/Task";

export default class BanknoteController {
  private task: Task;

  constructor({ task }: any) {
    this.task = task;
  }

    public async getBanknotes(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit
  ): Promise<any> {
    try {
       return this.task.start<GetBanknoteListInteractor>(
        "getBanknoteList",
        t => t.execute()
      ); 
    } catch (error) {
      return error as any;
    }
    }
    
    public async editBanknote(
        request: Hapi.Request,
        h: Hapi.ResponseToolkit
      ): Promise<any> {
        try {
           const banknote = request.payload as any;
           return this.task.start<EditBanknoteInteractor>(
            "editBanknote",
            t => t.execute(Object.defineProperty(banknote, 'banknoteId', {value: parseInt(request.params.id,10)}))
          ); 
        } catch (error) {
          return error as any;
        }
    }
    public async addBanknote(
        request: Hapi.Request,
        h: Hapi.ResponseToolkit
        ): Promise<any> {
        try {

            const banknote = request.payload as any;
            return this.task.start<AddBanknoteInteractor>(
            "addBanknote",
            t => t.execute(banknote)
            ); 
        } catch (error) {
            return error as any;
        }
        }
    public async deleteBanknote(
        request: Hapi.Request,
        h: Hapi.ResponseToolkit
        ): Promise<any> {
        try {
            return this.task.start<DeleteBanknoteInteractor>(
            "deleteBanknote",
            t => t.execute(parseInt(request.params.id,10))
            ); 
        } catch (error) {
            return error as any;
        }
    }    

}