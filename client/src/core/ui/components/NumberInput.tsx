import NumberFormatter from "../../model/common/NumberFormatter";
import * as React from "react";
import { Input } from "antd";
import { DecimalConstants } from "../../../core/common/Constants";

interface Props {
  value?: number;
  required?: boolean;
  placeholder?: string;
  style?: any;
  onChange?: any;
  addonAfter?: string;
  readOnly?: boolean;
  isIntegerValue?: boolean;
  disabled?: boolean;
  onBlur?: any;
}

interface State {
  internalValue?: string;
  isDefaultState: boolean;
}

const formatter = NumberFormatter();

class NumberInput extends React.Component<Props, State> {
  constructor(props: Props) {
    const { value } = props;
    super(props);
    this.state = {
      internalValue: value ? this.formatValue(value.toString()) : undefined,
      isDefaultState: true
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { value } = this.props;
    const { isDefaultState } = this.state;
    const newValue = value ? this.formatValue(value?.toString()) : undefined;
    if (isDefaultState && prevState.internalValue !== newValue) {
      this.setState({
        internalValue: newValue
      });
    }
  }

  setInternalValue(text: string | undefined) {
    this.setState({
      internalValue: text,
      isDefaultState: false
    });
  }

  formatValue(value: string) {
    const { isIntegerValue } = this.props;
    const precision = isIntegerValue ? undefined : DecimalConstants.PRECISION;
    value = formatter.removeNonallowedChars(value);
    value = formatter.format(value, true, false, precision);
    value = formatter.format(value, false, false, precision);
    return value;
  }

  onChangeValue(value?: string) {
    const { isIntegerValue, onChange } = this.props;
    const precision = isIntegerValue ? undefined : DecimalConstants.PRECISION;
    const formattedValue = value
      ? formatter.format(value, true, false, precision).replace(/\s+/g, "")
      : undefined;
    onChange(
      formattedValue
        ? Number(
            precision
              ? parseFloat(formattedValue)
              : Math.round(parseFloat(formattedValue))
          )
        : undefined
    );
    if (value) {
      value = this.formatValue(value);
    }

    return value;
  }

  render() {
    const {
      placeholder,
      required,
      style,
      addonAfter,
      readOnly = false,
      disabled = false,
      onBlur
    } = this.props;
    const { internalValue } = this.state;

    return (
      <Input
        readOnly={readOnly}
        style={{ ...style, width: "100%" }}
        value={internalValue}
        onChange={(e) => {
          let text = e.currentTarget.value;
          text = text.replace(/\./gi, "");
          text = formatter.removeNonallowedChars(text);
          const index = text.indexOf(",");
          if (index !== -1) {
            text = text.slice(0, index + 3);
          }
          this.setInternalValue(text);
        }}
        onBlur={() => {
          const value = this.onChangeValue(internalValue);
          this.setInternalValue(value);
          onBlur();
        }}
        placeholder={placeholder}
        required={required}
        title={""}
        addonAfter={addonAfter}
        disabled={disabled}
      />
    );
  }
}

export default NumberInput;
