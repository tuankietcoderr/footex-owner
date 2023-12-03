import apiInstance from "@/api/instance"
import API_ROUTE from "@/constants/api-route"
import IPrize from "@/interface/IPrize"

const createPrize = async (data: IPrize) => {
  try {
    const res = await apiInstance.post(API_ROUTE.PRIZE.INDEX, data)
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const updatePrize = async (prize_id: string, data: IPrize) => {
  try {
    const res = await apiInstance.put(API_ROUTE.PRIZE.ID.replace(":id", prize_id), data)
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const getBranchPrizes = async (branch_id: string) => {
  try {
    const res = await apiInstance.get(API_ROUTE.PRIZE.BRANCH.replace(":id", branch_id))
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

export { createPrize, updatePrize, getBranchPrizes }
