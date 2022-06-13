import Model from "../Model";

export interface TCurrency {
  id: number;
  countryId: string;
  code: string;
  name: string;
  description?: string;
  countryName: string;

  dateCreated: Date;
  userCreated?: string;
  dateModified?: Date;
  userModified?: string;
  key: number;
}

const Currency = Model((user: TCurrency = <TCurrency>{}): TCurrency => {
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
      return _currency.name;
    },
    get description() {
      return _currency.description;
    },
    get countryName() {
      return _currency.countryName;
    },
    get dateCreated() {
      return _currency.dateCreated;
    },
    get dateModified() {
      return _currency.dateModified;
    },
    get userModified() {
      return _currency.userModified;
    },
    get key() {
      return _currency.key;
    },
  };
});

export default Currency;
