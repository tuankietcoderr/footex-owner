import apiInstance from "@/api/instance"
import IField from "@/interface/IField"

const createField = async (data: IField) => {
  try {
    const res = await apiInstance.post("/field", data)
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const getFieldsOfOrganization = async (organization_id: string) => {
  try {
    const res = await apiInstance.get("/field/organization?organization_id=" + organization_id)
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

export { createField, getFieldsOfOrganization }
