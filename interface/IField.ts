import IBranch from "./IBranch"
import IOrganization from "./IBranch"

export enum EFieldStatus {
  ACTIVE = "active",
  BUSY = "busy",
  MAINTAINING = "maintaining",
  DELETED = "deleted",
}

export default interface IField {
  _id?: string
  name: string
  price: number
  type: number
  image?: string
  status?: EFieldStatus
  branch?: string | IBranch
  description: string
}
