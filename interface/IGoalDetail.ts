import IGuest from "./IGuest"
import ITeam from "./ITeam"

export default interface IGoalDetail {
  _id?: string
  scoreAtMinute: number
  scoreBy: string | IGuest
  team: string | ITeam
}
