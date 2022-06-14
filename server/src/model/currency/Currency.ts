import Model from "../Model";

export interface TCurrency {
  id: number;
  countryId: string;
  code: string;
  name: string;
  description?: string;
  country: string;

  dateCreated: Date;
  userCreated?: string;
  dateModified?: Date;
  userModified?: string;
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
    get country() {
      return _currency.country;
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
