import { ICryptographyProvider } from "../../model/security/CryptographyProvider";
import { IRandomValueProvider } from "../../model/security/RandomValueProvider";

export interface ICryptographyService {
  MD5(value: string): string;
  SHA1(value: string): string;
  getRandomString(length: number): string;
}

const CryptographyService = ({
  cryptographyProvider,
  randomValueProvider
}): ICryptographyService => {
  const _cryptographyProvider: ICryptographyProvider = cryptographyProvider;
  const _randomValueProvider: IRandomValueProvider = randomValueProvider;

  return Object.create({
    MD5: function MD5(value) {
      return _cryptographyProvider.MD5(value);
    },

    SHA1: function SHA1(value) {
      return _cryptographyProvider.SHA1(value);
    },

    getRandomString: function getRandomString(length) {
      return _randomValueProvider.getRandomString(length);
    }
  });
};

export default CryptographyService;
