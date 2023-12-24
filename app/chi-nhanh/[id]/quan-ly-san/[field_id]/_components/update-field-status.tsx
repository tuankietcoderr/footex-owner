"use client"
import { updateFieldStatus } from "@/actions/field-actions"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { EFieldStatus } from "@/interface/IField"
import { cn } from "@/lib/utils"
import { colorizeFieldStatus, vilizeFieldStatus } from "@/utils/status"
import toast from "react-hot-toast"

type Props = {
  status: EFieldStatus
  fieldId: string
}

const UpdateFieldStatus = ({ status, fieldId }: Props) => {
  const fieldStatuses = Object.values(EFieldStatus)

  const handleUpdateStatus = async (_status: EFieldStatus) => {
    toast.loading("Đang cập nhật trạng thái sân", {
      duration: Infinity,
    })
    const { success, message } = await updateFieldStatus(fieldId, _status)
    toast.dismiss()
    if (!success) {
      toast.error(message)
      return
    }
    toast.success(message)
  }

  return (
    <Select defaultValue={status} onValueChange={handleUpdateStatus}>
      <SelectTrigger className={cn("max-h-6 w-fit")}>
        <SelectValue placeholder="Cập nhật trạng thái sân" />
      </SelectTrigger>
      <SelectContent>
        {fieldStatuses.map((_status) => (
          <SelectItem key={_status} value={_status}>
            {vilizeFieldStatus(_status)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default UpdateFieldStatus
