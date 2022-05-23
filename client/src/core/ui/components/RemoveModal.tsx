import * as React from "react";
import { Modal, Button } from "antd";
import { TTranslate } from "../../service/locale/TranslationService";

export interface State {}

export interface Props {
  translate: TTranslate;
  title?: string;
  visible: boolean;
  onCancel: any;
  onRemoving: any;
  text?: string;
}

export default class RemoveModal extends React.Component<Props, State> {
  render() {
    const {
      translate,
      title,
      visible,
      onCancel,
      onRemoving,
      text
    } = this.props;

    return (
      <div>
        <Modal
          title={title}
          visible={visible}
          onCancel={onCancel}
          onOk={onRemoving}
          footer={[
            <Button key="back" onClick={onCancel}>
              {translate("modal_functions.remove_modal.cancel")}
            </Button>,
            <Button
              key="submit"
              danger
              onClick={onRemoving ? onRemoving : null}
            >
              {translate("modal_functions.remove_modal.remove")}
            </Button>
          ]}
        >
          <span>{text}</span>
        </Modal>
      </div>
    );
  }
}
