import Application from "../../Application";
import HomePresenter, { IHomePresenter } from "../presenter/HomePresenter";
import { IHomeService } from "../service/HomeService";

export default class ShowHomePageInteractor {
  private application: Application;
  private output?: IHomePresenter;
  private homeService: IHomeService;

  constructor({ application, homeService }: any) {
    this.application = application;
    this.homeService = homeService;
  }

  execute() {
    this.output = HomePresenter({
      application: this.application,
      initialState: { users: [] }
    });
    this.homeService.getUsers().then(this.output.load);

    return this.output;
  }
}
