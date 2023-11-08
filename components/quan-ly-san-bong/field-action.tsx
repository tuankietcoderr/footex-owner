"use client"
import React from "react"
import { Button } from "../ui/button"
import { useFieldManagementContext } from "@/context/FieldManagementContext"

const FieldAction = () => {
  const { openCreateModal } = useFieldManagementContext()
  return (
    <div className="absolute bottom-0 right-0 flex justify-end gap-2 rounded-tl-md bg-card/50 p-4">
      <Button onClick={openCreateModal}>Cập nhật thông tin sân</Button>
      <Button variant={"destructive"}>Xóa sân</Button>
    </div>
  )
}

export default FieldAction
