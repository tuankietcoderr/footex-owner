import IBranch from "./IBranch"
import IMatch from "./IMatch"
import IPrize from "./IPrize"
import ITeam from "./ITeam"

export enum ETournamentStatus {
  ONGOING = "ongoing",
  FINISHED = "finished",
  UPCOMING = "upcoming",
}
export default interface ITournament {
  _id?: string
  name: string
  images?: string[]
  description: string
  startAt: Date
  endAt: Date
  branch?: string | IBranch
  teams?: string[] | ITeam[]
  timelines?: string[] | IMatch[]
  prize?: string | IPrize<ITeam>
  status?: ETournamentStatus
}
