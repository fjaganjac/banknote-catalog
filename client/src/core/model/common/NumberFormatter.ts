import { DecimalConstants } from "../../common/Constants";

/* eslint-disable */
export interface TNumberFormatter {
  precision: number;
  decimalSeparator: string;
  thousandsSeparator: string;
}

export interface INumberFormatter extends TNumberFormatter {
  format(
    value: number | Number | string,
    transformCommaToDot?: boolean,
    transformDotToComma?: boolean,
    precision?: number
  ): string;
  setTwoNumberDecimal(value: string): string;
  removeNonallowedChars(value: string): string;
  formatCurrencyValue(value?: number): string;
}

const NumberFormatter = (
  format: TNumberFormatter = {
    precision: 0,
    decimalSeparator: ",",
    thousandsSeparator: "."
  }
): INumberFormatter => {
  const { precision, decimalSeparator, thousandsSeparator } = format;

  return {
    get decimalSeparator() {
      return decimalSeparator;
    },

    get thousandsSeparator() {
      return thousandsSeparator;
    },

    get precision() {
      return precision;
    },

    format(
      value: number | string,
      transformCommaToDot?: boolean,
      transformDotToComma?: boolean,
      decimalPosition?: number
    ): string {
      if (transformCommaToDot) {
        return value.toString().replace(/\,/gi, ".");
      } else if (transformDotToComma) {
        return value.toString().replace(/\./gi, ",");
      } else {
        const sign = value < 0 ? "-" : "";
        let strValue;
        const i =
          parseInt(
            (strValue = Math.abs(+value || 0).toFixed(
              decimalPosition || precision
            ))
          ) + "";
        let j = 0;
        j = (j = i.length) > 3 ? j % 3 : 0;

        return (
          sign +
          (j ? i.substr(0, j) + thousandsSeparator : "") +
          i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousandsSeparator) +
          (decimalPosition || precision
            ? decimalSeparator +
              Math.abs(strValue - parseInt(i, 10))
                .toFixed(decimalPosition || precision)
                .slice(2)
            : "")
        );
      }
    },

    removeNonallowedChars(value: string) {
      let i = 0;
      return value.replace(/[^\d,.-]/g, "").replace(/\-/gi, function (match) {
        return match === "-" ? (i++ === 0 ? "-" : "") : "";
      });
    },

    setTwoNumberDecimal(value: string) {
      return value.indexOf(".") >= 0
        ? `${value.substr(0, value.indexOf("."))} ${value.substr(
            value.indexOf("."),
            3
          )}`
        : value;
    },

    formatCurrencyValue(value?: number) {
      if (value || value === 0) {
        let data = value.toString();
        data = this.removeNonallowedChars(data);
        data = this.format(value, true, false, DecimalConstants.PRECISION);
        data = this.format(value, false, false, DecimalConstants.PRECISION);
        return data;
      } else {
        return "-";
      }
    }
  };
};

export default NumberFormatter;
