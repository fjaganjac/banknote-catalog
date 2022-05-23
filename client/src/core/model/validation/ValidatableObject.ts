import ValidationResult, { IValidationResult } from "./ValidationResult";
import { IValidator, TValidator } from "./validators/Validator";

/* eslint-disable */

export interface IValidatableObject<T> {
  validations: IValidator[];
  addValidator(validator: IValidator): void;
  addValidators(validators: IValidator[]): void;
  validate(): Promise<IValidationResult>;
  getValidators(name: string): TValidator[];
}

const ValidatableObject = <T>(obj: T): T & IValidatableObject<T> => {
  let _validations: TValidator[] = [];

  type TValidatableObject = T & IValidatableObject<T>;

  (obj as TValidatableObject).addValidator = function (validator) {
    if (validator && validator.isValid !== undefined) {
      (this as TValidatableObject).validations.push(validator);
    }
  };

  (obj as TValidatableObject).addValidators = function (validators) {
    (this as TValidatableObject).validations = (
      this as TValidatableObject
    ).validations.concat(validators);
  };

  (obj as TValidatableObject).validate = async function () {
    const validationResults = await Promise.all(
      (this as TValidatableObject).validations.map((validator) =>
        validator.isValid(
          this as TValidatableObject,
          (this as TValidatableObject)[validator.field]
        )
      )
    );

    const validationResult = ValidationResult();

    validationResults.forEach((result, index) => {
      if (!result) {
        const error = (this as TValidatableObject).validations[index];
        validationResult.addValidationErrors({
          field: error.field,
          message: error.message
        });
      }
    });

    return Promise.resolve(validationResult);
  };

  (obj as TValidatableObject).getValidators = function (name) {
    return _validations.filter((validator) => validator.field === name);
  };

  Object.defineProperty(obj, "validations", {
    get: function () {
      return _validations;
    },
    set: function (value) {
      _validations = value;
    }
  });

  return obj as TValidatableObject;
};

export default ValidatableObject;
