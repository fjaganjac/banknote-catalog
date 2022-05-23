import * as React from "react";
import { Form, Typography } from "antd";
import NumberFormatter from "../../model/common/NumberFormatter";
import { CurrencyConstants } from "../../common/Constants";

const { Text } = Typography;

const ReadOnlyField = ({
  label,
  className,
  name,
  value,
  valueBold = false,
  style,
  styleValue,
  isCurrencyValue = false,
  isPercentageValue = false
}: {
  label?: string;
  name?: string;
  className?: string;
  value?: string | number;
  valueBold?: boolean;
  style?: any;
  styleValue?: any;
  isCurrencyValue?: boolean;
  isPercentageValue?: boolean;
}) => (
  <Form.Item label={label} name={name} style={style} className={className}>
    <Text
      style={{
        fontWeight: valueBold ? "bold" : "normal",
        whiteSpace: "pre-wrap",
        ...styleValue
      }}
    >
      {value
        ? isCurrencyValue || isPercentageValue
          ? `${NumberFormatter().formatCurrencyValue(value as number)}${
              isPercentageValue
                ? `%`
                : ` ${CurrencyConstants.DOMESTIC_CURRENCY}`
            }`
          : value
        : "-"}
    </Text>
  </Form.Item>
);

export default ReadOnlyField;
