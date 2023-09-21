import { create } from "zustand"
import IFootballShop, { EFootballShopStatus } from "@/interface/IFootballShop"
import {
  createBigField,
  deleteBigField,
  getAllBigFields,
  getBigFieldById,
  updateBigField,
  updateBigFieldStatus,
} from "@/services/big-field"

interface BigFieldStore {
  bigFields: IFootballShop[] | null | undefined
  bigField: IFootballShop | null | undefined
  setBigFields: (bigFields: IFootballShop[]) => void
  loadBigFields: () => Promise<void>
  loadBigField: (id: string) => Promise<void>
  addBigField: (bigField: IFootballShop) => Promise<void>
  updateBigField: (id: string, bigField: IFootballShop) => Promise<void>
  deleteBigField: (id: string) => Promise<void>
  updateBigFieldStatus: (id: string, status: EFootballShopStatus) => Promise<void>
}

const useBigFieldStore = create<BigFieldStore>((set, get) => ({
  bigFields: undefined,
  bigField: undefined,
  setBigFields: (bigFields) => set({ bigFields }),
  loadBigFields: async () => {
    const res = await getAllBigFields()
    if (res.success) {
      set({ bigFields: res.data })
    } else {
      set({ bigFields: null })
      Promise.reject(res.message)
    }
  },
  loadBigField: async (id) => {
    const res = await getBigFieldById(id)
    if (res.success) {
      set({ bigField: res.data })
    } else {
      set({ bigField: null })
      Promise.reject(res.message)
    }
  },
  addBigField: async (bigField) => {
    const res = await createBigField(bigField)
    if (res.success) {
      set({
        bigFields: [...(get().bigFields || []), res.data],
      })
    } else {
      Promise.reject(res.message)
    }
  },
  updateBigField: async (id, bigField) => {
    const bigFields = get().bigFields || []
    const index = bigFields.findIndex((item) => item._id === bigField._id)
    if (index === -1) {
      Promise.reject("Không tìm thấy sân bóng")
    }
    const res = await updateBigField(id, bigField)
    if (res.success) {
      bigFields[index] = res.data
      set({ bigFields })
    } else {
      Promise.reject(res.message)
    }
  },
  deleteBigField: async (id) => {
    const bigFields = get().bigFields || []
    const res = await deleteBigField(id)
    if (res.success) {
      set({ bigFields: bigFields.filter((item) => item._id !== id) })
    } else {
      Promise.reject(res.message)
    }
  },
  updateBigFieldStatus: async (id, status) => {
    const bigFields = get().bigFields || []
    const index = bigFields.findIndex((item) => item._id === id)
    if (index === -1) {
      Promise.reject("Không tìm thấy sân bóng")
    }
    const res = await updateBigFieldStatus(id, status)
    if (res.success) {
      bigFields[index] = res.data
      set({ bigFields })
    } else {
      Promise.reject(res.message)
    }
  },
}))

export default useBigFieldStore
