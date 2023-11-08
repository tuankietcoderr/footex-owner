import axios from "axios"

const BASE_URL = "https://provinces.open-api.vn/api"
const instance = axios.create({
  baseURL: BASE_URL,
})

type TAddress = "p" | "d" | "w"

const fetchAddress = async (type: TAddress) => {
  try {
    const res = await instance.get(`/${type}`)
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const fetchAddressDetail = async (type: TAddress, id: string, depth: number = 1) => {
  try {
    const res = await instance.get(`/${type}/${id}/?depth=${depth}`)
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

export { fetchAddress, fetchAddressDetail }
