import IField from "@/interface/IField"
import { createField, getFieldsOfOrganization } from "@/services/field"
import { create } from "zustand"

interface IFieldStore {
  fields: IField[] | undefined | null
  setFields: (fields: IField[]) => void
  field: IField | undefined | null
  setField: (field: IField) => void
  addField: (field: IField) => Promise<IField>
  getFieldsOfOrg: (orgId: string) => Promise<IField[]>
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
  getFieldsOfOrg: async (orgId) => {
    set({ fields: undefined })
    const res = await getFieldsOfOrganization(orgId)
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
