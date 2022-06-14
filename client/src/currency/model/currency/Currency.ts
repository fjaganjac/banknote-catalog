import Model from "../Model";

export interface TCurrency {
  id: number;
  code: number;
  name: string;
  country: string;
}

export interface ICurrency extends TCurrency {}

const Currency = Model((model: TCurrency): ICurrency => {
  const _value: TCurrency = Object.assign({}, model);

  return {
    get id() {
      return _value.id;
    },
    set id(id) {
      _value.id = id;
    },
    get code() {
      return _value.code;
    },
    set code(code) {
      _value.code = code;
    },
    get name() {
      return _value.name;
    },
    set name(name) {
      _value.name = name;
    },
    get country() {
      return _value.country;
    },
    set country(country) {
      _value.country = country;
    }
  };
});

export default Currency;
