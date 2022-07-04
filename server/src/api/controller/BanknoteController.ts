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

           let banknoteId = parseInt(request.params.id,10);
           let {description, denominationId, filename, name,} = request.payload as any;
           return this.task.start<EditBanknoteInteractor>(
            "editBanknote",
            t => t.execute({banknoteId, denominationId, filename, name, description})
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

            let {denominationId, filename, name, description} = request.payload as any;
            return this.task.start<AddBanknoteInteractor>(
            "addBanknote",
            t => t.execute({ denominationId, filename, name, description})
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
            let id = parseInt(request.params.id,10);
            return this.task.start<DeleteBanknoteInteractor>(
            "deleteBanknote",
            t => t.execute(id)
            ); 
        } catch (error) {
            return error as any;
        }
    }    

}