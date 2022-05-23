import moment, { Moment } from "moment";
import { DateFormats } from "../common/Constants";

export interface IDateService {
  formatToLocalTime(date?: Date): string;
  formatDate(date?: Date): string;
  formatMomentDate(date: Moment): string;
  parseTimestampToString(timestamp: number): string;
  parseTimestampToDate(timestamp: number): Date;
}

const DateService = (): IDateService => {
  return {
    formatToLocalTime(date?: Date) {
      return date ? moment(date).format(DateFormats.DATETIME_LOCAL) : "-";
    },
    formatDate(date?: Date) {
      return date ? moment(date).format(DateFormats.DATE) : "-";
    },
    formatMomentDate(date: Moment) {
      return date.format(DateFormats.DATE);
    },
    parseTimestampToString(timestamp: number) {
      return moment(timestamp).format(DateFormats.DATE);
    },
    parseTimestampToDate(timestamp: number) {
      return moment(timestamp).toDate();
    }
  };
};

export { DateService };
