"server-only"

import API_ROUTE from "@/constants/api-route"
import { FetchResponse } from "./response-helper"
import { getSession } from "@/services/auth/cookie-session"

const FETCH = async <T extends any>(
  url: string,
  // eslint-disable-next-line no-undef
  options?: RequestInit
): Promise<FetchResponse<T>> => {
  const opts = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options?.headers,
    },
  }
  try {
    const res = await fetch(`${API_ROUTE.BASE_URL}${url}`, opts)
    const data = await res.json()
    return {
      ...data,
      code: res.status,
    }
  } catch (error: any) {
    console.log(error)
    return {
      success: false,
      message: error?.response?.message ?? error?.message,
      code: error?.status,
    } as FetchResponse<T>
  }
}

export const FETCH_WITH_TOKEN = async <T extends any>(
  url: string,
  // eslint-disable-next-line no-undef
  options?: RequestInit
): Promise<FetchResponse<T>> => {
  const { session } = await getSession()
  return await FETCH<T>(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: "Bearer " + session.accessToken,
    },
  })
}

export default FETCH
