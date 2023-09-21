import apiInstance from "@/api/instance"
import IFootballShop, { EFootballShopStatus } from "@/interface/IFootballShop"

const createBigField = async (data: IFootballShop) => {
  try {
    const res = await apiInstance.post("/football-shop", data)
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const getAllBigFields = async () => {
  try {
    const res = await apiInstance.get("/football-shop")
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const getOwnerBigFields = async () => {
  try {
    const res = await apiInstance.get("/football-shop/owner")
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const getBigFieldById = async (id: string) => {
  try {
    const res = await apiInstance.get(`/football-shop/${id}`)
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const updateBigField = async (id: string, data: IFootballShop) => {
  try {
    const res = await apiInstance.put(`/football-shop/${id}`, data)
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const deleteBigField = async (id: string) => {
  try {
    const res = await apiInstance.delete(`/football-shop/${id}`)
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const updateBigFieldStatus = async (id: string, status: EFootballShopStatus) => {
  try {
    const res = await apiInstance.put(`/football-shop/status/${id}`, {
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
