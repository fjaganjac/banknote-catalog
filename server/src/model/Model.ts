import { getType } from '../util/TypeHelper';

declare type ITypeAware<T> = {
  getType(): T
}

const Model = <T, P>(fn: (args:P) => T) => {
  const TType = getType(fn);
  type fnType = typeof TType;
  return Object.assign(fn, <ITypeAware<T>>{
    getType() {
      return TType;
    }
  })
}

export default Model