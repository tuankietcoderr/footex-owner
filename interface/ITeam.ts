import IGuest from "./IGuest"
import IInvitement from "./IInvitement"
import ITournament from "./ITournament"

export enum ETeamStatus {
  ACTIVE = "active",
  BLOCKED = "blocked",
  DELETED = "deleted",
}

export default interface ITeam {
  _id?: string
  name: string
  images?: string[]
  description: string
  logo: string
  status?: ETeamStatus
  captain?: string | IGuest
  members?: string[] | IGuest[]
  jointTournaments?: string[] | ITournament[]
  joinRequests?: string[] | IInvitement[]
}
