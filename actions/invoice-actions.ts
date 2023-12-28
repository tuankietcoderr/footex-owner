"use server"

import FETCH, { FETCH_WITH_TOKEN } from "@/api/fetch"
import API_ROUTE from "@/constants/api-route"
import CACHE_TAGS from "@/constants/cache-tags"
import IInvoice, { EInvoiceStatus } from "@/interface/IInvoice"
import { revalidateTag } from "next/cache"

const getInvoices = async () => {
  const data = await FETCH<IInvoice[]>(API_ROUTE.INVOICE.INDEX, {
    next: {
      tags: [CACHE_TAGS.INVOICE.GET_INVOICE],
    },
    cache: "no-store",
  })
  return data
}

const getBranchInvoices = async (branchId: string) => {
  const data = await FETCH<IInvoice[]>(API_ROUTE.INVOICE.BRANCH.replace(":id", branchId), {
    next: {
      tags: [CACHE_TAGS.INVOICE.GET_INVOICE],
    },
    cache: "no-store",
  })
  return data
}

const createInvoice = async (data: IInvoice) => {
  const res = await FETCH_WITH_TOKEN<IInvoice>(API_ROUTE.INVOICE.INDEX, {
    method: "POST",
    body: JSON.stringify(data),
  })
  if (res.success) {
    revalidateTag(CACHE_TAGS.INVOICE.GET_INVOICE)
  }
  return res
}

const updateInvoiceStatus = async (id: string, status: EInvoiceStatus) => {
  const res = await FETCH_WITH_TOKEN<IInvoice>(API_ROUTE.INVOICE.ID.replace(":id", id), {
    method: "PUT",
    body: JSON.stringify({ status }),
  })
  if (res.success) {
    revalidateTag(CACHE_TAGS.INVOICE.GET_INVOICE)
  }
  return res
}

const deleteInvoice = async (id: string) => {
  const res = await FETCH_WITH_TOKEN<IInvoice>(API_ROUTE.INVOICE.ID.replace(":id", id), {
    method: "DELETE",
  })
  if (res.success) {
    revalidateTag(CACHE_TAGS.INVOICE.GET_INVOICE)
  }
  return res
}

export { getInvoices, createInvoice, getBranchInvoices, updateInvoiceStatus, deleteInvoice }
