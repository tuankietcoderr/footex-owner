"use server"
import FETCH, { FETCH_WITH_TOKEN } from "@/api/fetch"
import API_ROUTE from "@/constants/api-route"
import IOwner, { EOwnerStatus } from "@/interface/IOwner"
import { deleteSession, getSession, setSession } from "@/services/auth/cookie-session"

const loginOwner = async (data: { emailOrPhoneNumber: string; password: string }) => {
  const res = await FETCH<IOwner>(API_ROUTE.OWNER.SIGN_IN, {
    method: "POST",
    body: JSON.stringify(data),
  })
  const { success, data: owner } = res
  if (success) {
    await setSession({
      owner: owner!,
      accessToken: res?.accessToken!,
    })
  }
  return res
}

const registerOwner = async (data: IOwner) => {
  const res = await FETCH<IOwner>(API_ROUTE.OWNER.SIGN_UP, {
    method: "POST",
    body: JSON.stringify(data),
  })
  const { success, data: owner } = res
  if (success) {
    await setSession({
      owner: owner!,
      accessToken: res?.accessToken!,
    })
  }
  return res
}

const updateOwner = async (data: IOwner) => {
  const res = await FETCH_WITH_TOKEN<IOwner>(API_ROUTE.OWNER.INDEX, {
    method: "PUT",
    body: JSON.stringify(data),
  })
  if (res.success) {
    const currentSession = await getSession()
    await setSession({
      ...currentSession.session,
      owner: res.data!,
    })
  }
  return res
}

const sendVerifyEmail = async (email: string) => {
  const res = await FETCH_WITH_TOKEN<IOwner>(
    API_ROUTE.OWNER.SEND_VERIFY_EMAIL.concat(`?email=${email}`),
    {
      method: "POST",
    }
  )
  return res
}

const loadOwnerIfVerified = async () => {
  const res = await FETCH_WITH_TOKEN<IOwner>(API_ROUTE.OWNER.INDEX)
  if (res.success) {
    if (res.data?.isEmailVerified) {
      const currentSession = await getSession()
      await setSession({
        ...currentSession.session,
        owner: res.data!,
      })
    }
  }
  return res
}

const logoutOwner = async () => {
  deleteSession()
}

const getStatus = async () => {
  const res = await FETCH_WITH_TOKEN<{ status: EOwnerStatus }>(API_ROUTE.OWNER.STATUS, {
    cache: "no-cache",
  })
  return res
}

const forgotPassword = async (email: string) => {
  const res = await FETCH(API_ROUTE.OWNER.FORGOT_PASSWORD, {
    method: "POST",
    params: {
      email,
    },
  })
  return res
}

export {
  loginOwner,
  logoutOwner,
  registerOwner,
  updateOwner,
  sendVerifyEmail,
  loadOwnerIfVerified,
  getStatus,
  forgotPassword,
}
