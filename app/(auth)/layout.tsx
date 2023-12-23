import React, { PropsWithChildren } from "react"
import { redirect } from "next/navigation"
import ROUTE from "@/constants/route"
import { getSession } from "@/services/auth/cookie-session"

const Layout = async ({ children }: PropsWithChildren) => {
  const { isLogin } = await getSession()
  if (isLogin) {
    redirect(ROUTE.BRANCH.INDEX)
  }
  return <div className="mx-4 mt-8 flex justify-center md:mx-auto">{children}</div>
}

export default Layout
