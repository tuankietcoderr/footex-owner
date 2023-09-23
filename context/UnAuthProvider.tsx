"use client"
import UnAuthorized from "@/components/un-authorized"
import UnOrg from "@/components/un-org"
import UnRight from "@/components/un-right"
import { EUserRole } from "@/interface/IUser"
import useBigFieldStore from "@/store/useBigFieldStore"
import useUserStore from "@/store/useUserStore"
import { usePathname } from "next/navigation"
import { PropsWithChildren } from "react"

export default function UnAuthProvider({ children }: PropsWithChildren) {
  const { user } = useUserStore()
  const { bigFields } = useBigFieldStore()
  const pathname = usePathname()
  if (user === null && pathname !== "/dang-nhap" && pathname !== "/dang-ky") {
    return <UnAuthorized />
  }
  if (user && user.role === EUserRole.GUEST) {
    return <UnRight />
  }

  if (user && bigFields && bigFields?.length === 0) {
    return <UnOrg />
  }
  return children
}
