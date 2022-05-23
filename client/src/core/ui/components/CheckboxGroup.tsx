import * as React from "react";
import { Checkbox, Col, Row } from "antd";

export interface State {}

export interface Props {
  options?: any[];
  defaultValue?: any[];
  onChange?: any;
  disabled?: boolean;
  value?: any[];
  columnCount: number;
}

export default class CheckboxGroup extends React.Component<Props, State> {
  render() {
    const { options, defaultValue, onChange, disabled, value, columnCount } =
      this.props;

    const createChecboxGroupGrid = () => {
      if (options) {
        const grid: JSX.Element[] = [];
        let optionsIndex: number = 0;
        for (
          let rowNumber = 0;
          rowNumber < Math.ceil(options.length / columnCount);
          rowNumber++
        ) {
          const row: JSX.Element[] = [];
          for (let col = 0; col < columnCount && options[optionsIndex]; col++) {
            row.push(
              <Col span={Math.floor(24 / columnCount)} key={optionsIndex}>
                <Checkbox value={options[optionsIndex].value}>
                  {options[optionsIndex].label}
                </Checkbox>
              </Col>
            );
            optionsIndex++;
          }
          grid.push(<Row key={rowNumber}>{row}</Row>);
        }
        return grid;
      } else {
        return null;
      }
    };

    return (
      <Checkbox.Group
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        value={value}
        style={{ width: "100%", marginRight: 8 }}
      >
        {createChecboxGroupGrid()}
      </Checkbox.Group>
    );
  }
}
