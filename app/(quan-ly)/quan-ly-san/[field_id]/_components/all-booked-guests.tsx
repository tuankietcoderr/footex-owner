"use client"
import useFieldBookedQueueStore from "@/store/useFieldBookedQueueStore"
import React, { useEffect, useState } from "react"
import { convertDateAndTimeToDateTime } from "@/lib/date"
import IGuest from "@/interface/IGuest"
import { Event, SlotInfo } from "react-big-calendar"
import BigCalendar from "@/components/big-calendar"
import { useFieldBookedQueueManagementContext } from "@/context/FieldBookedQueueManagementContext"
import { colorizeFieldBookedQueueStatus, colorizeTournamentStatus } from "@/utils/status"
import IFieldBookedQueue, { EFieldBookedQueueStatus } from "@/interface/IFieldBookedQueue"
import BookedItem from "./booked-item"
import toast from "react-hot-toast"

const AllBookedGuests = ({ field_id }: { field_id: string }) => {
  const { fieldBookedQueues, getFieldBookedQueuesOfField } = useFieldBookedQueueStore()
  const { openCreateModal } = useFieldBookedQueueManagementContext()
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  useEffect(() => {
    getFieldBookedQueuesOfField(field_id)
  }, [])
  const events =
    fieldBookedQueues &&
    (fieldBookedQueues?.map((fieldBookedQueue) => ({
      start: new Date(fieldBookedQueue.startAt),
      end: new Date(fieldBookedQueue.endAt),
      title: (fieldBookedQueue.bookedBy as IGuest)?.name,
      resource: fieldBookedQueue,
    })) as Event[])

  const onSelectedSlot = (info: SlotInfo) => {
    const { start, end } = info
    if (start < new Date()) return toast.error("Không thể đặt sân vào quá khứ")
    const startHour = start.getHours()
    const endHour = end.getHours()
    if (endHour - startHour > 3) {
      return toast.error("Bạn chỉ có thể đặt sân tối đa 3 tiếng")
    }
    const existingEvents =
      events?.filter((e) => {
        const _start = (e.start || new Date()).getTime()
        const _end = (e.end || new Date()).getTime()
        const slotStart = start.getTime()
        const slotEnd = end.getTime()
        return (
          (_start >= slotStart && _start < slotEnd) ||
          (_end > slotStart && _end <= slotEnd) ||
          (_start <= slotStart && _end >= slotEnd)
        )
      }) ?? []
    if (existingEvents.length > 0) return toast.error("Khung giờ này đã có người đặt")
    openCreateModal({
      bookedBy: "",
      startAt: info.start,
      endAt: info.end,
    })
  }

  return (
    <div className="rounded-md border p-4 shadow-sm">
      <h4 className="mb-2 font-bold">Danh sách khách đặt trước</h4>
      <BigCalendar
        events={events || []}
        onSelectSlot={onSelectedSlot}
        eventPropGetter={(event) => {
          const fieldBookedQueue = event.resource as IFieldBookedQueue
          return {
            style: {
              backgroundColor: colorizeFieldBookedQueueStatus(fieldBookedQueue.status!, true),
            },
          }
        }}
        onSelectEvent={(event) => {
          setSelectedEvent(event.resource._id)
        }}
        views={["day", "week", "agenda"]}
        defaultView="week"
        components={{
          month: {
            event: ({ event }) => (
              <BookedItem
                booked={event.resource as IFieldBookedQueue}
                isSelected={selectedEvent === event.resource._id}
                setIsSelected={setSelectedEvent}
              />
            ),
          },
          week: {
            event: ({ event }) => (
              <BookedItem
                booked={event.resource as IFieldBookedQueue}
                isSelected={selectedEvent === event.resource._id}
                setIsSelected={setSelectedEvent}
              />
            ),
          },
          day: {
            event: ({ event }) => (
              <BookedItem
                booked={event.resource as IFieldBookedQueue}
                isSelected={selectedEvent === event.resource._id}
                setIsSelected={setSelectedEvent}
              />
            ),
          },
        }}
      />
    </div>
  )
}

export default AllBookedGuests
