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
