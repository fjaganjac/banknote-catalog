import { ICredentialsService } from "../../authentication/service/CredentialsService";
import { HttpConstants } from "../common/Constants";
import { TAccessToken } from "../model/security/AccessToken";
import CookieStorageService from "../service/CookieStorageService";
import NetworkError, { TNetworkError } from "./error/NetworkError";

export interface IHttpService {
  get(url: string, args?: RequestArgs): Promise<Response>;
  post(url: string, args?: RequestArgs): Promise<Response>;
  put(url: string, args?: RequestArgs): Promise<Response>;
  remove(url: string, args?: RequestArgs): Promise<Response>;
  uploadFile(
    url: string,
    file: any,
    paramName: string,
    method: string,
    formData?: FormData
  ): Promise<any>;
  getFile(url: string): Promise<any>;
  buildUrl(url: string, args?: RequestArgs): string;
  buildPath(...fragments: string[]): string;
  buildAbsolutePath(...fragments: string[]): string;
  toJSON(response: Response): Promise<any>;
  toText(response: Response): Promise<string>;
  getCredentials(): Promise<TAccessToken | string | null>;
}

export interface FormArgs {
  multipart: boolean;
}

export interface RequestArgs extends RequestInit {
  params?: object;
  query?: object;
  authenticate?: boolean;
  form?: FormArgs | boolean;
}

export interface FileParam {
  key: string;
  value: any;
}

const HTTP_ERROR_NAME = "HTTP Error";
const HTTP_ERROR_UNAUTHORIZED = "HTTP Unauthorized";
const INTERNAL_SERVER_ERROR_NAME =
  "Interna greška. Pokušajte ponovo ili kontaktirajte administratora.";
const UNAUTHORIZED_ERROR_NAME = "Vaša sesija je istekla.";
const HTTP_ERROR_FORBIDDEN = "HTTP Forbidden";

const HttpService = ({
  baseUrl,
  credentialsService
}: {
  baseUrl: string;
  credentialsService: ICredentialsService;
}): IHttpService => {
  const _http = fetch;
  const _baseUrl = baseUrl;
  const _cookieStorageService = CookieStorageService();
  const _credentialsService = credentialsService;
  let _token: TAccessToken | string | null;

  async function getAccessToken() {
    _token = await _credentialsService.getSessionIdentifier();
    return _token;
  }

  function buildRequestArguments(
    args: RequestArgs,
    token: TAccessToken | string | null | undefined,
    csrfToken: string | null
  ): RequestInit {
    args = args || {};
    const method = args.method;
    args.headers = Object.assign({}, args.headers);
    const _useAuth = args.authenticate !== undefined ? args.authenticate : true;
    if (_useAuth && token) {
      args.headers[HttpConstants.AUTH_HEADER] =
        typeof token === "string" ? token : token.authorizationToken;
    }
    if (typeof args.form === "object" && args.form.multipart) {
      args.headers[HttpConstants.CONTENT_TYPE_HEADER_NAME] =
        HttpConstants.MULTIPART_CONTENT_TYPE;
    } else if (args.form) {
      args.headers[HttpConstants.CONTENT_TYPE_HEADER_NAME] =
        HttpConstants.FORM_CONTENT_TYPE;
    } else {
      args.headers[HttpConstants.CONTENT_TYPE_HEADER_NAME] =
        HttpConstants.JSON_CONTENT_TYPE;
    }
    if (
      args.params &&
      (method === HttpConstants.HTTP_POST_METHOD ||
        method === HttpConstants.HTTP_PUT_METHOD ||
        method === HttpConstants.HTTP_DELETE_METHOD)
    ) {
      if (
        args.headers &&
        args.headers[HttpConstants.CONTENT_TYPE_HEADER_NAME] ===
          HttpConstants.JSON_CONTENT_TYPE
      ) {
        args.body = JSON.stringify(args.params);
      } else if (
        args.headers &&
        args.headers[HttpConstants.CONTENT_TYPE_HEADER_NAME] ===
          HttpConstants.MULTIPART_CONTENT_TYPE
      ) {
        args.body = JSON.stringify(args.params);
      } else {
        args.body = encodeFormData(args.params);
      }
    }

    args.headers[HttpConstants.CSRF_TOKEN_HEADER_NAME] = csrfToken;

    return args;
  }

  function encodeData(params: any) {
    const queryParams = Object.keys(params)
      .map((item) => {
        const value =
          params[item] != null ? encodeURIComponent(params[item]) : "";
        return item + "=" + value;
      })
      .join("&");

    return queryParams;
  }

  function encodeQueryParams(params: any) {
    const queryParams = encodeData(params);

    return "?" + queryParams;
  }

  function encodeFormData(params: any) {
    const formData = encodeData(params).replace(/%20/g, "+");
    return formData;
  }

  function buildUrl(url: string, args: RequestArgs) {
    let _url = buildRequestPath(_baseUrl, url);
    if (args && (args.params || args.query)) {
      if (
        args.method === HttpConstants.HTTP_POST_METHOD ||
        args.method === HttpConstants.HTTP_PUT_METHOD
      ) {
        _url += encodeQueryParams(args.query || {});
      } else {
        _url += encodeQueryParams(
          Object.assign({}, args.params, args.query || {})
        );
      }
    }
    return _url;
  }

  async function checkStatus(response: Response) {
    const status = response.status;
    if (status >= 200 && status < 300) {
      if (response.redirected && response.url.includes("/forbidden")) {
        throw NetworkError({
          name: HTTP_ERROR_FORBIDDEN,
          status: 403,
          code: HttpConstants.HTTP_SERVER_FORBIDDEN_CODE,
          message: HttpConstants.HTTP_SERVER_ERROR_MESSAGE,
          url: response.url
        });
      }
      return Promise.resolve(response);
    } else {
      if (status >= 400 && status < 500) {
        if (status === 404 || status === 405) {
          throw NetworkError({
            name: HTTP_ERROR_NAME,
            status,
            code: HttpConstants.HTTP_SERVER_ERROR_CODE,
            message: HttpConstants.HTTP_SERVER_ERROR_MESSAGE,
            url: response.url
          });
        }
        const error = await response.json();
        throw NetworkError({
          name: HTTP_ERROR_NAME,
          message: error.message,
          status,
          code: error.code,
          url: response.url
        });
      } else {
        const contentType = response.headers.get("content-type");
        let errMessage = undefined;
        let errCode = undefined;
        if (contentType === HttpConstants.JSON_CONTENT_TYPE) {
          const error = await response.json();
          errMessage = error.message;
          errCode = error.code;
        }
        throw NetworkError({
          name: HTTP_ERROR_NAME,
          status,
          code: errCode || HttpConstants.HTTP_SERVER_ERROR_CODE,
          message: errMessage || INTERNAL_SERVER_ERROR_NAME,
          url: response.url
        });
      }
    }
  }

  function handleNetworkError(url: string, error: TNetworkError | string) {
    if (typeof error !== "string") {
      return NetworkError(error);
    }

    return NetworkError({
      name: HTTP_ERROR_NAME,
      status: 0,
      code: HttpConstants.HTTP_CLIENT_ERROR_CODE,
      message: error,
      url
    });
  }

  function buildRequestPath(...fragments: string[]) {
    return fragments
      .filter((fragment) => fragment)
      .join("/")
      .replace(/(https?:\/\/)|(\/){2,}/g, "$1$2");
  }

  async function sendRequest(url: string, args: RequestArgs) {
    try {
      args.credentials = "same-origin";
      const _userAuth =
        args.authenticate !== undefined ? args.authenticate : true;

      const csrfToken = await _cookieStorageService.get(
        HttpConstants.CSRF_TOKEN_COOKIE_NAME
      );

      const response = await _http(
        buildUrl(url, args),
        buildRequestArguments(
          args,
          _userAuth ? await getAccessToken() : null,
          csrfToken
        )
      );
      await checkStatus(response);
      if (response.redirected && response.url?.includes("login")) {
        throw NetworkError({
          name: HTTP_ERROR_UNAUTHORIZED,
          status: 401,
          code: HttpConstants.HTTP_SERVER_UNAUTHORIZED_CODE,
          message: UNAUTHORIZED_ERROR_NAME,
          url: response.url
        });
      }
      return response;
    } catch (error: any) {
      throw handleNetworkError(buildUrl(url, args), error);
    }
  }

  function setRequestHeader(args: RequestArgs, method: string) {
    args.method = method;
    return args;
  }

  async function sendFileRequest(url: string, method: string, data?: any) {
    const csrfToken = await _cookieStorageService.get(
      HttpConstants.CSRF_TOKEN_COOKIE_NAME
    );
    return _credentialsService.getSessionIdentifier().then((token) => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);

        xhr.setRequestHeader(HttpConstants.CSRF_TOKEN_HEADER_NAME, csrfToken);
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.response);
          } else {
            reject(
              handleNetworkError(
                buildUrl(url, {}),
                JSON.parse(xhr.responseText)
              )
            );
          }
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(data);
      });
    });
  }

  return {
    async get(url: string, args?: RequestArgs) {
      return sendRequest(
        url,
        setRequestHeader(args || {}, HttpConstants.HTTP_GET_METHOD)
      );
    },
    async post(url: string, args?: RequestArgs) {
      return sendRequest(
        url,
        setRequestHeader(args || {}, HttpConstants.HTTP_POST_METHOD)
      );
    },
    async put(url: string, args?: RequestArgs) {
      return sendRequest(
        url,
        setRequestHeader(args || {}, HttpConstants.HTTP_PUT_METHOD)
      );
    },
    async remove(url: string, args?: RequestArgs) {
      return sendRequest(
        url,
        setRequestHeader(args || {}, HttpConstants.HTTP_DELETE_METHOD)
      );
    },
    async uploadFile(
      url: string,
      file: any,
      paramName: string,
      method: string,
      formData?: FormData
    ) {
      const data = new FormData();
      if (!formData) {
        data.append(paramName, file, file.name);
      }
      return sendFileRequest(url, method, formData || data);
    },
    async getFile(url: string) {
      return sendFileRequest(url, "GET");
    },
    toJSON(response: Response) {
      return response.json
        ? response.json().catch(() => null)
        : Promise.resolve(response);
    },
    toText(response: Response) {
      return response.text
        ? response.text()
        : Promise.resolve(response.toString());
    },
    buildUrl(url: string, args: RequestArgs) {
      return buildUrl(url, args);
    },
    buildPath(...fragments: string[]) {
      return buildRequestPath(...fragments);
    },
    buildAbsolutePath(...fragments: string[]) {
      return buildRequestPath(_baseUrl, ...fragments);
    },
    async getCredentials() {
      return getAccessToken();
    }
  };
};

export default HttpService;
