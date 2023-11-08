import IOwner from "./IOwner"

export enum EBranchStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  REJECTED = "REJECTED",
  MAINTAINING = "MAINTAINING",
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
