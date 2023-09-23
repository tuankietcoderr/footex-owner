import IField from "./IField"
import IUser from "./IUser"

export enum EBOOKED_QUEUE_STATUS {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  ACCEPTED = "ACCEPTED",
}
export default interface IFieldBookedQueue {
  _id?: string
  field: string | IField
  booked_time?: Date
  booked_by: string | IUser
  time_count: number
  status: EBOOKED_QUEUE_STATUS
}
