import Service from "../Service";
import { IUserRepository } from "../../repository/data/UserRepository";
import User, { TUser } from "../../model/user/User";
import { IConfiguration } from "config";
import { extractResultSetValues } from "../../repository/Repository";

export interface IUserService {
  findAllUsers(): Promise<TUser>;
}

const UserService = Service(
  ({
    userRepository,
    config
  }: {
    userRepository: IUserRepository;
    config: IConfiguration;
  }): IUserService => {
    const extract = extractResultSetValues;
    return {
      async findAllUsers() {
        const result = await userRepository.findAllUsers();
        if (result) {
          return result.map((item: any) => {
            try {
              let model = extract<TUser>(item, [
                "id",
                "firstName",
                "lastName",
                "email"
              ]);
              return User(model);
            } catch (error) {
              throw error;
            }
          });
        } else {
          return null;
        }
      }
    };
  }
);

export default UserService;
