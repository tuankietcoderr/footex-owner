import { COMMON } from "@/constants/common"
import IUser, { EUserRole } from "@/interface/IUser"
import { getUser, loginUser, registerUser } from "@/services/user"
import { create } from "zustand"

interface UserStore {
  user: IUser | null | undefined
  setUser: (user: IUser | null) => void
  login: (data: { username: string; password: string }) => Promise<void>
  logout: () => void
  loadUser: () => Promise<void>
  registerUser: (data: IUser) => Promise<void>
}

const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
  login: async (data) => {
    const user = await loginUser(data)
    if (user.success) {
      set({ user: user.data })
      localStorage.setItem(COMMON.ACCESS_TOKEN, user.accessToken)
    } else {
      set({ user: null })
      localStorage.removeItem(COMMON.ACCESS_TOKEN)
      return Promise.reject(user.message)
    }
  },
  logout: () => {
    set({ user: null })
    localStorage.removeItem(COMMON.ACCESS_TOKEN)
  },
  loadUser: async () => {
    const user = await getUser()
    if (user.success) {
      set({ user: user.data })
    } else {
      set({ user: null })
      localStorage.removeItem(COMMON.ACCESS_TOKEN)
    }
  },
  registerUser: async (data) => {
    const newUser = await registerUser(data)
    if (newUser.success) {
      set({ user: newUser.data })
      localStorage.setItem(COMMON.ACCESS_TOKEN, newUser.accessToken)
    } else {
      set({ user: null })
      return Promise.reject(newUser.message)
    }
  },
}))

export default useUserStore
