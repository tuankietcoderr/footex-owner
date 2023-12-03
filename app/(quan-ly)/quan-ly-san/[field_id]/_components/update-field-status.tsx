"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { EFieldStatus } from "@/interface/IField"
import { cn } from "@/lib/utils"
import useFieldStore from "@/store/useFieldStore"
import { colorizeFieldStatus, vilizeFieldStatus } from "@/utils/status"
import { revalidateTag } from "next/cache"
import { useRouter } from "next/navigation"
import React from "react"

type Props = {
  status: EFieldStatus
  fieldId: string
}

const UpdateFieldStatus = ({ status, fieldId }: Props) => {
  const { updateFieldStatus } = useFieldStore()
  const fieldStatuses = Object.values(EFieldStatus)
  const router = useRouter()
  const { toast } = useToast()
  const handleUpdateStatus = async (status: EFieldStatus) => {
    updateFieldStatus(fieldId, status)
      .then(() => {
        router.refresh()
      })
      .catch((err) => {
        toast({
          description: err,
        })
      })
  }

  return (
    <Select defaultValue={status} onValueChange={handleUpdateStatus}>
      <SelectTrigger className={cn("w-fit", colorizeFieldStatus(status!))}>
        <SelectValue placeholder="Cập nhật trạng thái sân" />
      </SelectTrigger>
      <SelectContent>
        {fieldStatuses.map((_status) => (
          <SelectItem key={_status} value={_status} className={colorizeFieldStatus(_status)}>
            {vilizeFieldStatus(_status)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default UpdateFieldStatus
