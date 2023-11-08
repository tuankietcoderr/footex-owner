export default interface IUser {
  _id?: string
  password?: string
  name: string
  email: string
  avatar?: string
  phoneNumber: string
  isEmailVerified?: boolean
  houseNumber: string
  street: string
  ward: string
  district: string
  city: string
}
