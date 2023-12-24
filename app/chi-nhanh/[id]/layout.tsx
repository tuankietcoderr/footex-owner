import OwnerNav from "@/components/nav/owner-nav"
import ROUTE from "@/constants/route"
import { getSession } from "@/services/auth/cookie-session"
import { LayoutParamsProps } from "@/types/params"
import { redirect } from "next/navigation"
import React from "react"
import OwnerSideBar from "../_components/sidebar"

const layout = async ({ children, params: { id } }: LayoutParamsProps) => {
  const { isLogin } = await getSession()
  if (!isLogin) {
    redirect(ROUTE.INDEX)
  }
  return (
    <div className="grid md:grid-cols-[260px_auto] ">
      {id && <OwnerSideBar branchId={id} />}
      <div className="max-h-screen min-h-screen overflow-auto p-4">
        <OwnerNav branchId={id} />
        <div className="relative py-4">{children}</div>
      </div>
    </div>
  )
}

export default layout
