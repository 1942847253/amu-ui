import { Ref } from "vue";

export const findIndex = (array: Array<any>, value: any) => {
  return array.findIndex((item) => item === value);
};

export const chunk = (arr: Array<any>, size: number) => {
  let bigArr = [] as any[];
  let smallArr = [] as any[];
  arr.forEach((item) => {
    if (smallArr.length === 0) {
      bigArr.push(smallArr);
    }
    smallArr.push(item);
    if (smallArr.length === size) {
      smallArr = [];
    }
  });
  return bigArr;
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

export const createAppointArr = (start: number, size: number) => {
  let res: number[] = [];
  for (let i = 0; i < size; i++) {
    res.push(start);
    start += 1;
  }
  return res;
};

export const getStyleAttributeValue = (
  dom: HTMLElement | Element,
  style: string
) => {
  const Style = window.getComputedStyle(dom, null);
  const styleValue = parseFloat(Style.getPropertyValue(style));
  return styleValue;
};

export const scrollIntoView = (parentEl: Element, height: number) => {
  parentEl.scrollTop = height;
};
