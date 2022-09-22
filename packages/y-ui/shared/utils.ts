export const findIndex = (array: Array<any>, value: any) => {
  return array.findIndex((item) => item === value);
};

export const  debounce =(callback, time)=> {
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
}
