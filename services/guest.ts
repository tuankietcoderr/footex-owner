import apiInstance from "@/api/instance"
import API_ROUTE from "@/constants/api-route"

const searchGuest = async (phone: string) => {
  try {
    const res = await apiInstance.get(API_ROUTE.GUEST.PHONE_NUMBER.replace(":phone", phone))
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

export { searchGuest }
