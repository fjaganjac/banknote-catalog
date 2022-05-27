import Model from "../Model";

export interface TCurrency {
  id: number;
  currencyCode: number;
  currencyName: string;
  coutryCurrency: string;
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
    get coutryCurrency() {
      return _value.coutryCurrency;
    },
    set coutryCurrency(coutryCurrency) {
      _value.coutryCurrency = coutryCurrency;
    },
  };
});

export default Currency;
