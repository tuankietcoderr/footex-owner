import apiInstance from "@/api/instance"
import IUser from "@/interface/IUser"

const getUser = async () => {
  try {
    const user = await apiInstance.get("/user")
    return user.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const loginUser = async (data: { username: string; password: string }) => {
  try {
    const user = await apiInstance.post("/user/signin", data)
    return user.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const registerUser = async (data: IUser) => {
  try {
    const user = await apiInstance.post("/user/signup", data)
    return user.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

export { getUser, loginUser, registerUser }
