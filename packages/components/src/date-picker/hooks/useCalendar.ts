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
  const lastMothRestDays = getLastMonthRestDays(year, month);
  const currentMonthDays = getMonthDayCount(year, month);
  const nextMonthRestDays = getNextMonthRestDays(year, month);

  const CalendarItemArr = [] as IDayObj[];
  const [currentYear, currentMonth, currentDate] = getDateInfo();
  for (let i = 1; i <= currentMonthDays; i++) {
    const isCurrentDate =
      currentYear === year && currentMonth === month && currentDate === i;
    CalendarItemArr.push({
      day: i,
      style: isCurrentDate ? "day current-day current" : "day current-day",
      isRestDay: false,
      year,
      month,
    });
  }
  const CalendarItemObjArr = [
    ...getDaysObjArr("last", lastMothRestDays, year, month),
    ...CalendarItemArr,
    ...getDaysObjArr("next", nextMonthRestDays, year, month),
  ];
  return [
    WEEK_DAYS,
    CalendarItemObjArr,
    chunk(CalendarItemObjArr, 7) as IDayObj[][],
  ];
};

const getDaysObjArr = (
  flag: "last" | "next",
  DaysArr: number[],
  year: number,
  month: number
) => {
  let DaysObjArr: IDayObj[] = [];
  DaysArr.forEach((day) => {
    const item = {
      day,
      style: "day rest-day",
      isRestDay: true,
      year,
      month,
    } as IDayObj;
    if (flag === "last") {
      if (month === 1) {
        item.month === 12;
        item.year = year - 1;
        return;
      }
      item.month--;
    } else {
      if (month === 12) {
        item.month === 1;
        item.year = year + 1;
        return;
      }
      item.month++;
    }
    DaysObjArr.push(item);
  });
  return DaysObjArr;
};

export default useCalendar;
