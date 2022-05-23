import { Stream } from "stream";


export interface IFilePort {
  saveFile(key: string, file: Stream): Promise<void>
  deleteFile(): Promise<void>
};