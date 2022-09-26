export const findIndex = (array: Array<any>, value: any) => {
  return array.findIndex((item) => item === value);
};

export const debounce = (callback, time) => {
  let timeId = null;
  return (e) => {
    if (timeId !== null) {
      clearTimeout(timeId);
    }
    timeId = setTimeout(() => {
      callback.call(e);
      timeId = null;
    }, time);
  };
};

export const uuid = () => {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4() +
    Date.now()
  );
};
