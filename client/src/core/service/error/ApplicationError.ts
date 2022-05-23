export interface TApplicationError {
    name?: string;
    message: string;
    code: string;
    handled: boolean;
  }
  
  export const ApplicationErrorName = "APPLICATION_ERROR";
  
  const ApplicationError = (error: TApplicationError) => {
    function Error(
      this: TApplicationError,
      { message, code, handled }: TApplicationError
    ) {
      this.name = ApplicationErrorName;
      this.message = message;
      this.code = code;
      this.handled = handled;
    }
    ApplicationError.prototype = Object.create(Error.prototype);
    ApplicationError.prototype.constructor = ApplicationError;
  
    return new Error(error);
  };
  
  export default ApplicationError;
  