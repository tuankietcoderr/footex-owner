"use server"

import FETCH, { FETCH_WITH_TOKEN } from "@/api/fetch"
import API_ROUTE from "@/constants/api-route"
import CACHE_TAGS from "@/constants/cache-tags"
import IField from "@/interface/IField"
import IRate, { ERate } from "@/interface/IRate"
import { revalidateTag } from "next/cache"

const getObjectRates = async (objectType: ERate, objectId: string) => {
  const data = await FETCH<IRate[]>(
    API_ROUTE.RATE.OBJECT.replace(":objectType", objectType).replace(":objectId", objectId),
    {
      next: {
        tags: [CACHE_TAGS.RATE.OBJECT],
      },
    }
  )
  return data
}

const createRate = async (data: IRate) => {
  const res = await FETCH_WITH_TOKEN<IRate<IField>>(API_ROUTE.RATE.INDEX, {
    method: "POST",
    body: JSON.stringify(data),
  })
  if (res.success) {
    revalidateTag(CACHE_TAGS.RATE.OBJECT)
  }
  return res
}

export { getObjectRates, createRate }
