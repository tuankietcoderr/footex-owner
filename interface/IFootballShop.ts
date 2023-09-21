export enum EFootballShopStatus {
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  MAINTAINING = "MAINTAINING",
}

export default interface IFootballShop {
  _id?: string
  name: string
  images?: string[]
  logo?: string
  address: string
  phone_number?: string
  email?: string
  owner_id?: string
  description?: string
  status?: EFootballShopStatus
  active_at: number
  inactive_at: number
}
