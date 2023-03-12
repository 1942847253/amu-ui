/*
* 渲染日历数据的实现思路
    1.确定当前月份有多少天
    2.确定当前应该展示的月份的上月剩余的天数
    3.确定当前应该展示的月份的下月开始天数 
*/

// 获取指定月份下的第一天是星期几
export function getFirstWeekDay(year: number, month: number) {
  const data = new Date(year, month - 1, 1);
  return data.getDay();
}

// 获取指定月份的总天数
export function getMonthDayCount(year: number, month: number): number {
  const data = new Date(year, month, 0);
  return data.getDate();
}

// 获取指定月份上个月剩余的天数
export function getLastMonthRestDays(year: number, month: number): number[] {
  const days = getFirstWeekDay(year, month);
  let lastDate = getMonthDayCount(year, month - 1);
  let restDays = [];
  while (restDays.length < days) {
    restDays.push(lastDate);
    lastDate = lastDate - 1;
  }
  return restDays.reverse();
}

// 获取指定月份下个月开始的天数
export function getNextMonthRestDays(year: number, month: number): number[] {
  const lastMonthRestDayCount = getLastMonthRestDays(year, month);
  const currentMonthDayCount = getMonthDayCount(year, month);
  const nextMonthRestDayCount =
    42 - (currentMonthDayCount + lastMonthRestDayCount.length);
  let restDays = [];
  for (let i = 1; i <= nextMonthRestDayCount; i++) {
    restDays.push(i);
  }
  return restDays;
}

// 根据时间戳返回日期信息
export function getDateInfo(timeStamp?: string | number | Date): number[] {
  const date = timeStamp ? new Date(timeStamp) : new Date();
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
}

// 格式化日期
export function getFormetDate(
  year: number,
  month: number,
  date: number
): string {
  const dateArr = [year, month, date] as number[] | string[];
  for (let i = 1; i < dateArr.length; i++) {
    dateArr[i] < 10 && (dateArr[i] = "0" + dateArr[i]);
  }

  return dateArr.join("-");
}
