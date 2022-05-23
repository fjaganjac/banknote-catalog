import returnof from "returnof";

const getType = <T, P>(fn: (args: P) => T): T => {
  return returnof(fn);
};

export { getType };
