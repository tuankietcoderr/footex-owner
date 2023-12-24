"use server"

import FETCH, { FETCH_WITH_TOKEN } from "@/api/fetch"
import API_ROUTE from "@/constants/api-route"
import CACHE_TAGS from "@/constants/cache-tags"
import IPrize from "@/interface/IPrize"
import { revalidateTag } from "next/cache"

const getBranchPrizes = async (branch: string) => {
  const res = await FETCH<IPrize[]>(API_ROUTE.PRIZE.BRANCH.replace(":id", branch), {
    next: {
      tags: [CACHE_TAGS.PRIZE.BRANCH],
    },
  })
  return res
}

const createPrize = async (data: IPrize) => {
  const res = await FETCH_WITH_TOKEN<IPrize>(API_ROUTE.PRIZE.INDEX, {
    method: "POST",
    body: JSON.stringify(data),
  })

  if (res.success) {
    revalidateTag(CACHE_TAGS.PRIZE.BRANCH)
  }

  return res
}

export { getBranchPrizes, createPrize }
