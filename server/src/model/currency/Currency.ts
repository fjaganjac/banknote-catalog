import Model from "../Model";

export interface TCurrency {
  id: number;
  countryId: string;
  code: string;
  name?: string;
  description?: string;

  dateCreated: Date;
  userCreated?: string;
  dateModified?: Date;
  userModified?: string;
}

export interface ICurrency extends TCurrency {
  name: string;
}

const Currency = Model((user: TCurrency = <TCurrency>{}): ICurrency => {
  const _currency = Object.assign(<TCurrency>{}, user);
  return {
    get id() {
      return _currency.id;
    },
    get countryId() {
      return _currency.countryId;
    },
    get code() {
      return _currency.code;
    },
    get name() {
      return _currency.name ? _currency.name.toString() : "";
    },
    get description() {
      return _currency.description;
    },
    get dateCreated() {
      return _currency.dateCreated;
    },
    get dateModified() {
      return _currency.dateModified;
    },
    get userModified() {
      return _currency.userModified;
    }
  };
});

export default Currency;
