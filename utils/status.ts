import { EFieldStatus } from "@/interface/IField"
import { EFieldBookedQueueStatus } from "@/interface/IFieldBookedQueue"
import { ETournamentStatus } from "@/interface/ITournament"

const vilizeFieldStatus = (st: EFieldStatus) => {
  switch (st) {
    case EFieldStatus.ACTIVE:
      return "Đang trống"
    case EFieldStatus.BUSY:
      return "Đang được sử dụng"
    case EFieldStatus.MAINTAINING:
      return "Đang bảo trì"
    case EFieldStatus.DELETED:
      return "Đã xóa"
    default:
      return "Không xác định"
  }
}

const colorizeFieldStatus = (st: EFieldStatus) => {
  switch (st) {
    case EFieldStatus.ACTIVE:
      return "text-green-500"
    case EFieldStatus.BUSY:
      return "text-red-400"
    case EFieldStatus.MAINTAINING:
      return "text-yellow-400"
    case EFieldStatus.DELETED:
      return "text-gray-400"
    default:
      return "text-gray-400"
  }
}

const vilizeTournamentStatus = (st: ETournamentStatus) => {
  switch (st) {
    case ETournamentStatus.ONGOING:
      return "Đang diễn ra"
    case ETournamentStatus.FINISHED:
      return "Đã kết thúc"
    case ETournamentStatus.UPCOMING:
      return "Sắp diễn ra"
    default:
      return "Không xác định"
  }
}

const colorizeTournamentStatus = (st: ETournamentStatus, usingStyle: boolean = false) => {
  switch (st) {
    case ETournamentStatus.ONGOING:
      return !usingStyle ? "text-green-500" : "#68D391"
    case ETournamentStatus.FINISHED:
      return !usingStyle ? "text-red-400" : "#FC8181"
    case ETournamentStatus.UPCOMING:
      return !usingStyle ? "text-yellow-400" : "#F6E05E"
    default:
      return !usingStyle ? "text-gray-400" : "#A0AEC0"
  }
}

const colorizeFieldBookedQueueStatus = (
  st: EFieldBookedQueueStatus,
  usingStyle: boolean = false
) => {
  switch (st) {
    case EFieldBookedQueueStatus.PENDING:
      return !usingStyle ? "text-yellow-400" : "#F6E05E"
    case EFieldBookedQueueStatus.APPROVED:
      return !usingStyle ? "text-green-500" : "#68D391"
    case EFieldBookedQueueStatus.DECLINED:
      return !usingStyle ? "text-red-400" : "#FC8181"
    default:
      return !usingStyle ? "text-gray-400" : "#A0AEC0"
  }
}

const vilizeFieldBookedQueueStatus = (st: EFieldBookedQueueStatus) => {
  switch (st) {
    case EFieldBookedQueueStatus.PENDING:
      return "Đang chờ"
    case EFieldBookedQueueStatus.APPROVED:
      return "Đã chấp nhận"
    case EFieldBookedQueueStatus.DECLINED:
      return "Đã hủy"
    default:
      return "Không xác định"
  }
}

export {
  vilizeFieldStatus,
  colorizeFieldStatus,
  vilizeTournamentStatus,
  colorizeTournamentStatus,
  colorizeFieldBookedQueueStatus,
  vilizeFieldBookedQueueStatus,
}
