import IUser from "./IUser"

export enum EOrganizationStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  REJECTED = "REJECTED",
  MAINTAINING = "MAINTAINING",
}

export default interface IOrganization {
  _id?: string
  name: string
  images?: string[]
  logo?: string
  address: string
  phone_number: string
  email: string
  owner?: string | IUser
  description: string
  status?: EOrganizationStatus
  active_at: number
  inactive_at: number
}
