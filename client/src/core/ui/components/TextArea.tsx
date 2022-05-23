import { Input, Typography } from "antd";
import * as React from "react";
import { TextAreaConstants, ValidationRules } from "../../common/Constants";
import { TTranslate } from "../../service/locale/TranslationService";

const { Text } = Typography;
export interface State {
  freeCharactersNumber: number;
  isVisibleRemainingCharactersCount?: boolean;
}

export interface Props {
  value?: string;
  translate: TTranslate;
  onChange?: any;
  isReadOnly?: boolean;
  showRemainingCharactersCount?: boolean;
  maxCharacterCount?: number;
  rows?: number;
  disabled?: boolean;
}

export default class TextArea extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      freeCharactersNumber:
        this.props.maxCharacterCount || ValidationRules.TEXT_AREA_MAX_LENGTH,
      isVisibleRemainingCharactersCount: false
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { value, maxCharacterCount } = this.props;
    const characterCount = value?.length || 0;
    const freeCharactersNumber =
      (maxCharacterCount || ValidationRules.TEXT_AREA_MAX_LENGTH) -
      characterCount;
    if (prevState.freeCharactersNumber !== freeCharactersNumber) {
      this.setState({
        freeCharactersNumber: freeCharactersNumber
      });
    }
  }

  onChangeValue = (value?: string) => {
    const { maxCharacterCount } = this.props;
    const characterCount =
      maxCharacterCount || ValidationRules.TEXT_AREA_MAX_LENGTH;
    const valueLength = value?.length || 0;
    const restCharacters = characterCount - valueLength;
    if (restCharacters >= 0) {
      this.setState({ freeCharactersNumber: restCharacters });
      this.props.onChange(value);
    }
  };

  updateVisibleRemainingCharactersCount = () => {
    const visible = this.state.isVisibleRemainingCharactersCount;
    this.setState({ isVisibleRemainingCharactersCount: !visible });
  };

  render() {
    const {
      value,
      isReadOnly = false,
      translate,
      showRemainingCharactersCount = true,
      rows,
      disabled = false
    } = this.props;
    const {
      freeCharactersNumber,
      isVisibleRemainingCharactersCount
    } = this.state;
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Input.TextArea
          value={value}
          onChange={(e) => this.onChangeValue(e.currentTarget.value)}
          rows={rows || TextAreaConstants.MIN_ROWS}
          readOnly={isReadOnly}
          onFocus={this.updateVisibleRemainingCharactersCount}
          onBlur={this.updateVisibleRemainingCharactersCount}
          disabled={disabled}
        />
        {!isReadOnly &&
          showRemainingCharactersCount &&
          isVisibleRemainingCharactersCount && (
            <Text style={{ fontSize: 10, alignSelf: "flex-end" }}>
              {translate("text_area_character_count.msg", {
                field: freeCharactersNumber || "0"
              })}
            </Text>
          )}
      </div>
    );
  }
}
