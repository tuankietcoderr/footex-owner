import apiInstance from "@/api/instance"
import API_ROUTE from "@/constants/api-route"
import IFieldBookedQueue, { EFieldBookedQueueStatus } from "@/interface/IFieldBookedQueue"

const createFieldBookedQueue = async (data: IFieldBookedQueue) => {
  try {
    const res = await apiInstance.post(API_ROUTE.FIELD_BOOKED_QUEUE.INDEX, data)
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const getFieldBookedQueuesOfField = async (fieldId: string) => {
  try {
    const res = await apiInstance.get(API_ROUTE.FIELD_BOOKED_QUEUE.FIELD.replace(":id", fieldId))
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const updateFieldBookedQueueStatus = async (
  fieldBookedQueueId: string,
  status: EFieldBookedQueueStatus
) => {
  try {
    const res = await apiInstance.put(
      API_ROUTE.FIELD_BOOKED_QUEUE.STATUS.replace(":id", fieldBookedQueueId),
      {
        status,
      }
    )
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const deleteFieldBookedQueue = async (fieldBookedQueueId: string) => {
  try {
    const res = await apiInstance.delete(
      API_ROUTE.FIELD_BOOKED_QUEUE.ID.replace(":id", fieldBookedQueueId)
    )
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

export {
  createFieldBookedQueue,
  getFieldBookedQueuesOfField,
  updateFieldBookedQueueStatus,
  deleteFieldBookedQueue,
}
