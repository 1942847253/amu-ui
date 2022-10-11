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

export const deepClone = (option: any, map = new Map()) => {
  if (typeof option === "object" && option !== null) {
    const cache = map.get(option);
    if (cache) {
      return cache;
    }
    const isArray = Array.isArray(option);
    const result: any = isArray ? [] : {};
    map.set(option, result);
    if (isArray) {
      option.forEach((item, index) => {
        result[index] = deepClone(option[index], map);
      });
    } else {
      Object.keys(option).forEach((key) => {
        result[key] = deepClone(option[key], map);
      });
    }
    return result;
  } else {
    return option;
  }
};
