type TAddress = "p" | "d" | "w"

const fetchAddress = async (type: TAddress) => {
  try {
    const res = await fetch(`https://provinces.open-api.vn/api/${type}`, {
      cache: "force-cache",
    })
    const data = await res.json()
    return data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const fetchAddressDetail = async (type: TAddress, id: string, depth: number = 1) => {
  try {
    const res = await fetch(`https://provinces.open-api.vn/api/${type}/${id}/?depth=${depth}`)
    const data = await res.json()
    return data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

export { fetchAddress, fetchAddressDetail }
