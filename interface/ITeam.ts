import IUser from "./IOwner"

export default interface ITeam {
  _id?: string
  name: string
  logo: string
  description: string
  images?: string[]
  members: string[]
  owner: string | IUser
}
