import { COMMON } from "@/constants/common"
import axios from "axios"

let apiInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:2003/api"
      : "https://footex.up.railway.app/api",
})

apiInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem(COMMON.ACCESS_TOKEN)
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`
  }
  return config
})

export default apiInstance
