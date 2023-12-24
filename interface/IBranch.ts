import IOwner from "./IOwner"

export enum EBranchStatus {
  ACTIVE = "active",
  MAINTAINING = "maintaining",
  REJECTED = "rejected",
  BLOCKED = "blocked",
  DELETED = "deleted",
}

export default interface IBranch {
  _id?: string
  name: string
  phoneNumber: string
  images?: string[]
  logo?: string
  description: string
  openAt: number
  closeAt: number
  status?: EBranchStatus
  houseNumber: string
  street: string
  ward: string
  district: string
  city: string
  owner?: string | IOwner
}
