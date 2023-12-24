import IUser from "./IUser"

export enum EOwnerStatus {
  PENDING = "pending",
  ACTIVE = "active",
  BLOCKED = "blocked",
  REJECTED = "rejected",
  DELETED = "deleted",
}

export default interface IOwner extends IUser {
  status?: EOwnerStatus
}
