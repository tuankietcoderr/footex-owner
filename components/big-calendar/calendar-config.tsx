import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import viVN from "date-fns/locale/vi"
import { Event, Formats, Messages, ViewsProps, dateFnsLocalizer } from "react-big-calendar"
const locales = {
  "vi-VN": viVN,
}

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

export const messages: Messages = {
  agenda: "Lịch",
  day: "Ngày",
  today: "Hôm nay",
  week: "Tuần",
  previous: "Trước",
  next: "Sau",
  month: "Tháng",
  date: "Ngày",
  showMore: (total) => `+${total} sự kiện khác`,
  yesterday: "Hôm qua",
  event: "Sự kiện",
  allDay: "Cả ngày",
  noEventsInRange: "Không có sự kiện nào trong ngày này",
  time: "Thời gian",
  tomorrow: "Ngày mai",
  work_week: "Tuần làm việc",
}
export const views: ViewsProps<Event, object> = ["day", "week", "month", "agenda"]

export const formats: Formats = {}
