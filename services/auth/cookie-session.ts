"use server"

import { COMMON } from "@/constants/common"
import IOwner from "@/interface/IOwner"
import { sealData, unsealData } from "iron-session"
import { cookies } from "next/headers"

type Session = {
  owner: IOwner | null
  accessToken?: string
}

type Auth = {
  isLogin: boolean
  session: Session
}

const sessionPassword = process.env.SESSION_PASSWORD
if (!sessionPassword) throw new Error("SESSION_PASSWORD is not set")

export async function getSession(): Promise<Auth> {
  const encryptedSession = cookies().get(COMMON.AUTH_SESSION)?.value

  const session = encryptedSession
    ? ((await unsealData(encryptedSession, {
        password: sessionPassword as string,
      })) as string)
    : null

  return {
    isLogin: !!session,
    session: session
      ? JSON.parse(session)
      : {
          guest: null,
          accessToken: null,
        },
  }
}

function setCookie(name: string, value: string) {
  cookies().set(name, value, {
    sameSite: "strict",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 1 week
  })
}

export async function setSession(session: Session) {
  const encryptedSession = await sealData(JSON.stringify(session), {
    password: sessionPassword as string,
  })
  setCookie(COMMON.AUTH_SESSION, encryptedSession)
}

export async function deleteSession() {
  setCookie(COMMON.AUTH_SESSION, "")
}
