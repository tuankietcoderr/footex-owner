"use server"

import FETCH, { FETCH_WITH_TOKEN } from "@/api/fetch"
import API_ROUTE from "@/constants/api-route"
import CACHE_TAGS from "@/constants/cache-tags"
import IField, { EFieldStatus } from "@/interface/IField"
import { revalidateTag } from "next/cache"

const getFieldsOfBranch = async (branch: string) => {
  const res = await FETCH_WITH_TOKEN(API_ROUTE.FIELD.BRANCH.replace(":id", branch), {
    next: {
      tags: [CACHE_TAGS.FIELD.GET_FIELDS_OF_BRANCH],
    },
  })

  return res
}

const getFieldById = async (id: string) => {
  const url = API_ROUTE.FIELD.ID.replace(":id", id)
  const data = await FETCH<IField>(url, {
    next: {
      tags: [CACHE_TAGS.FIELD.GET_BY_ID],
    },
  })
  return data
}

const updateFieldStatus = async (id: string, status: EFieldStatus) => {
  const data = await FETCH_WITH_TOKEN<IField>(API_ROUTE.FIELD.STATUS.replace(":id", id), {
    method: "PUT",
    body: JSON.stringify({ status }),
  })
  if (data.success) {
    revalidateTag(CACHE_TAGS.FIELD.GET_BY_ID)
    revalidateTag(CACHE_TAGS.FIELD.GET_FIELDS_OF_BRANCH)
  }
  return data
}

const updateFieldInfo = async (id: string, body: IField) => {
  const res = await FETCH_WITH_TOKEN<IField>(API_ROUTE.FIELD.ID.replace(":id", id), {
    method: "PUT",
    body: JSON.stringify(body),
  })
  if (res.success) {
    revalidateTag(CACHE_TAGS.FIELD.GET_BY_ID)
    revalidateTag(CACHE_TAGS.FIELD.GET_FIELDS_OF_BRANCH)
  }
  return res
}

const createField = async (data: IField) => {
  const res = await FETCH_WITH_TOKEN<IField>(API_ROUTE.FIELD.INDEX, {
    method: "POST",
    body: JSON.stringify(data),
  })

  if (res.success) {
    revalidateTag(CACHE_TAGS.FIELD.GET_FIELDS_OF_BRANCH)
  }

  return res
}

export { createField, getFieldById, getFieldsOfBranch, updateFieldInfo, updateFieldStatus }
