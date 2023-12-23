import ICardFine from "./ICardFine"
import IField from "./IField"
import IGoalDetail from "./IGoalDetail"
import ITeam from "./ITeam"
import ITournament from "./ITournament"

export default interface IMatch {
  _id?: string
  tournament?: string | ITournament
  field?: string | IField
  startAt: Date
  endAt: Date
  leftTeam?: string | ITeam
  rightTeam?: string | ITeam
  leftTeamGoals?: string[] | IGoalDetail[]
  rightTeamGoals?: string[] | IGoalDetail[]
  fines?: string[] | ICardFine[]
}
