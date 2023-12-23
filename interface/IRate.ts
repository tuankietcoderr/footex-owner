import IBranch from "./IBranch"
import IField from "./IField"
import IGuest from "./IGuest"
import ITeam from "./ITeam"

export enum ERate {
  TEAM = "teams",
  FIELD = "fields",
  BRANCH = "branches",
}

export default interface IRate<T = IBranch | ITeam | IField> {
  _id?: string
  valuer?: string | IGuest
  rateValue: number
  object?: string | T
  refPath?: ERate
  description: string
  createdAt?: Date
}
