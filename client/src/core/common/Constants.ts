const BaseConstants = {
  YES: "Y",
  NO: "N",
  TRUE: "T",
  FALSE: "F"
};

const UserPreferences = {
  DEFAULT_LANGUAGE: "bs"
};

const Screens = {
  LG_SCREEN: 992
};

const HttpConstants = {
  HTTP_GET_METHOD: "get",
  HTTP_POST_METHOD: "post",
  HTTP_PUT_METHOD: "put",
  HTTP_DELETE_METHOD: "delete",
  JSON_CONTENT_TYPE: "application/json",
  FORM_CONTENT_TYPE: "application/x-www-form-urlencoded",
  MULTIPART_CONTENT_TYPE: "multipart/form-data",
  AUTH_HEADER: "Authorization",
  HTTP_CLIENT_ERROR_CODE: "CLIENT_ERROR",
  HTTP_SERVER_ERROR_CODE: "SERVER_ERROR",
  HTTP_SERVER_ERROR_MESSAGE: "HTTP_ERROR",
  HTTP_SERVER_UNAUTHORIZED_CODE: "UNAUTHORIZED",
  HTTP_SERVER_FORBIDDEN_CODE: "FORBIDDEN",
  CONTENT_TYPE_HEADER_NAME: "Content-Type",
  SESSION_ID_HEADER: "session-id",
  CSRF_TOKEN_HEADER_NAME: "X-XSRF-TOKEN",
  CSRF_TOKEN_COOKIE_NAME: "XSRF-TOKEN"
};

const RouteTypes = {
  ROOT: "root",
  SINGLETON: "singleton",
  TRANSIENT: "transient",
  REGULAR: "regular"
};

const Layouts = {
  DEFAULT: "app",
  ROOT: "root",
  APP: "app",
  BASE: "base"
};

const Topics = {
  DEFAULT: "app"
};

const DateFormats = {
  DATETIME_LOCAL: "DD.MM.YYYY kk:mm",
  DATE: "DD.MM.YYYY",
  DATETIME: "DD.MM.YYYY HH:mm:ss",
  YEAR: "YYYY",
  DAY: "D",
  MONTH: "MMMM"
};

const TimeFormats = {
  LOCAL_TIME: "HH:mm"
};

const ModalConstants = {
  WIDTH: 670
};

const TextAreaConstants = {
  MIN_ROWS: 7
};

const ExcelFileTypes = {
  XLS: "application/vnd.ms-excel",
  XLSX: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
};

const DecimalConstants = {
  PRECISION: 2,
  MIN_VALUE: 0,
  DECIMAL_SEPARATOR: ","
};

const CurrencyConstants = {
  DOMESTIC_CURRENCY: "BAM"
};

const ValidationRules = {
  TEXT_AREA_MAX_LENGTH: 4000
};

export { Topics };
export { Layouts };
export { RouteTypes };
export { UserPreferences };
export { HttpConstants };
export { BaseConstants as Constants };
export { DateFormats };
export { ModalConstants };
export { TextAreaConstants };
export { TimeFormats };
export { ExcelFileTypes };
export { DecimalConstants };
export { CurrencyConstants };
export { ValidationRules };
export { Screens };
