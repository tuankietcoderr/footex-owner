import { COMMON } from "@/constants/common"
import axios from "axios"

export const API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_DEV_API
    : process.env.NEXT_PUBLIC_PROD_API

let apiInstance = axios.create({
  baseURL: API_URL,
})

apiInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem(COMMON.ACCESS_TOKEN)
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`
  }
  return config
})

export default apiInstance
