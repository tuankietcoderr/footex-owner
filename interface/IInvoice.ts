import IFieldBookedQueue from "./IFieldBookedQueue"

export enum EInvoiceStatus {
  PENDING = "pending",
  PAID = "paid",
  CANCELLED = "cancelled",
}

export default interface IInvoice {
  _id?: string
  total: number
  status?: EInvoiceStatus
  fieldBooked?: string | IFieldBookedQueue
  createdAt?: Date
}
