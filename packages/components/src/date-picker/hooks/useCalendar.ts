import { chunk } from "@/shared/utils";
import {
  getDateInfo,
  getLastMonthRestDays,
  getMonthDayCount,
  getNextMonthRestDays,
} from "../tool";

export interface IDayObj {
  day: number;
  style: string;
  isRestDay: boolean;
  year: number;
  month: number;
}

export const WEEK_DAYS = ["日", "一", "二", "三", "四", "五", "六"];

const useCalendar = (year: number, month: number) => {
  const lastMonthRestDays = getLastMonthRestDays(year, month);
  const currentMonthDays = getMonthDayCount(year, month);
  const nextMonthRestDays = getNextMonthRestDays(year, month);

  const [currentYear, currentMonth, currentDate] = getDateInfo();
  const calendarItems = Array.from({ length: currentMonthDays }, (_, i) => {
    const day = i + 1;
    const isCurrentDate = currentYear === year && currentMonth === month && currentDate === day;
    return {
      day,
      style: isCurrentDate ? "day current-day current" : "day current-day",
      isRestDay: false,
      year,
      month,
    } as IDayObj;
  });

  const calendarItemObjArr = [
    ...getRestDaysObjArr("last", lastMonthRestDays, year, month),
    ...calendarItems,
    ...getRestDaysObjArr("next", nextMonthRestDays, year, month),
  ];

  return [
    WEEK_DAYS,
    calendarItemObjArr,
    chunk(calendarItemObjArr, 7),
  ];
};

const getRestDaysObjArr = (
  flag: "last" | "next",
  daysArr: number[],
  year: number,
  month: number
) => {
  return daysArr.map((day) => {
    const item = {
      day,
      style: "day rest-day",
      isRestDay: true,
      year,
      month,
    } as IDayObj;
    if (flag === "last") {
      if (month === 1) {
        item.month = 12;
        item.year = year - 1;
      } else {
        item.month--;
      }
    } else {
      if (month === 12) {
        item.month = 1;
        item.year = year + 1;
      } else {
        item.month++;
      }
    }
    return item;
  });
};


export default useCalendar;
