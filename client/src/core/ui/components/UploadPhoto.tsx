import * as React from "react";
import { Upload, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import { UploadFile } from "antd/lib/upload/interface";
import { TTranslate } from "../../service/locale/TranslationService";
import { ApplicationService } from "../../service/ApplicationService";
import { UserIcon } from "../../../core/ui/assets/icons/Icons";
import Icon from "@ant-design/icons";

export interface State {
  previewImage?: any;
  previewVisible: boolean;
  file?: any;
}

export interface Props {
  translate: TTranslate;
  uploadPicture: (value?: any, type?: any, name?: any) => void;
  fileList?: any;
  isUploadBtnVisible: boolean;
  children?: any;
  onRemove: any;
  savePhotos?: (info: UploadFile[]) => void;
  previewImageModalTitle?: string;
}

export default class UploadPhoto extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      previewImage: undefined,
      previewVisible: false,
      file: undefined
    };
  }

  onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await ApplicationService().getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  handleCancel = () => this.setState({ previewVisible: false });

  render() {
    const {
      uploadPicture,
      isUploadBtnVisible,
      fileList,
      children,
      onRemove,
      translate,
      savePhotos,
      previewImageModalTitle
    } = this.props;
    const { previewVisible, previewImage } = this.state;

    return (
      <>
        <Upload
          name="avatar"
          listType="picture-card"
          onChange={(info) => savePhotos && savePhotos(info.fileList)}
          beforeUpload={(file, fileList) => {
            this.setState({
              file: file
            });
            var name = file.name;
            var type = file.type;
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = (e) => {
              if (e.target) {
                uploadPicture(file, type, name);
              }
            };
            const isJpgOrPng =
              file.type === "image/jpeg" || file.type === "image/png";
            if (!isJpgOrPng) {
              message.error(translate("upload_photo.type"));
            }
            return false;
          }}
          showUploadList={{
            showRemoveIcon: true
          }}
          onRemove={onRemove}
          className={"user-avatar"}
          accept=".jpg, .png"
          fileList={fileList ?? undefined}
          onPreview={this.handlePreview}
        >
          {isUploadBtnVisible ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {<Icon component={UserIcon} />}
            </div>
          ) : (
            children
          )}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
          title={previewImageModalTitle}
        >
          <img alt="profile" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </>
    );
  }
}
