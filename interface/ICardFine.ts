import IGuest from "./IGuest"

export enum ECard {
  YELLOW = "yellow",
  RED = "red",
}

export default interface ICardFine {
  _id?: string
  cards: ECard[]
  player: string | IGuest
}
