import IFieldBookedQueue, { EFieldBookedQueueStatus } from "@/interface/IFieldBookedQueue"
import {
  createFieldBookedQueue,
  deleteFieldBookedQueue,
  getFieldBookedQueuesOfField,
  updateFieldBookedQueueStatus,
} from "@/services/field-booked-queue"
import { create } from "zustand"

interface IFieldBookedQueueStore {
  fieldBookedQueues: IFieldBookedQueue[] | undefined | null
  setFieldBookedQueues: (fieldBookedQueues: IFieldBookedQueue[]) => void
  addFieldBookedQueue: (fieldBookedQueue: IFieldBookedQueue) => Promise<IFieldBookedQueue>
  updateFieldBookedQueueStatus: (
    fieldBookedQueue_id: string,
    status: EFieldBookedQueueStatus
  ) => Promise<IFieldBookedQueue>
  getFieldBookedQueuesOfField: (fieldId: string) => Promise<IFieldBookedQueue[]>
  deleteFieldBookedQueue: (fieldBookedQueue_id: string) => Promise<IFieldBookedQueue>
  reset: (type: "all" | "single" | "multiple") => void
}

const useFieldBookedQueueStore = create<IFieldBookedQueueStore>((set, get) => ({
  fieldBookedQueues: undefined,
  setFieldBookedQueues: (fieldBookedQueues) => set({ fieldBookedQueues }),
  addFieldBookedQueue: async (fieldBookedQueue) => {
    const res = await createFieldBookedQueue(fieldBookedQueue)
    if (res.success) {
      set({
        fieldBookedQueues: [res.data, ...(get().fieldBookedQueues || [])],
      })
      return res.data
    } else {
      return Promise.reject(res.message)
    }
  },
  updateFieldBookedQueueStatus: async (fieldBookedQueue_id, status) => {
    const res = await updateFieldBookedQueueStatus(fieldBookedQueue_id, status)
    if (res.success) {
      const fieldBookedQueues = get().fieldBookedQueues?.map((f) => {
        if (f._id === fieldBookedQueue_id) {
          return {
            ...f,
            status,
          }
        } else {
          return f
        }
      })
      set({ fieldBookedQueues })
      return res.data
    } else {
      return Promise.reject(res.message)
    }
  },
  getFieldBookedQueuesOfField: async (fieldId) => {
    set({ fieldBookedQueues: undefined })
    const res = await getFieldBookedQueuesOfField(fieldId)
    if (res.success) {
      set({ fieldBookedQueues: res.data.reverse() })
      return res.data
    } else {
      set({ fieldBookedQueues: null })
      return Promise.reject(res.message)
    }
  },
  deleteFieldBookedQueue: async (fieldBookedQueue_id) => {
    const res = await deleteFieldBookedQueue(fieldBookedQueue_id)
    if (res.success) {
      const fieldBookedQueues = get().fieldBookedQueues?.filter(
        (f) => f._id !== fieldBookedQueue_id
      )
      set({ fieldBookedQueues })
      return res.data
    } else {
      return Promise.reject(res.message)
    }
  },
  reset: (type) => {
    if (type === "all") {
      set({ fieldBookedQueues: undefined })
    } else if (type === "single") {
      //
    } else {
      set({ fieldBookedQueues: undefined })
    }
  },
}))

export default useFieldBookedQueueStore
