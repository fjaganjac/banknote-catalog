import Validator, { IValidator } from "./Validator";

export interface IPasswordContentValidator extends IValidator {}

const PasswordContentValidator = (
  field: string,
  compareField: string,
  message?: string | undefined
): IPasswordContentValidator => {
  const _message = message || "new_password_cannot_be_old_password";

  return Object.assign(Validator(field, _message), {
    isValid: async (obj: Object, value: any) => {
      if (
        obj[compareField] !== "" &&
        value !== "" &&
        value === obj[compareField]
      ) {
        return Promise.resolve(false);
      }

      return Promise.resolve(true);
    }
  }) as IPasswordContentValidator;
};

export default PasswordContentValidator;
