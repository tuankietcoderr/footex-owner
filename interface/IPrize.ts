import IBranch from "./IBranch"
import IGuest from "./IGuest"
import ITeam from "./ITeam"

type SCHEMA = "guests" | "teams"

export default interface IPrize<T = IGuest | ITeam> {
  _id?: string
  name: string
  value: number
  image?: string
  description?: string
  branch?: string | IBranch
  winners?: string[] | T[]
}
