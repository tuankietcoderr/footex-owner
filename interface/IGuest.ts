import IUser from "./IUser"

enum EGuestStatus {
  ACTIVE = "active",
  BLOCKED = "blocked",
  DELETED = "deleted",
}

export default interface IGuest extends IUser {
  status?: EGuestStatus
}
