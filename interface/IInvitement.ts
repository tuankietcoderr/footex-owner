export enum EInvitementStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export default interface IInvitement {
  _id?: string
  title: string
  owner_title: string
  team_id?: string
  user_id?: string
  status: EInvitementStatus
}
