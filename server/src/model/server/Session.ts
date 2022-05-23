import Model from "../Model";
import { TUser } from "../user/User";

export interface TSession {
  user: TUser;
  roles: string[];
}

const Session = Model(
  (model: TSession = <TSession>{}): TSession => {
    const _model = Object.assign(<TSession>{}, model);
    return {
      get user() {
        return _model.user;
      },
      get roles() {
        return _model.roles;
      }
    };
  }
);

export default Session;
