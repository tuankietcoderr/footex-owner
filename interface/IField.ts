import IFootballShop from "./IFootballShop"

export default interface IField {
  _id?: string
  footballshop_id?: string | IFootballShop
  name: string
  price?: number
  description?: string
  is_being_used?: boolean
}
