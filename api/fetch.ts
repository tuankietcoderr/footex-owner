"server-only"

import API_ROUTE from "@/constants/api-route"
import { FetchResponse } from "./response-helper"
import { getSession } from "@/services/auth/cookie-session"

type Options = {
  params?: Record<string, any>
  // eslint-disable-next-line no-undef
} & RequestInit

const FETCH = async <T extends any>(
  url: string,
  // eslint-disable-next-line no-undef
  options?: Options
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
    const params = new URLSearchParams((opts as Options).params)
    const res = await fetch(`${API_ROUTE.BASE_URL}${url}?${params.toString()}`, opts)
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
