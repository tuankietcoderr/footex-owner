import apiInstance from "@/api/instance"
import API_ROUTE from "@/constants/api-route"
import IField from "@/interface/IField"

const createField = async (data: IField) => {
  try {
    const res = await apiInstance.post(API_ROUTE.FIELD.INDEX, data)
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const getFieldsOfOrganization = async (organization_id: string) => {
  try {
    const res = await apiInstance.get(API_ROUTE.FIELD.BRANCH.replace(":id", organization_id))
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

export { createField, getFieldsOfOrganization }
