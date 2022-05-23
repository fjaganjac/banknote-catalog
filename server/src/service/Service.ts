import { getType } from "../util/TypeHelper";

declare type IService<T> = {
  getType(): T;
};

const Service = <T, P>(fn: (args: P) => T) => {
  const TType = getType(fn);
  type fnType = typeof TType;
  return Object.assign(fn, <IService<T>>{
    getType() {
      return TType;
    }
  });
};

export default Service;
