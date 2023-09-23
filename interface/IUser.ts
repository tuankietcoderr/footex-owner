export enum EUserRole {
  ADMIN = "admin",
  OWNER = "owner",
  GUEST = "guest",
}

export default interface IUser {
  _id?: string
  username: string
  password?: string
  role: EUserRole
  name: string
  email: string
  avatar?: string
  phone_number?: string
  teams: string[]
}
