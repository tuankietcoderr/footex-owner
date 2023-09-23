import ITeam from "./ITeam"
import IUser from "./IUser"

export enum EInvitementStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export default interface IInvitement {
  _id?: string
  title: string
  owner_title: string
  team: string | ITeam
  user: string | IUser
  status: EInvitementStatus
}
