import apiInstance from "@/api/instance"
import IOrganization, { EOrganizationStatus } from "@/interface/IOrganization"

const createBigField = async (data: IOrganization) => {
  try {
    const res = await apiInstance.post("/organization", data)
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const getAllBigFields = async () => {
  try {
    const res = await apiInstance.get("/organization")
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const getOwnerBigFields = async () => {
  try {
    const res = await apiInstance.get("/organization/owner")
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const getBigFieldById = async (id: string) => {
  try {
    const res = await apiInstance.get(`/organization/${id}`)
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const updateBigField = async (id: string, data: IOrganization) => {
  try {
    const res = await apiInstance.put(`/organization/${id}`, data)
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const deleteBigField = async (id: string) => {
  try {
    const res = await apiInstance.delete(`/organization/${id}`)
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const updateBigFieldStatus = async (id: string, status: EOrganizationStatus) => {
  try {
    const res = await apiInstance.put(`/organization/status/${id}`, {
      status,
    })
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

export {
  createBigField,
  getAllBigFields,
  getOwnerBigFields,
  getBigFieldById,
  updateBigField,
  deleteBigField,
  updateBigFieldStatus,
}
