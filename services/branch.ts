import apiInstance from "@/api/instance"
import API_ROUTE from "@/constants/api-route"
import IBranch, { EBranchStatus } from "@/interface/IBranch"

const createBranch = async (data: IBranch) => {
  try {
    const res = await apiInstance.post(API_ROUTE.BRANCH.INDEX, data)
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const getAllBranchs = async () => {
  try {
    const res = await apiInstance.get(API_ROUTE.BRANCH.INDEX)
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const getOwnerBranchs = async () => {
  try {
    const res = await apiInstance.get(API_ROUTE.BRANCH.OWNER)
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const getBranchById = async (id: string) => {
  try {
    const res = await apiInstance.get(API_ROUTE.BRANCH.ID.replace(":id", id))
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const updateBranch = async (id: string, data: IBranch) => {
  try {
    const res = await apiInstance.put(API_ROUTE.BRANCH.ID.replace(":id", id), data)
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const deleteBranch = async (id: string) => {
  try {
    const res = await apiInstance.delete(API_ROUTE.BRANCH.ID.replace(":id", id))
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const updateBranchStatus = async (id: string, status: EBranchStatus) => {
  try {
    const res = await apiInstance.put(API_ROUTE.BRANCH.STATUS.replace(":id", id), {
      status,
    })
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

export {
  createBranch,
  getAllBranchs,
  getOwnerBranchs,
  getBranchById,
  updateBranch,
  deleteBranch,
  updateBranchStatus,
}
