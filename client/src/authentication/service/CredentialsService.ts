import { IStorageService } from "../../core/service/StorageService";

const SESSION_IDENTIFIER_STORAGE_KEY = "sessionid";

let isLoggedIn: boolean | undefined = undefined;
let username: string = "";

export interface ICredentialsService {
  setUsername(username: string): void;
  getUsername(): string;
  setIsLoggedIn(value: boolean): void;
  getIsLoggedIn(): Promise<boolean>;
  getSessionIdentifier(): Promise<string | null>;
}

const CredentialsService = ({ storageService }): ICredentialsService => {
  const _storageService: IStorageService = storageService;

  return {
    setUsername(value: string) {
      username = value;
    },

    getUsername() {
      return username;
    },

    async getIsLoggedIn() {
      if (isLoggedIn !== undefined) {
        return isLoggedIn;
      }
      const value = await storageService.get("loginStatus");

      isLoggedIn = value === "true";
      return isLoggedIn;
    },

    setIsLoggedIn(value: boolean) {
      isLoggedIn = value;
      _storageService.save("loginStatus", value);
    },

    async getSessionIdentifier() {
      return _storageService.get(SESSION_IDENTIFIER_STORAGE_KEY);
    }
  };
};

export default CredentialsService;
