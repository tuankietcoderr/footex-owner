import IFieldBookedQueue, { EFieldBookedQueueStatus } from "@/interface/IFieldBookedQueue"
import IGuest from "@/interface/IGuest"
import { colorizeFieldBookedQueueStatus, vilizeFieldBookedQueueStatus } from "@/utils/status"
import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import useFieldBookedQueueStore from "@/store/useFieldBookedQueueStore"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { formatVietnameseDate } from "@/lib/date"

type Props = {
  booked: IFieldBookedQueue
  isSelected?: boolean
  setIsSelected?: React.Dispatch<React.SetStateAction<string | null>>
}

const BookedItem = ({ booked, isSelected, setIsSelected }: Props) => {
  const { bookedBy, endAt, startAt, status, _id } = booked
  const { updateFieldBookedQueueStatus, deleteFieldBookedQueue } = useFieldBookedQueueStore()
  const guest = bookedBy as IGuest
  const statuses = Object.values(EFieldBookedQueueStatus)
  const { toast } = useToast()
  const handleValueChange = async (value: EFieldBookedQueueStatus) => {
    await updateFieldBookedQueueStatus(_id!, value)
      .then(() => {
        toast({
          title: "Cập nhật trạng thái thành công",
        })
      })
      .catch((err) => {
        toast({
          title: "Cập nhật trạng thái thất bại",
          description: err,
        })
      })
  }

  const handleDelete = async () => {
    await deleteFieldBookedQueue(_id!)
      .then(() => {
        toast({
          title: "Xóa thành công",
        })
      })
      .catch((err) => {
        toast({
          title: "Xóa thất bại",
          description: err,
        })
      })
  }

  return (
    <Popover
      open={isSelected}
      onOpenChange={(v) => {
        if (!v) {
          setIsSelected && setIsSelected(null)
        }
      }}
    >
      <PopoverTrigger>{guest.name}</PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>{guest?.name?.substring(0, 2)}</AvatarFallback>
            <AvatarImage src={guest?.avatar} alt={guest?.name} />
          </Avatar>
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
            <SelectTrigger className={cn(colorizeFieldBookedQueueStatus(status!))}>
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((_status) => (
                <SelectItem
                  key={_status}
                  value={_status}
                  className={cn(colorizeFieldBookedQueueStatus(_status!))}
                >
                  {vilizeFieldBookedQueueStatus(_status)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Separator />
        <div className="self-end">
          <Button variant={"destructive"} onClick={handleDelete}>
            Xóa
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default BookedItem
