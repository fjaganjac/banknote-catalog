import * as React from "react";
import { Select } from "antd";
import { DateService } from "../../service/DateService";
import { TTranslate } from "../../service/locale/TranslationService";

const { Option } = Select;

export type SizeType = "small" | "middle" | "large" | undefined;
export interface State {}

export interface Props {
  onChange?: any;
  onSearch?: any;
  onSelect?: any;
  onFocus?: any;
  placeholder?: string | React.ReactNode;
  value?: string | number | number[] | string[];
  allowClear?: boolean;
  showSearch?: boolean;
  notFoundContent?: string | React.ReactElement;
  key?: any;
  style?: React.CSSProperties;
  loading?: boolean;
  optionFilterProp?: string;
  selectOptions: any;
  selectOptionKey: any;
  selectOptionValue: any;
  clearIcon?: any;
  defaultActiveFirstOption?: boolean;
  disabled?: boolean;
  mode?: any;
  size?: SizeType;
  onDeselect?: any;
  labelTypeDate?: boolean;
  otherData?: string[];
  className?: any;
  translate: TTranslate;
  onBlur?: any;
}
export interface OptionProps {
  disabled?: boolean;
  value?: string | number;
  title?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  label?: string | number;
}

export default class SelectInput extends React.Component<Props, State> {
  static Option: React.ClassicComponentClass<OptionProps>;
  render() {
    const {
      showSearch,
      onChange,
      onSearch,
      onSelect,
      onFocus,
      placeholder,
      allowClear,
      notFoundContent,
      style,
      loading,
      optionFilterProp = "label",
      selectOptionKey,
      selectOptionValue,
      selectOptions,
      clearIcon,
      value,
      defaultActiveFirstOption,
      disabled,
      mode,
      size,
      onDeselect,
      labelTypeDate,
      className,
      translate,
      onBlur
    } = this.props;

    return (
      <Select
        onSearch={onSearch}
        onSelect={onSelect}
        onFocus={onFocus}
        placeholder={placeholder}
        value={value}
        allowClear={allowClear}
        notFoundContent={notFoundContent || translate("search.no_data")}
        style={style}
        loading={loading}
        optionFilterProp={optionFilterProp}
        showSearch={showSearch}
        onChange={onChange}
        clearIcon={clearIcon}
        defaultActiveFirstOption={defaultActiveFirstOption}
        disabled={disabled}
        mode={mode}
        size={size}
        onDeselect={onDeselect}
        className={className}
        onBlur={onBlur}
      >
        {labelTypeDate
          ? selectOptions?.map(
              (item) =>
                item && (
                  <Option
                    key={item[selectOptionKey]}
                    value={item[selectOptionKey]}
                    title={item[selectOptionValue]}
                    label={DateService().formatToLocalTime(
                      item[selectOptionValue]
                    )}
                  >
                    {DateService().formatToLocalTime(item[selectOptionValue])}
                  </Option>
                )
            )
          : selectOptions?.map(
              (item) =>
                item && (
                  <Option
                    key={item[selectOptionKey]}
                    value={item[selectOptionKey]}
                    title={item[selectOptionValue]}
                    label={item[selectOptionValue]}
                  >
                    {item[selectOptionValue]}
                  </Option>
                )
            )}
      </Select>
    );
  }
}
