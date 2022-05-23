const URLBuilder = (prefix: string) => {
  return (value: any) => {
    if (!value || value.length === 0) {
      return value;
    }
    if ((value as string).indexOf("http") === -1) {
      return `${prefix}${value}`;
    }
    return value;
  };
};

export default URLBuilder;
