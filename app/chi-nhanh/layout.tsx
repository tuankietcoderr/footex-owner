import { getStatus } from "@/actions/auth-actions"
import { Button } from "@/components/ui/button"
import ROUTE from "@/constants/route"
import { EOwnerStatus } from "@/interface/IOwner"
import { getSession } from "@/services/auth/cookie-session"
import Link from "next/link"
import { redirect } from "next/navigation"
import { PropsWithChildren } from "react"
import Base from "./_components/base"

const layout = async ({ children }: PropsWithChildren) => {
  const { isLogin } = await getSession()
  if (!isLogin) {
    redirect(ROUTE.INDEX)
  }
  const { success, message, data } = await getStatus()
  if (!success) {
    redirect(ROUTE.INDEX)
  }

  const status = data?.status as EOwnerStatus

  if (status === EOwnerStatus.ACTIVE) {
    return <>{children}</>
  }
  switch (status) {
    case EOwnerStatus.BLOCKED:
      return (
        <Base>
          <h2>Tài khoản của bạn đã bị khóa</h2>
        </Base>
      )
    case EOwnerStatus.PENDING:
      return (
        <Base>
          <h2>Tài khoản của bạn đang chờ duyệt</h2>
        </Base>
      )
    case EOwnerStatus.REJECTED:
      return (
        <Base>
          <h2>Tài khoản của bạn đã bị từ chối</h2>
        </Base>
      )
    case EOwnerStatus.DELETED:
      return (
        <Base>
          <h2>Tài khoản của bạn đã bị xóa</h2>
        </Base>
      )
    default:
      return null
  }
}

export default layout
