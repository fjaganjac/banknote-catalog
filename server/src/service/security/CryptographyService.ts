import Service from "../Service";
import * as bcrypt from "bcrypt";
import * as uuid from "uuid";

const NUM_SALT_ROUNDS: number = 10;

export interface ICryptographyService {
  generateSecret(): Promise<string>;
  generatePasswordHash(password: string, salt: string): Promise<string>;
  compareHash(password: string, hash: string): Promise<boolean>;
  generateUuid(): string;
}

const CryptographyService = Service(
  (): ICryptographyService => {
    return {
      async generateSecret() {
        return bcrypt.genSalt(NUM_SALT_ROUNDS);
      },
      async generatePasswordHash(password: string, salt: string) {
        return bcrypt.hash(password, salt);
      },
      async compareHash(password: string, hash: string) {
        return bcrypt.compare(password, hash);
      },
      generateUuid() {
        return uuid.v1();
      }
    };
  }
);

export default CryptographyService;
