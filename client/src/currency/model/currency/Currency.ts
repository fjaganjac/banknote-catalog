import Model from "../Model";

export interface TCurrency {
  id: number;
  currencyCode: number;
  currencyName: string;
  countryCurrency: string;
  key: number;
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
    get currencyCode() {
      return _value.currencyCode;
    },
    set currencyCode(codeCurrency) {
      _value.currencyCode = codeCurrency;
    },
    get currencyName() {
      return _value.currencyName;
    },
    set currencyName(currencyName) {
      _value.currencyName = currencyName;
    },
    get countryCurrency() {
      return _value.countryCurrency;
    },
    set countryCurrency(coutryCurrency) {
      _value.countryCurrency = coutryCurrency;
    },
    get key() {
      return _value.key;
    },
    set key(key) {
      _value.key = key;
    }
  };
});

export default Currency;
