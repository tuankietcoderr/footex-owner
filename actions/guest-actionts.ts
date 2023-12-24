"use server"
import FETCH, { FETCH_WITH_TOKEN } from "@/api/fetch"
import API_ROUTE from "@/constants/api-route"
import IGuest from "@/interface/IGuest"

const registerGuest = async (data: IGuest) => {
  const res = await FETCH<IGuest>(API_ROUTE.GUEST.SIGN_UP, {
    method: "POST",
    body: JSON.stringify(data),
  })
  return res
}

const searchGuestByEmailOrPhoneNumber = async (emailOrPhoneNumber: string) => {
  const data = await FETCH_WITH_TOKEN<IGuest>(
    API_ROUTE.GUEST.SEARCH_BY_EMAIL_OR_PHONE_NUMBER.replace(
      ":emailOrPhoneNumber",
      emailOrPhoneNumber
    )
  )
  return data
}

export { registerGuest, searchGuestByEmailOrPhoneNumber }
