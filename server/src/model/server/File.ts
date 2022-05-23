import Model from "model/Model";
import { Stream } from "stream";

export interface TFile {
  name: string;
  contentType: string;
  stream: Stream;
}

export interface IFile extends TFile {
  extension: string;
}

const File = Model((model: TFile = <TFile>{}): IFile => {
  const _value = Object.assign(<TFile>{}, model);
  return {
    get name() {
      return _value.name;
    },
    get contentType() {
      return _value.contentType;
    },
    get stream() {
      return _value.stream;
    },
    get extension() {
      return _value.name.substring(_value.name.indexOf(".") + 1);
    }
  };
});

export default File;
