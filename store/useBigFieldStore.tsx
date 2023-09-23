import { create } from "zustand"
import IOrganization, { EOrganizationStatus } from "@/interface/IOrganization"
import {
  createBigField,
  deleteBigField,
  getAllBigFields,
  getBigFieldById,
  updateBigField,
  updateBigFieldStatus,
} from "@/services/big-field"

interface BigFieldStore {
  bigFields: IOrganization[] | null | undefined
  bigField: IOrganization | null | undefined
  setBigField: (bigField: IOrganization) => void
  setBigFields: (bigFields: IOrganization[]) => void
  loadBigFields: () => Promise<IOrganization[]>
  loadBigField: (id: string) => Promise<void>
  addBigField: (bigField: IOrganization) => Promise<IOrganization>
  updateBigField: (id: string, bigField: IOrganization) => Promise<void>
  deleteBigField: (id: string) => Promise<void>
  updateBigFieldStatus: (id: string, status: EOrganizationStatus) => Promise<void>
  reset: (type: "all" | "single" | "multiple") => void
}

const useBigFieldStore = create<BigFieldStore>((set, get) => ({
  bigFields: undefined,
  bigField: undefined,
  setBigFields: (bigFields) => set({ bigFields }),
  loadBigFields: async () => {
    const res = await getAllBigFields()
    if (res.success) {
      set({ bigFields: res.data })
      return res.data
    } else {
      set({ bigFields: null })
      throw res.message
    }
  },
  loadBigField: async (id) => {
    const res = await getBigFieldById(id)
    if (res.success) {
      set({ bigField: res.data })
    } else {
      set({ bigField: null })
      throw res.message
    }
  },
  setBigField: (bigField) => set({ bigField }),
  addBigField: async (bigField) => {
    const res = await createBigField(bigField)
    if (res.success) {
      set({
        bigFields: [...(get().bigFields || []), res.data],
        bigField: res.data,
      })
      return res.data
    } else {
      throw res.message
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
      throw res.message
    }
  },
  deleteBigField: async (id) => {
    const bigFields = get().bigFields || []
    const res = await deleteBigField(id)
    if (res.success) {
      set({ bigFields: bigFields.filter((item) => item._id !== id) })
    } else {
      throw res.message
    }
  },
  updateBigFieldStatus: async (id, status) => {
    const bigFields = get().bigFields || []
    const index = bigFields.findIndex((item) => item._id === id)
    if (index === -1) {
      throw "Không tìm thấy sân bóng"
    }
    const res = await updateBigFieldStatus(id, status)
    if (res.success) {
      bigFields[index] = res.data
      set({ bigFields })
    } else {
      throw res.message
    }
  },
  reset: (type) => {
    switch (type) {
      case "all":
        set({ bigFields: undefined, bigField: undefined })
        break
      case "single":
        set({ bigField: undefined })
        break
      case "multiple":
        set({ bigFields: undefined })
        break
      default:
        break
    }
  },
}))

export default useBigFieldStore
