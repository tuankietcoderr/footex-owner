"use client"
import React, { useEffect } from "react"
import { useFieldManagementContext } from "@/context/FieldManagementContext"
import IField from "@/interface/IField"
import { Button } from "@/components/ui/button"

const FieldAction = (field: IField) => {
  const { openUpdateModal, setInitialData } = useFieldManagementContext()

  useEffect(() => {
    setInitialData(field)
  }, [field])

  const onOpenUpdateModal = () => {
    openUpdateModal()
  }

  return (
    <div className="absolute bottom-0 right-0 flex justify-end gap-2 rounded-tl-md bg-card/50 p-4">
      <Button onClick={onOpenUpdateModal}>Cập nhật thông tin sân</Button>
    </div>
  )
}

export default FieldAction
