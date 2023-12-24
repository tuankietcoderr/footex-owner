import React from "react"
import { getBranchTournaments } from "@/actions/tournament-actions"
import { ParamsProps } from "@/types/params"
import ITournament from "@/interface/ITournament"
import CreateTournamentForm from "./_components/create-tournament-form"
import { getBranchPrizes } from "@/actions/prize-actions"
import IPrize from "@/interface/IPrize"

const page = async ({ params: { id } }: ParamsProps) => {
  const { success, data } = await getBranchTournaments(id)
  const { success: prizeSuccess, data: prizeData } = await getBranchPrizes(id)
  if (!success || !prizeSuccess) return <div>error</div>
  const tournaments = data as ITournament[]
  const prizes = prizeData as IPrize[]
  return (
    <div>
      <CreateTournamentForm tournaments={tournaments} prizes={prizes} />
    </div>
  )
}

export default page
