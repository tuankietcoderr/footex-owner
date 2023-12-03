import IField, { EFieldStatus } from "@/interface/IField"
import { createField, getFieldsOfBranch, updateField, updateFieldStatus } from "@/services/field"
import { create } from "zustand"

interface IFieldStore {
  fields: IField[] | undefined | null
  setFields: (fields: IField[]) => void
  field: IField | undefined | null
  setField: (field: IField) => void
  addField: (field: IField) => Promise<IField>
  updateField: (field_id: string, field: IField) => Promise<IField>
  updateFieldStatus: (field_id: string, status: EFieldStatus) => Promise<IField>
  getFieldsOfBranch: (branchId: string) => Promise<IField[]>
  reset: (type: "all" | "single" | "multiple") => void
}

const useFieldStore = create<IFieldStore>((set, get) => ({
  field: undefined,
  setField: (field) => set({ field }),
  fields: undefined,
  setFields: (fields) => set({ fields }),
  addField: async (field) => {
    const res = await createField(field)
    if (res.success) {
      set({ field: res.data, fields: [res.data, ...(get().fields || [])] })
      return res.data
    } else {
      return Promise.reject(res.message)
    }
  },
  updateField: async (field_id, field) => {
    const res = await updateField(field_id, field)
    if (res.success) {
      const fields = get().fields?.map((f) => {
        if (f._id === field_id) {
          return res.data
        } else {
          return f
        }
      })
      set({ field: res.data, fields })
      return res.data
    } else {
      return Promise.reject(res.message)
    }
  },
  updateFieldStatus: async (field_id, status) => {
    const res = await updateFieldStatus(field_id, status)
    if (res.success) {
      const fields = get().fields?.map((f) => {
        if (f._id === field_id) {
          return res.data
        } else {
          return f
        }
      })
      set({ field: res.data, fields })
      return res.data
    } else {
      return Promise.reject(res.message)
    }
  },
  getFieldsOfBranch: async (branchId) => {
    set({ fields: undefined })
    const res = await getFieldsOfBranch(branchId)
    if (res.success) {
      set({ fields: res.data.reverse() })
      return res.data
    } else {
      set({ fields: null })
      return Promise.reject(res.message)
    }
  },
  reset: (type) => {
    if (type === "all") {
      set({ field: undefined, fields: undefined })
    } else if (type === "single") {
      set({ field: undefined })
    } else {
      set({ fields: undefined })
    }
  },
}))

export default useFieldStore
