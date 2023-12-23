import IAddress from "@/interface/IAddress"

export function toDot(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export function toAddress(address: IAddress) {
  const { houseNumber, street, ward, district, city } = address
  const addressArr = [houseNumber, street, ward, district, city].filter((x) => x)
  return addressArr.join(", ") || "Chưa có thông tin địa chỉ"
}
