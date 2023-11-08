"use client"
import UnAuthorized from "@/components/un-authorized"
import UnBranch from "@/components/un-branch"
import useBranchStore from "@/store/useBranchStore"
import useOwnerStore from "@/store/useOwnerStore"
import { usePathname } from "next/navigation"
import { PropsWithChildren } from "react"

export default function UnAuthProvider({ children }: PropsWithChildren) {
  const { owner } = useOwnerStore()
  const { branches } = useBranchStore()
  const pathname = usePathname()
  if (owner === null && pathname !== "/dang-nhap" && pathname !== "/dang-ky") {
    return <UnAuthorized />
  }

  if (owner && branches && branches?.length === 0) {
    return <UnBranch />
  }
  return children
}
