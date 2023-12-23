"use server"

import FETCH, { FETCH_WITH_TOKEN } from "@/api/fetch"
import API_ROUTE from "@/constants/api-route"
import CACHE_TAGS from "@/constants/cache-tags"
import ITournament, { ETournamentStatus } from "@/interface/ITournament"
import { revalidateTag } from "next/cache"

const getBranchTournaments = async (branch: string) => {
  const res = await FETCH_WITH_TOKEN(API_ROUTE.TOURNAMENT.BRANCH.replace(":id", branch), {
    next: {
      tags: [CACHE_TAGS.TOURNAMENT.GET_BRANCH_TOURNAMENTS],
    },
  })
  return res
}

const createTournament = async (data: ITournament) => {
  const res = await FETCH_WITH_TOKEN<ITournament>(API_ROUTE.TOURNAMENT.INDEX, {
    method: "POST",
    body: JSON.stringify(data),
  })

  if (res.success) {
    revalidateTag(CACHE_TAGS.TOURNAMENT.GET_BRANCH_TOURNAMENTS)
  }

  return res
}

const getTournamentById = async (id: string) => {
  const data = await FETCH<ITournament>(API_ROUTE.TOURNAMENT.ID.replace(":id", id), {
    next: {
      tags: [CACHE_TAGS.TOURNAMENT.GET_BY_ID],
    },
    cache: "no-store",
  })
  return data
}

const updateTournamentInfo = async (id: string, body: ITournament) => {
  const res = await FETCH_WITH_TOKEN<ITournament>(API_ROUTE.TOURNAMENT.ID.replace(":id", id), {
    method: "PUT",
    body: JSON.stringify(body),
  })
  if (res.success) {
    revalidateTag(CACHE_TAGS.TOURNAMENT.GET_BY_ID)
    revalidateTag(CACHE_TAGS.TOURNAMENT.GET_BRANCH_TOURNAMENTS)
  }
  return res
}

const updateTournamentStatus = async (id: string, status: ETournamentStatus) => {
  const res = await FETCH_WITH_TOKEN<ITournament>(API_ROUTE.TOURNAMENT.STATUS.replace(":id", id), {
    method: "PUT",
    body: JSON.stringify({ status }),
  })
  if (res.success) {
    revalidateTag(CACHE_TAGS.TOURNAMENT.GET_BY_ID)
    revalidateTag(CACHE_TAGS.TOURNAMENT.GET_BRANCH_TOURNAMENTS)
  }
  return res
}

export {
  getBranchTournaments,
  createTournament,
  getTournamentById,
  updateTournamentInfo,
  updateTournamentStatus,
}
