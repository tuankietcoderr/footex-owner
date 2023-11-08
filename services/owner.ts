import apiInstance from "@/api/instance"
import API_ROUTE from "@/constants/api-route"
import IOwner from "@/interface/IOwner"

const getOwner = async () => {
  try {
    const owner = await apiInstance.get(API_ROUTE.OWNER.INDEX)
    return owner.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const loginOwner = async (data: { emailOrPhoneNumber: string; password: string }) => {
  try {
    const owner = await apiInstance.post(API_ROUTE.OWNER.SIGN_IN, data)
    return owner.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const registerOwner = async (data: IOwner) => {
  try {
    const owner = await apiInstance.post(API_ROUTE.OWNER.SIGN_UP, data)
    return owner.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

export { getOwner, loginOwner, registerOwner }
