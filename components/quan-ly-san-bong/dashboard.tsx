"use client"
import { useFieldManagementContext } from "@/context/FieldManagementContext"
import CreateButton from "../create-button"
import ActionCreate from "./action-create"
import ActiveField from "./active-field"
import BusyField from "./busy-field"
import useFieldStore from "@/store/useFieldStore"

const Dashboard = () => {
  const { openCreateModal } = useFieldManagementContext()
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-[200px_auto] gap-4">
        <CreateButton onClick={openCreateModal} />
        <ActionCreate />
      </div>
      <BusyField />
      <ActiveField />
      <div className="grid min-h-[400px] grid-cols-[300px_auto] gap-4">
        <div className="rounded-lg bg-slate-200"></div>
        <div className="rounded-lg bg-slate-200"></div>
      </div>
      <div className="min-h-[100px] rounded-lg bg-slate-200" />
      <div className="grid min-h-[400px] grid-cols-[auto_300px] gap-4">
        <div className="rounded-lg bg-slate-200"></div>
        <div className="rounded-lg bg-slate-200"></div>
      </div>
    </div>
  )
}

export default Dashboard
