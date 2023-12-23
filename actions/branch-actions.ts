"use server"

import FETCH, { FETCH_WITH_TOKEN } from "@/api/fetch"

import API_ROUTE from "@/constants/api-route"
import CACHE_TAGS from "@/constants/cache-tags"
import IBranch from "@/interface/IBranch"
import { revalidateTag } from "next/cache"

const getOwnerBranches = async () => {
  const res = await FETCH_WITH_TOKEN<IBranch[]>(API_ROUTE.BRANCH.OWNER, {
    next: {
      tags: [CACHE_TAGS.BRANCH.GET_OWNER_BRANCHES],
    },
  })

  return res
}

const getBranchById = async (branchId: string) => {
  const res = await FETCH(API_ROUTE.BRANCH.ID.replace(":id", branchId), {
    next: {
      tags: [CACHE_TAGS.BRANCH.GET_BRANCH_BY_ID],
    },
  })
  return res
}

const createBranch = async (body: IBranch) => {
  const res = await FETCH_WITH_TOKEN<IBranch>(API_ROUTE.BRANCH.INDEX, {
    method: "POST",
    body: JSON.stringify(body),
  })
  if (res.success) {
    revalidateTag(CACHE_TAGS.BRANCH.GET_OWNER_BRANCHES)
  }
  return res
}

const updateBranchInfo = async (branchId: string, body: IBranch) => {
  const res = await FETCH_WITH_TOKEN<IBranch>(API_ROUTE.BRANCH.ID.replace(":id", branchId), {
    method: "PUT",
    body: JSON.stringify(body),
  })
  if (res.success) {
    revalidateTag(CACHE_TAGS.BRANCH.GET_OWNER_BRANCHES)
  }
  return res
}

export { getOwnerBranches, createBranch, updateBranchInfo, getBranchById }
