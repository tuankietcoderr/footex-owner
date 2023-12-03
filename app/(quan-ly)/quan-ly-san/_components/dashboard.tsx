"use client"
import { useFieldManagementContext } from "@/context/FieldManagementContext"
import { useSearchParams } from "next/navigation"
import AllField from "./all-field"
import CreateButton from "@/components/create-button"
import ActionCreate from "@/components/action-create"

const Dashboard = () => {
  const { openCreateModal } = useFieldManagementContext()
  const query = useSearchParams()
  const status = query.get("status")
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-[200px_auto] gap-4">
        <CreateButton onClick={openCreateModal} />
        <ActionCreate title="Tạo sân bóng cho chi nhánh" />
      </div>
      <AllField />
    </div>
  )
}

export default Dashboard
