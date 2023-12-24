import React from "react"
import AllTournaments from "./_components/all-tournaments"
import { getBranchTournaments } from "@/actions/tournament-actions"
import { ParamsProps } from "@/types/params"
import ITournament from "@/interface/ITournament"

const page = async ({ params: { id } }: ParamsProps) => {
  const { success, data } = await getBranchTournaments(id)
  if (!success) return <div>error</div>
  const tournaments = data as ITournament[]
  return (
    <div>
      <AllTournaments tournaments={tournaments} />
    </div>
  )
}

export default page
