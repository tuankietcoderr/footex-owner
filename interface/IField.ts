import IOrganization from "./IOrganization"

export default interface IField {
  _id?: string
  organization: string | IOrganization
  name: string
  price: number
  description?: string
  is_being_used: boolean
  images?: string[]
  thumbnail?: string
  rating?: number
}
