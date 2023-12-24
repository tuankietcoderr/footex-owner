import IAddress from "./IAddress"

export default interface IUser extends IAddress {
  _id?: string
  password?: string
  name: string
  email?: string
  avatar?: string
  phoneNumber: string
  isEmailVerified?: boolean
}
