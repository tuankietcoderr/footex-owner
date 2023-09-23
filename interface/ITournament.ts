import IOrganization from "./IOrganization"

export interface ISponsor {
  name: string
  logo?: string
}

export default interface ITournament {
  _id?: string
  name: string
  images?: string[]
  start_date: Date
  end_date: Date
  description: string
  teams: string[]
  organizer: string | IOrganization
  sponsors: ISponsor[]
  //   timelines?:
}
