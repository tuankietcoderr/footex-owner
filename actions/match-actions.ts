"use server"
import FETCH, { FETCH_WITH_TOKEN } from "@/api/fetch"
import API_ROUTE from "@/constants/api-route"
import CACHE_TAGS from "@/constants/cache-tags"
import ICardFine, { ECard } from "@/interface/ICardFine"
import IGoalDetail from "@/interface/IGoalDetail"
import IMatch from "@/interface/IMatch"
import { revalidatePath, revalidateTag } from "next/cache"

const createMatch = async (body: IMatch) => {
  const res = await FETCH_WITH_TOKEN<IMatch>(API_ROUTE.MATCH.INDEX, {
    method: "POST",
    body: JSON.stringify(body),
  })
  if (res.success) {
    revalidatePath(CACHE_TAGS.TOURNAMENT.GET_BY_ID)
  }
  return res
}

const getMatchById = async (id: string) => {
  const res = await FETCH<IMatch>(API_ROUTE.MATCH.ID.replace(":id", id), {
    next: {
      tags: [CACHE_TAGS.MATCH.GET_BY_ID],
    },
    cache: "no-store",
  })
  return res
}

const createGoal = async (matchId: string, body: IGoalDetail) => {
  const res = await FETCH_WITH_TOKEN<IGoalDetail>(API_ROUTE.MATCH.GOAL.replace(":id", matchId), {
    method: "PUT",
    body: JSON.stringify(body),
  })
  if (res.success) {
    revalidatePath(CACHE_TAGS.MATCH.GET_BY_ID)
  }
  return res
}

const removeGoal = async (matchId: string, goalId: string) => {
  const res = await FETCH_WITH_TOKEN<IGoalDetail>(
    API_ROUTE.MATCH.GOAL_ID.replace(":id", matchId).replace(":goalId", goalId),
    {
      method: "DELETE",
    }
  )
  if (res.success) {
    revalidatePath(CACHE_TAGS.MATCH.GET_BY_ID)
  }
  return res
}

const createCardFine = async (matchId: string, body: ICardFine) => {
  const res = await FETCH_WITH_TOKEN<ICardFine>(API_ROUTE.MATCH.CARD_FINE.replace(":id", matchId), {
    method: "PUT",
    body: JSON.stringify(body),
  })
  if (res.success) {
    revalidatePath(CACHE_TAGS.MATCH.GET_BY_ID)
  }
  return res
}

const addFineForPlayer = async (matchId: string, fineId: string, card: ECard) => {
  const res = await FETCH_WITH_TOKEN<ICardFine>(
    API_ROUTE.MATCH.CARD_FINE_ID_CARD.replace(":id", matchId).replace(":fineId", fineId),
    {
      method: "PUT",
      body: JSON.stringify({ card }),
    }
  )
  if (res.success) {
    revalidatePath(CACHE_TAGS.MATCH.GET_BY_ID)
  }
  return res
}

const removeFineForPlayer = async (matchId: string, fineId: string, card: ECard) => {
  const res = await FETCH_WITH_TOKEN<ICardFine>(
    API_ROUTE.MATCH.CARD_FINE_ID_CARD.replace(":id", matchId).replace(":fineId", fineId),
    {
      method: "DELETE",
      body: JSON.stringify({ card }),
    }
  )
  if (res.success) {
    revalidatePath(CACHE_TAGS.MATCH.GET_BY_ID)
  }
  return res
}

const deleteFine = async (matchId: string, fineId: string) => {
  const res = await FETCH_WITH_TOKEN<ICardFine>(
    API_ROUTE.MATCH.CARD_FINE_ID.replace(":id", matchId).replace(":fineId", fineId),
    {
      method: "DELETE",
    }
  )
  if (res.success) {
    revalidatePath(CACHE_TAGS.MATCH.GET_BY_ID)
  }
  return res
}

export {
  createMatch,
  getMatchById,
  createGoal,
  removeGoal,
  createCardFine,
  addFineForPlayer,
  removeFineForPlayer,
  deleteFine,
}
