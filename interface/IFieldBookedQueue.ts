import IField from "./IField"
import IGuest from "./IGuest"

export enum EFieldBookedQueueStatus {
  PENDING = "pending",
  APPROVED = "approved",
  DECLINED = "declined",
}

export default interface IFieldBookedQueue {
  _id?: string
  bookedBy: string | IGuest
  startAt: Date
  endAt: Date
  status?: EFieldBookedQueueStatus
  field?: string | IField
}
