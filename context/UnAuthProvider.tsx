"use client"
import UnAuthorized from "@/components/un-authorized"
import UnRight from "@/components/un-right"
import { EUserRole } from "@/interface/IUser"
import useUserStore from "@/store/useUserStore"
import { usePathname } from "next/navigation"
import { PropsWithChildren, useEffect } from "react"

export default function UnAuthProvider({ children }: PropsWithChildren) {
  const { user } = useUserStore()
  const pathname = usePathname()
  if (user === null && pathname !== "/dang-nhap" && pathname !== "/dang-ky") {
    return <UnAuthorized />
  }
  if (user && user.role === EUserRole.GUEST) {
    return <UnRight />
  }
  return children
}
