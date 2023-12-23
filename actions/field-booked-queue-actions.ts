"use server"
import FETCH, { FETCH_WITH_TOKEN } from "@/api/fetch"
import API_ROUTE from "@/constants/api-route"
import CACHE_TAGS from "@/constants/cache-tags"
import IFieldBookedQueue, { EFieldBookedQueueStatus } from "@/interface/IFieldBookedQueue"
import { revalidateTag } from "next/cache"

const getFieldBookedQueue = async (fieldId: string) => {
  const url = API_ROUTE.FIELD_BOOKED_QUEUE.FIELD.replace(":id", fieldId)
  const data = await FETCH<IFieldBookedQueue[]>(url, {
    next: {
      tags: [CACHE_TAGS.FIELD_BOOKED_QUEUE.GET_FIELD_BOOKED_QUEUE],
    },
    cache: "no-store",
  })
  return data
}

const updateFieldBookedQueueStatus = async (id: string, status: EFieldBookedQueueStatus) => {
  const res = await FETCH_WITH_TOKEN<IFieldBookedQueue>(
    API_ROUTE.FIELD_BOOKED_QUEUE.STATUS.replace(":id", id),
    {
      method: "PUT",
      body: JSON.stringify({ status }),
    }
  )
  if (res.success) {
    revalidateTag(CACHE_TAGS.FIELD_BOOKED_QUEUE.GET_FIELD_BOOKED_QUEUE)
  }
  return res
}

const bookField = async (data: IFieldBookedQueue) => {
  const res = await FETCH_WITH_TOKEN<IFieldBookedQueue>(API_ROUTE.FIELD_BOOKED_QUEUE.INDEX, {
    method: "POST",
    body: JSON.stringify(data),
  })
  if (res.success) {
    revalidateTag(CACHE_TAGS.FIELD_BOOKED_QUEUE.GET_FIELD_BOOKED_QUEUE)
  }
  return res
}

const removeFieldBookedQueue = async (id: string) => {
  const res = await FETCH_WITH_TOKEN<IFieldBookedQueue>(
    API_ROUTE.FIELD_BOOKED_QUEUE.ID.replace(":id", id),
    {
      method: "DELETE",
    }
  )
  if (res.success) {
    revalidateTag(CACHE_TAGS.FIELD_BOOKED_QUEUE.GET_FIELD_BOOKED_QUEUE)
  }
  return res
}

export { getFieldBookedQueue, bookField, removeFieldBookedQueue, updateFieldBookedQueueStatus }
