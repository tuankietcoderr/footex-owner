"use client"
import CreateButton from "@/components/create-button"
import { useTournamentManagementContext } from "@/context/TournamentManagementContext"
import AllTournament from "./all-tournament"
import AllPrizes from "./all-prize"
import { usePrizeManagementContext } from "@/context/PrizeManagementContext"
import ActionCreate from "@/components/action-create"

const Dashboard = () => {
  const { openCreateModal: openPrizeCreateModal } = usePrizeManagementContext()
  return (
    <div className="grid gap-4">
      <h1 className="text-xl font-bold">Quản lý giải đấu</h1>
      <AllTournament />
      <h1 className="text-xl font-bold">Quản lý giải thưởng</h1>
      <div className="grid grid-cols-[200px_auto] gap-4">
        <CreateButton onClick={openPrizeCreateModal} />
        <ActionCreate title="Tạo giải thưởng cho các giải đấu" rightSide={null} />
      </div>
      <AllPrizes />
    </div>
  )
}

export default Dashboard
