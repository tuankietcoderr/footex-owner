"use client"
import { updateTournamentStatus } from "@/actions/tournament-actions"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { EFieldStatus } from "@/interface/IField"
import { ETournamentStatus } from "@/interface/ITournament"
import { cn } from "@/lib/utils"
import { vilizeTournamentStatus } from "@/utils/status"
import toast from "react-hot-toast"

type Props = {
  status: ETournamentStatus
  tournamentId: string
}

const UpdateTournamentStatus = ({ status, tournamentId }: Props) => {
  const tournamentStatuses = Object.values(ETournamentStatus)

  const handleUpdateStatus = async (_status: ETournamentStatus) => {
    toast.loading("Đang cập nhật trạng thái sân", {
      duration: Infinity,
    })
    const { success, message } = await updateTournamentStatus(tournamentId, _status)
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
        <SelectValue placeholder="Cập nhật trạng thái giải đấu" />
      </SelectTrigger>
      <SelectContent>
        {tournamentStatuses.map((_status) => (
          <SelectItem key={_status} value={_status}>
            {vilizeTournamentStatus(_status)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default UpdateTournamentStatus
