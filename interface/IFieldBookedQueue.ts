export enum EBOOKED_QUEUE_STATUS {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  ACCEPTED = "ACCEPTED",
}
export default interface IFieldBookedQueue {
  _id?: string
  field_id?: string
  booked_time?: Date
  booked_by?: string
  time_count?: number
  status?: EBOOKED_QUEUE_STATUS
}
