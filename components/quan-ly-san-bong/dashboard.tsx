"use client"
import { useFieldManagementContext } from "@/context/FieldManagementContext"
import { useSearchParams } from "next/navigation"
import CreateButton from "../create-button"
import ActionCreate from "./action-create"
import AllField from "./all-field"

const Dashboard = () => {
  const { openCreateModal } = useFieldManagementContext()
  const query = useSearchParams()
  const status = query.get("status")
  console.log({ status })
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-[200px_auto] gap-4">
        <CreateButton onClick={openCreateModal} />
        <ActionCreate />
      </div>
      <AllField />
    </div>
  )
}

export default Dashboard
