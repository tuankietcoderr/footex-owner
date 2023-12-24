import { getTournamentById } from "@/actions/tournament-actions"
import { Separator } from "@/components/ui/separator"
import TournamentMainInfo from "./_components/tournament-main-info"
import ITournament from "@/interface/ITournament"
import TournamentMatches from "./_components/tournament-matches"
import TournamentJointTeams from "./_components/tournament-joint-teams"
import ITeam from "@/interface/ITeam"
import { ParamsProps } from "@/types/params"
import { getBranchPrizes } from "@/actions/prize-actions"
import IMatch from "@/interface/IMatch"
import { getFieldsOfBranch } from "@/actions/field-actions"
import IField from "@/interface/IField"

const page = async ({ params: { tournament_id, id } }: ParamsProps) => {
  const { success: fieldSuccess, data: fields } = await getFieldsOfBranch(id)
  const { success, data, code, message } = await getTournamentById(tournament_id)
  if (!fieldSuccess || !success) {
    return (
      <div>
        {code} + {message}
      </div>
    )
  }
  const tournament = data as ITournament
  return (
    <div className="space-y-4">
      <TournamentMainInfo {...tournament} />
      <div className="rounded-md border border-border p-4 shadow-sm">
        <h4 className="font-semibold">Mô tả</h4>
        <Separator />
        <p className="mt-2 whitespace-pre-wrap">{tournament.description}</p>
      </div>
      <TournamentJointTeams teams={tournament.teams as ITeam[]} />
      <TournamentMatches
        tournamentId={tournament_id}
        matches={tournament.matches as IMatch[]}
        fields={fields as IField[]}
        teams={tournament.teams as ITeam[]}
      />
    </div>
  )
}

export default page
