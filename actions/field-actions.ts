"use server"
import apiInstance, { API_URL } from "@/api/instance"
import API_ROUTE from "@/constants/api-route"
import { COMMON } from "@/constants/common"
import { EFieldStatus } from "@/interface/IField"
import { cookies } from "next/headers"

const updateFieldStatus = async (fieldId: string, status: EFieldStatus) => {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get(COMMON.ACCESS_TOKEN)
    const res = await fetch(`${API_URL}/${API_ROUTE.FIELD.STATUS.replace(":id", fieldId)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token?.value,
      },
      body: JSON.stringify({
        status,
      }),
    })
    const data = await res.json()
    return data
  } catch (err: any) {
    return err?.response?.data ?? err?.message
  }
}

export { updateFieldStatus }
