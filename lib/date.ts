import { format } from "date-fns"
import viVN from "date-fns/locale/vi"

export const monthByNumber = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
}

export const numberByMonth = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
}

export const unit = {
  day: "day",
  month: "month",
  year: "year",
}

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate()
}

export const nearlyYears = (): number[] => {
  const years = []
  const currentYear = new Date().getFullYear()
  for (let i = currentYear - 6; i <= currentYear; i++) {
    years.push(i)
  }
  return years
}

export const convertDateAndTimeToDateTime = (date: Date, time: number): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time, 0, 0)
}

export const formatVietnameseDate = (date: Date, formatter: string): string => {
  return format(new Date(date), formatter, { locale: viVN })
}
