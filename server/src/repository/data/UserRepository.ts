import Repository from "../Repository";
import { IDataPort } from "../ports";
import queries from "../../db/sql/queries";

export interface IUserRepository {
  findAllUsers(): Promise<any>;
}

const UserRepository = Repository(
  ({ port }: { port: IDataPort }): IUserRepository => {
    return {
      async findAllUsers() {
        return port.query(queries.users.findAllUsers);
      }
    };
  }
);

export default UserRepository;
