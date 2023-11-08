import { COMMON } from "@/constants/common"
import IOwner from "@/interface/IOwner"
import { getOwner, loginOwner, registerOwner } from "@/services/owner"
import { create } from "zustand"

interface OwnerStore {
  owner: IOwner | null | undefined
  setOwner: (owner: IOwner | null) => void
  login: (data: { emailOrPhoneNumber: string; password: string }) => Promise<IOwner>
  logout: () => void
  loadOwner: () => Promise<IOwner>
  registerOwner: (data: IOwner) => Promise<void>
}

const useOwnerStore = create<OwnerStore>((set) => ({
  owner: undefined,
  setOwner: (owner) => set({ owner }),
  login: async (data) => {
    const owner = await loginOwner(data)
    if (owner.success) {
      set({ owner: owner.data })
      localStorage.setItem(COMMON.ACCESS_TOKEN, owner.accessToken)
      return owner.data
    } else {
      set({ owner: null })
      localStorage.removeItem(COMMON.ACCESS_TOKEN)
      return Promise.reject(owner.message)
    }
  },
  logout: () => {
    set({ owner: null })
    localStorage.removeItem(COMMON.ACCESS_TOKEN)
  },
  loadOwner: async () => {
    const owner = await getOwner()
    if (owner.success) {
      set({ owner: owner.data })
      return owner.data
    } else {
      set({ owner: null })
      localStorage.removeItem(COMMON.ACCESS_TOKEN)
    }
  },
  registerOwner: async (data) => {
    const newOwner = await registerOwner(data)
    if (newOwner.success) {
      set({ owner: newOwner.data })
      localStorage.setItem(COMMON.ACCESS_TOKEN, newOwner.accessToken)
    } else {
      set({ owner: null })
      return Promise.reject(newOwner.message)
    }
  },
}))

export default useOwnerStore
