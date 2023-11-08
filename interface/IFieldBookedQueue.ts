import IField from "./IField"
import IGuest from "./IGuest"

export enum EFieldBookedQueueStatus {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  ACCEPTED = "ACCEPTED",
}
export default interface IFieldBookedQueue {
  _id?: string
  bookedAt: Date
  bookedBy: string | IGuest
  usageTimeCount: number
  status: EFieldBookedQueueStatus
  field: string | IField
}
