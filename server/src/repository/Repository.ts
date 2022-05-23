import { getType } from "../util/TypeHelper";

declare type TValueMapper = (value: any) => any;
declare type MapDefinition =
  | string
  | [string, string]
  | [string, string, TValueMapper];

declare type IRepository<T> = {
  getType(): T;
};

const extractResultSetValues = <T>(
  result: any,
  keys: MapDefinition[],
  name?: string
): T => {
  let prefix = name && name.length !== 0 ? name + "_" : "";
  let value = <T>{};
  value = keys.reduce((previous: any, next) => {
    if (typeof next === "string") {
      previous[next] = result[prefix + next];
    } else {
      switch (next.length) {
        case 2:
          previous[next[0]] = result[prefix + next[1]];
          break;
        case 3:
          let mapFunction = next[2] as TValueMapper;
          previous[next[0]] = mapFunction(result[prefix + next[1]]);
          break;
      }
      if (typeof next[1] === "string") {
      } else {
      }
    }

    return previous;
  }, {});
  return value;
};

const Repository = <T, P>(fn: (args: P) => T) => {
  const TType = getType(fn);
  type fnType = typeof TType;
  return Object.assign(fn, <IRepository<T>>{
    getType() {
      return TType;
    }
  });
};

export default Repository;

export { extractResultSetValues };
