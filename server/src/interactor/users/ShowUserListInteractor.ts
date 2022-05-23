import { IUserService } from "../../service/user/UserService";

export default class ShowUserListInteractor {
  private userService: IUserService;

  constructor({ userService }: any) {
    this.userService = userService;
  }

  public async execute() {
    return this.userService.findAllUsers();
  }
}
