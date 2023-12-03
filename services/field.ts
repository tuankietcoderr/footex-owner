import apiInstance from "@/api/instance"
import API_ROUTE from "@/constants/api-route"
import IField, { EFieldStatus } from "@/interface/IField"

const createField = async (data: IField) => {
  try {
    const res = await apiInstance.post(API_ROUTE.FIELD.INDEX, data)
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const updateField = async (field_id: string, data: IField) => {
  try {
    const res = await apiInstance.put(API_ROUTE.FIELD.ID.replace(":id", field_id), data)
    return res.data
  } catch (error: any) {
    return error.response.data ?? error.message
  }
}

const updateFieldStatus = async (field_id: string, status: EFieldStatus) => {
  try {
    const res = await apiInstance.put(API_ROUTE.FIELD.STATUS.replace(":id", field_id), { status })
    return res.data
  } catch (error: any) {
    return error.response.data ?? error.message
  }
}

const getFieldsOfBranch = async (organization_id: string) => {
  try {
    const res = await apiInstance.get(API_ROUTE.FIELD.BRANCH.replace(":id", organization_id))
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

export { createField, getFieldsOfBranch, updateField, updateFieldStatus }
