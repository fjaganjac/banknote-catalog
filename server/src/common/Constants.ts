let Constants = {};

const DateFormats = {
  DATE: "DD.MM.YYYY",
  DATETIME_LOCAL: "DD.MM.YYYY HH:mm",
  DATETIME_LOCAL_24H: "DD.MM.YYYY, kk:mm",
  DATETIME_LOCAL_SECONDS_24H: "DD.MM.YYYY, kk:mm:ss",
  TIME_SECONDS: "HH:mm:ss"
};

Constants = Object.assign(DateFormats);

export { DateFormats };

export { Constants };
