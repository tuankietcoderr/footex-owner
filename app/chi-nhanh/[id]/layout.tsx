import OwnerNav from "@/components/nav/owner-nav"
import ROUTE from "@/constants/route"
import { getSession } from "@/services/auth/cookie-session"
import { LayoutParamsProps } from "@/types/params"
import { redirect } from "next/navigation"
import React from "react"
import OwnerSideBar from "../_components/sidebar"
import { getBranchById } from "@/actions/branch-actions"
import IBranch, { EBranchStatus } from "@/interface/IBranch"
import { generalizeBranchStatus } from "@/utils/status"

const layout = async ({ children, params: { id } }: LayoutParamsProps) => {
  const { isLogin } = await getSession()
  const { success, message, data } = await getBranchById(id)
  if (!isLogin) {
    redirect(ROUTE.INDEX)
  }
  if (!success) {
    return <div>{message}</div>
  }
  const branch = data as IBranch
  return (
    <div className="grid md:grid-cols-[260px_auto] ">
      {id && <OwnerSideBar branchId={id} />}
      <div className="max-h-screen min-h-screen overflow-auto p-4">
        <OwnerNav branchId={id} />
        <div className="relative py-4">
          {branch.status === EBranchStatus.ACTIVE ? (
            children
          ) : (
            <>
              <p>{generalizeBranchStatus(branch.status!)}</p>
              <p>Vui lòng liên hệ với quản trị viên để biết thêm thông tin chi tiết</p>
              <p>Email: admin@admin.com</p>
              <p>Số điện thoại: 0123456789</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default layout
