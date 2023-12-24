"use client"
import {
  removeFieldBookedQueue,
  updateFieldBookedQueueStatus,
} from "@/actions/field-booked-queue-actions"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import IFieldBookedQueue, { EFieldBookedQueueStatus } from "@/interface/IFieldBookedQueue"
import IGuest from "@/interface/IGuest"
import React from "react"
import { Event } from "react-big-calendar"
import toast from "react-hot-toast"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import AppAvatar from "../app-avatar"
import { Separator } from "../ui/separator"
import { formatVietnameseDate } from "@/lib/date"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { cn } from "@/lib/utils"
import { colorizeFieldBookedQueueStatus, vilizeFieldBookedQueueStatus } from "@/utils/status"

type Props = {
  event: Event
}

const BookedItem = ({ event: { title, resource } }: Props) => {
  const { endAt, startAt, bookedBy, status, _id } = resource as IFieldBookedQueue
  const guest = (bookedBy ?? {}) as IGuest
  const statuses = Object.values(EFieldBookedQueueStatus)
  const onRemove = async () => {
    const id = resource?._id
    if (!id) return
    toast.loading("Đang xóa", {
      duration: Infinity,
    })
    const { success, message } = await removeFieldBookedQueue(id)
    toast.dismiss()
    if (!success) return toast.error(message)
    toast.success(message)
  }

  const handleValueChange = async (value: EFieldBookedQueueStatus) => {
    toast.loading("Đang cập nhật trạng thái...", {
      duration: Infinity,
    })
    const { message, success } = await updateFieldBookedQueueStatus(_id!, value)
    toast.dismiss()
    if (!success) {
      return toast.error(message)
    }
    toast.success(message)
  }

  return (
    <Popover>
      <PopoverTrigger>{guest.name}</PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <AppAvatar src={guest?.avatar!} alt={guest.name} />
          <div>
            <div className="font-semibold">{guest?.name}</div>
            <div className="text-xs text-muted-foreground">{guest?.phoneNumber}</div>
          </div>
        </div>
        <Separator />
        <div>
          <p className="text-sm">Thời gian</p>
          <p className="text-xs">
            {formatVietnameseDate(new Date(startAt), "HH:mm")} -{" "}
            {formatVietnameseDate(new Date(endAt), "HH:mm")}
          </p>
        </div>
        <div>
          <p className="text-sm">Trạng thái</p>
          <Select defaultValue={status} onValueChange={handleValueChange}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((_status) => (
                <SelectItem key={_status} value={_status}>
                  {vilizeFieldBookedQueueStatus(_status)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Separator />
        <div className="self-end">
          <Button variant={"destructive"} onClick={onRemove}>
            Xóa
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default BookedItem
