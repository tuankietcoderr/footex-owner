"use client"
import { Calendar, CalendarProps } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { formats, localizer, messages, views } from "./calendar-config"
import { memo } from "react"

const BigCalendar = (props: Partial<CalendarProps>) => {
  return (
    <Calendar
      // @ts-ignore
      localizer={localizer}
      formats={formats}
      defaultView="month"
      views={views}
      timeslots={2}
      selectable
      messages={messages}
      style={{
        height: props.style?.height ?? 500,
        ...props.style,
      }}
      culture="vi-VN"
      scrollToTime={new Date()}
      {...props}
    />
  )
}

export default memo(BigCalendar)
