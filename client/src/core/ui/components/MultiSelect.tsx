import * as React from "react";
import SelectInput from "./SelectInput";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { TTranslate } from "../../service/locale/TranslationService";

const MultiSelect = ({
  size = "middle",
  placeholder,
  value,
  onChange,
  style,
  options,
  selectOptionKey,
  selectOptionValue,
  mode = "tags",
  translate,
  disabled = false,
  notFoundContent
}: {
  size?: SizeType;
  placeholder?: string;
  value?: any;
  onChange?: (selectedKeys: any[]) => void;
  style?: any;
  options: any[];
  selectOptionKey: any;
  selectOptionValue: any;
  mode?: any;
  translate: TTranslate;
  disabled?: boolean;
  notFoundContent?: any;
}) => {
  return (
    <SelectInput
      mode={mode}
      size={size}
      placeholder={placeholder}
      value={value}
      onChange={(value) => onChange && onChange(value)}
      style={style}
      selectOptionKey={selectOptionKey}
      selectOptionValue={selectOptionValue}
      selectOptions={options}
      translate={translate}
      disabled={disabled}
      notFoundContent={notFoundContent}
    />
  );
};

export default MultiSelect;
