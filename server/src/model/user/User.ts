import Model from "../Model";

export interface TUser {
  id: number;
  username: string;
  password?: string;
  secret?: string;
  firstName: string;
  lastName: string;
  email: string;

  dateCreated?: Date;
  dateUpdated?: Date;
  createdBy?: number;
}

export interface IUser extends TUser {
  name: string;
}

const User = Model((user: TUser = <TUser>{}): IUser => {
  const _user = Object.assign(<TUser>{}, user);
  return {
    get id() {
      return _user.id;
    },
    get username() {
      return _user.username;
    },
    get password() {
      return _user.password;
    },
    get secret() {
      return _user.secret ? _user.secret.toString() : "";
    },
    get firstName() {
      return _user.firstName;
    },
    get lastName() {
      return _user.lastName;
    },
    get name() {
      return `${_user.firstName} ${_user.lastName}`;
    },
    get email() {
      return _user.email;
    },

    get dateCreated() {
      return _user.dateCreated;
    },
    get dateUpdated() {
      return _user.dateUpdated;
    },
    get createdBy() {
      return _user.createdBy;
    }
  };
});

export default User;
