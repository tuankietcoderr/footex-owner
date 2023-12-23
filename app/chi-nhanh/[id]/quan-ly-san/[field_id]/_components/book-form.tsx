"use client"
import { bookField } from "@/actions/field-booked-queue-actions"
import BigCalendar from "@/components/big-calendar"
import BookedItem from "@/components/item/booked-item"
import IFieldBookedQueue, { EFieldBookedQueueStatus } from "@/interface/IFieldBookedQueue"
import IGuest from "@/interface/IGuest"
import { colorizeFieldBookedQueueStatus, vilizeFieldBookedQueueStatus } from "@/utils/status"
import { useState } from "react"
import { Event, SlotInfo } from "react-big-calendar"
import toast from "react-hot-toast"
import BookedByModal from "./booked-by-modal"

type Props = {
  bookedFields: IFieldBookedQueue[]
  fieldId: string
}

const BookForm = ({ bookedFields, fieldId }: Props) => {
  const events: Event[] = bookedFields.map((field) => ({
    start: new Date(field.startAt),
    end: new Date(field.endAt),
    title: vilizeFieldBookedQueueStatus(field?.status!),
    resource: field,
  }))

  const [event, setEvent] = useState<Event | null>(null)

  const onSelectSlot = (slotInfo: SlotInfo) => {
    const { start, end } = slotInfo
    if (start < new Date()) return toast.error("Không thể đặt sân vào quá khứ")
    const startHour = start.getHours()
    const endHour = end.getHours()
    if (endHour - startHour > 3) {
      return toast.error("Bạn chỉ có thể đặt sân tối đa 3 tiếng")
    }
    const existingEvents = events.filter((e) => {
      const _start = (e.start || new Date()).getTime()
      const _end = (e.end || new Date()).getTime()
      const slotStart = start.getTime()
      const slotEnd = end.getTime()
      return (
        (_start >= slotStart && _start < slotEnd) ||
        (_end > slotStart && _end <= slotEnd) ||
        (_start <= slotStart && _end >= slotEnd)
      )
    })
    if (existingEvents.length > 0) return toast.error("Khung giờ này đã có người đặt")
    setEvent({
      start,
      end,
      title: "Đặt sân",
      resource: {
        startAt: start,
        endAt: end,
        bookedBy: "",
        status: EFieldBookedQueueStatus.PENDING,
      } as IFieldBookedQueue,
    })
  }

  const onBook = async (data: IFieldBookedQueue) => {
    if (!event) return
    toast.loading("Đang đặt sân...", {
      duration: Infinity,
    })
    const { success, message } = await bookField({ ...data, field: fieldId })
    toast.dismiss()
    if (success) {
      toast.success("Đặt sân thành công")
      setEvent(null)
    } else {
      toast.error(message)
    }
  }

  return (
    <div className="flex flex-col space-y-2">
      <BigCalendar
        views={["week", "agenda"]}
        defaultView="week"
        onSelectSlot={onSelectSlot}
        events={event ? [...events, event] : events}
        eventPropGetter={(event) => {
          const fieldBookedQueue = event.resource as IFieldBookedQueue
          const bookedBy = fieldBookedQueue?.bookedBy as IGuest
          return {
            style: {
              backgroundColor: colorizeFieldBookedQueueStatus(fieldBookedQueue?.status!, true),
            },
          }
        }}
        step={60}
        components={{
          week: {
            event: ({ event }) => <BookedItem event={event} />,
          },
          agenda: {
            event: ({ event }) => <BookedItem event={event} />,
          },
        }}
      />
      {event && (
        <BookedByModal
          visible={!!event}
          onSubmit={onBook}
          initialData={{
            bookedBy: "",
            startAt: event?.start || new Date(),
            endAt: event?.end || new Date(),
          }}
          onOpenChange={(open) => {
            if (!open) setEvent(null)
          }}
        />
      )}
    </div>
  )
}

export default BookForm
