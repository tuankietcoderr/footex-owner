"use server"

import FETCH from "@/api/fetch"
import API_ROUTE from "@/constants/api-route"
import CACHE_TAGS from "@/constants/cache-tags"
import IPrize from "@/interface/IPrize"

const getBranchPrizes = async (branch: string) => {
  const res = await FETCH<IPrize[]>(API_ROUTE.PRIZE.BRANCH.replace(":id", branch), {
    next: {
      tags: [CACHE_TAGS.PRIZE.BRANCH],
    },
  })
  return res
}

export { getBranchPrizes }
